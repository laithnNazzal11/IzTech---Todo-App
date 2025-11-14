import { Languages, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/Logo'
import type { Theme } from '@/types'

interface AuthHeaderProps {
  onToggleLanguage: () => void
  onToggleTheme: () => void
  theme: Theme
}

function AuthHeader({ onToggleLanguage, onToggleTheme, theme }: AuthHeaderProps) {
  return (
    <header className="flex h-[72px] w-full items-center justify-between py-2 sm:py-4">
      <Logo variant="light" size="md" theme={theme} />
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-auto w-auto p-0 text-foreground hover:bg-transparent"
          onClick={onToggleLanguage}
          aria-label="Toggle language"
        >
          <Languages className="relative left-[-0.8px] h-[32px] w-[32px] text-foreground" strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-auto w-auto p-0 text-foreground hover:bg-transparent"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          <Moon
            key={theme}
            className="relative left-[3.34px] top-[3.32px] h-[33.33333969116211px] w-[32.189388275146484px] animate-toggle-theme transition-colors duration-300 ease-in-out"
            strokeWidth={2}
            fill={theme === 'dark' ? 'currentColor' : 'none'}
            style={{
              color: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
              transition: 'fill 0.3s ease-in-out, color 0.3s ease-in-out',
            }}
          />
        </Button>
      </div>
    </header>
  )
}

export default AuthHeader

