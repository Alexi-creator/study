import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_URL } from '../../http'

import { IUserSlice, IAuthParamsProps, StatusEnum } from './types'
import AuthService from '../../sevices/AuthService'
import { AuthResponse } from '../../models/response/AuthResponse'

const initialState: IUserSlice = {
  email: '',
  isAuth: false,
  status: StatusEnum.SUCCESS,
}

export const checkAuth = createAsyncThunk<AuthResponse>(
  'user/checkAuth',
  async () => {
    const { data } = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    })

    return data
  }
)

export const fetchUser = createAsyncThunk<AuthResponse, IAuthParamsProps>(
  'user/login',
  async (params) => {
    const { email, password } = params
    const { data } = await AuthService.login(email, password)

    return data
  }
)

export const logoutUser = createAsyncThunk<void>('user/logout', async () => {
  await AuthService.logout()
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isAuth = false
      state.status = StatusEnum.LOADING
    })
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.email = action?.payload?.user?.email
        state.isAuth = true
        state.status = StatusEnum.SUCCESS
        localStorage.setItem('token', action?.payload?.accessToken)
      }
    )
    builder.addCase(fetchUser.rejected, (state) => {
      state.isAuth = false
      state.status = StatusEnum.ERROR
    })
    builder.addCase(
      checkAuth.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        localStorage.setItem('token', action?.payload?.accessToken)
        state.isAuth = true
        state.status = StatusEnum.SUCCESS
      }
    )
    builder.addCase(checkAuth.pending, (state) => {
      state.isAuth = false
      state.status = StatusEnum.LOADING
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      localStorage.removeItem('token')
      state.isAuth = false
      state.status = StatusEnum.SUCCESS
    })
    builder.addCase(logoutUser.pending, (state) => {
      state.status = StatusEnum.LOADING
    })
  },
})

export default userSlice.reducer
