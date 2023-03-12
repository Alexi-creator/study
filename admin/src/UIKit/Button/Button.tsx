import React from 'react'

import cn from 'classnames'

import styles from './Button.module.scss'

type ButtonDefault = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export interface ButtonProps extends ButtonDefault {
  color?: 'blue' | 'white'
  disabled?: boolean
  suffix?: JSX.Element | string
  suffixPosition?: 'right' | 'left'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  color = 'white',
  disabled,
  suffix,
  suffixPosition = 'left',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(styles.root, color && styles[color])}
    >
      {suffix && (
        <div
          className={cn(
            styles.suffix,
            suffixPosition === 'left' && styles.suffixL,
            suffixPosition === 'right' && styles.suffixR
          )}
        >
          {suffix}
        </div>
      )}
      {children}
    </button>
  )
}
