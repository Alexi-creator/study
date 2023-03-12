import { ForwardedRef, forwardRef } from 'react'

import cn from 'classnames'

import { InputProps } from './Input.props'

import styles from './Input.module.scss'

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  (
    { className, error, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={styles.inputWrapper}>
        <input
          className={cn(className, styles.input, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    )
  }
)
