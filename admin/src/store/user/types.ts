export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IUserSlice {
  email: string
  isAuth: boolean
  status: StatusEnum
}

export interface IAuthParamsProps {
  email: string
  password: string
}