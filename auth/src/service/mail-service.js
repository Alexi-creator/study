const nodemailer = require('nodemailer')
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = require('../configuration')

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: 'Activation registration',
      text: '',
      html: 
        `
          <div>
            <h1>Please go to the link</h1>
            <a href='${link}'>${link}</a>
          </div>
        `

    })
  }
}

module.exports = new MailService()
