import { useForm } from 'react-hook-form'

import cn from 'classnames'

import { ILogin } from './Login.interface'

import { Button, Input } from 'uikit'

import styles from './Login.module.scss'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>()

  return (
    <div className={cn(styles.root)}>
      <form onSubmit={handleSubmit((form) => console.log('form', form))}>
        test login
        <Input
          {...register('name', {
            required: { value: true, message: 'input name' },
          })}
          error={errors.name}
          placeholder="Имя"
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
        <Button type="submit">button</Button>
      </form>
    </div>
  )
}
