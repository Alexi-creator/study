import { useForm } from 'react-hook-form'

import cn from 'classnames'

import { ILogin } from './Login.interface'
import { useDispatch } from 'react-redux'

import { Button, Input } from 'uikit'
// import { selectorUser } from '../../store/user/selector'
import styles from './Login.module.scss'
import { AppDispatch } from 'src/store'
import { fetchUser } from 'src/store/user'
import { IAuthParamsProps } from 'src/store/user/types'

export const Login: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>()

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmitForm = async (data: IAuthParamsProps) => {
    try {
      dispatch(fetchUser(data))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log('error login', e.response?.data?.message)
    }
  }

  return (
    <div className={cn(styles.root)}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        test login
        <Input
          {...register('email', {
            required: { value: true, message: 'input name' },
          })}
          error={errors.email}
          placeholder="email"
          type={'text'}
        />
        <Input
          {...register('password', {
            required: { value: true, message: 'input password' },
          })}
          error={errors.password}
          placeholder="password"
          type={'password'}
        />
        <Button type="submit">sign in</Button>
        {/* <Button onClick={}>sign up</Button> */}
      </form>
    </div>
  )
}
