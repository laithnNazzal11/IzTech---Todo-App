import { cn } from '@/lib/utils'
import type { Theme } from '@/types'

type LogoVariant = 'light' | 'dark'
type LogoSize = 'lg' | 'md'

const sizeStyles: Record<
  LogoSize,
  { circle: string; text: string; gap: string; circleText: string }
> = {
  lg: {
    circle: 'h-[84.82px] w-[84.82px]',
    circleText: 'text-[63.62px]',
    text: 'text-[63.62px]',
    gap: 'gap-[10.6px]',
  },
  md: {
    circle: 'h-10 w-10',
    circleText: 'text-xl',
    text: 'text-2xl',
    gap: 'gap-2',
  },
}

const variantStyles: Record<LogoVariant, { circle: string; circleText: string; text: string }> = {
  light: {
    circle: 'bg-primary text-white',
    circleText: 'text-white',
    text: 'text-primary',
  },
  dark: {
    circle: 'bg-white text-primary',
    circleText: 'text-primary',
    text: 'text-white',
  },
}

interface LogoProps {
  variant?: LogoVariant
  size?: LogoSize
  className?: string
  theme?: Theme
}

export function Logo({ variant = 'light', size = 'md', className, theme }: LogoProps) {
  const sizes = sizeStyles[size]
  const colors = variantStyles[variant]

  // In dark mode, override to show red circle with dark T
  const isDarkMode = theme === 'dark'
  const circleClasses = isDarkMode
    ? 'bg-primary'
    : colors.circle
  const circleTextClasses = isDarkMode
    ? ''
    : colors.circleText
  const textClasses = isDarkMode
    ? 'text-primary'
    : colors.text

  return (
    <div
      className={cn(
        'flex items-center font-logo uppercase leading-none tracking-tight',
        sizes.gap,
        className,
      )}
    >
      <div
        className={cn(
          'flex aspect-square items-center justify-center rounded-full',
          sizes.circle,
          circleClasses,
        )}
      >
        <span
          className={cn('font-logo leading-none', sizes.circleText, circleTextClasses)}
          style={isDarkMode ? { color: 'hsla(4, 67%, 7%, 1)' } : undefined}
        >
          T
        </span>
      </div>
      <span className={cn('font-logo leading-none', sizes.text, textClasses)}>TODO</span>
    </div>
  )
}

