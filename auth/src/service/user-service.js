const bcrypt = require('bcrypt')
const uuid = require('uuid')

const { AUTH_URL } = require('../configuration/index')

const UserMdodel = require('../models/user-model')

const mailService = require('./mail-service')
const tokenService = require('./token-service')

const UserDto = require('../dtos/user-dto')

const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(email, password) {
    const candidate = await UserMdodel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User ${email} already exist!`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await UserMdodel.create({
      email,
      password: hashPassword,
      activationLink,
    })

    await mailService.sendActivationMail(email, `${AUTH_URL}/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink) {
    const user = await UserMdodel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Bad link activate')
    }

    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await UserMdodel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest(`User ${email} not registration yet`)
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Uncorrect password`)
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)

    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserMdodel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async getAllUsers() {
    const users = await UserMdodel.find()

    return users
  }

  async deletions() {
    const isDelete = await UserMdodel.deleteMany({})

    return isDelete
  }
}

module.exports = new UserService()
