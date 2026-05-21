import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal text-white shadow-teal hover:bg-teal-dark hover:-translate-y-0.5',
  secondary: 'bg-white text-navy border-[1.5px] border-gray-200 hover:border-navy',
  ghost: 'bg-transparent text-navy hover:text-teal',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-[22px] py-[14px] text-[15px]',
  lg: 'px-7 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-head font-semibold',
    'rounded-pill cursor-pointer transition-all',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  return <button className={classes} {...props} />
}
