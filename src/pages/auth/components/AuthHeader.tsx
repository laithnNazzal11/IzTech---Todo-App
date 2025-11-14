import { Languages, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Theme } from '@/types'

interface AuthHeaderProps {
  onToggleLanguage: () => void
  onToggleTheme: () => void
  theme: Theme
}

function AuthHeader({ onToggleLanguage, onToggleTheme, theme }: AuthHeaderProps) {
  return (
    <header className="flex h-[72px] w-full items-center justify-between py-4 text-muted-foreground">
      <div className="flex items-center gap-3 text-primary">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-sm font-black">
          T
        </div>
        <span className="text-lg font-black tracking-wide">TODO</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-border"
          onClick={onToggleLanguage}
          aria-label="Toggle language"
        >
          <Languages className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-border"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}

export default AuthHeader

