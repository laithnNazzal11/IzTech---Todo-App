import { Languages, Moon, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/Logo'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface DashboardHeaderProps {
  onToggleLanguage: () => void
  onToggleTheme: () => void
}

function DashboardHeader({ onToggleLanguage, onToggleTheme }: DashboardHeaderProps) {
  const { theme } = useTheme()
  const { language } = useLanguage()

  return (
    <header className="flex w-full mt-3 h-[84px] sm:h-[84px] md:h-[64px] items-center justify-between rounded-lg md:rounded-[8px] opacity-100 py-[22px] px-4 sm:py-[22px] sm:px-8 md:py-0 md:px-8">
      <div className="w-[92.5px] h-[28px] opacity-100">
        <Logo variant="light" size="md" theme={theme} className="gap-[3.5px]" />
      </div>
      
      <div className="flex items-center  h-[40px] gap-6 opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-auto w-auto p-0 text-foreground hover:bg-transparent"
          onClick={onToggleLanguage}
          aria-label="Toggle language"
        >
          <Languages
            key={language}
            className="relative left-[-0.8px] h-[32px] w-[32px] animate-toggle-theme transition-colors duration-300 ease-in-out"
            strokeWidth={2}
            style={{
              color: 'hsl(var(--foreground))',
              transition: 'color 0.3s ease-in-out',
            }}
          />
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

        <Button
          variant="ghost"
          size="icon"
          className="relative h-auto w-auto p-0 text-foreground hover:bg-transparent"
          aria-label="Profile"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </Button>

      </div>
    </header>
  )
}

export default DashboardHeader

