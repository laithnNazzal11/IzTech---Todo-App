import { Languages, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/Logo'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { storage, STORAGE_KEYS } from '@/utils/storage'
import type { User } from '@/types'
import { useEffect, useState, useRef } from 'react'
import AvatarPopover from './popovers/AvatarPopover'

interface DashboardHeaderProps {
  onToggleLanguage: () => void
  onToggleTheme: () => void
}

function DashboardHeader({ onToggleLanguage, onToggleTheme }: DashboardHeaderProps) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const avatarButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const currentUser = storage.get<User>(STORAGE_KEYS.CURRENT_USER)
    if (currentUser?.avatar) {
      setUserAvatar(currentUser.avatar)
    }
  }, [])

  const handleAvatarClick = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <header className="flex w-full mt-3 h-[84px] sm:h-[84px] md:h-[64px] items-center justify-between rounded-lg md:rounded-[8px] opacity-100 py-[22px] px-4 sm:py-6 sm:px-8  md:px-8">
      <div className="w-[92.5px] h-[28px] opacity-100">
        <Logo variant="light" size="md" theme={theme} className="gap-[3.5px]" />
      </div>
      
      <div className="flex items-center  h-[40px] gap-4 opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-auto w-auto p-0 text-foreground hover:bg-transparent"
          onClick={onToggleLanguage}
          aria-label="Toggle language"
        >
          <Languages
            key={language}
            className="relative left-[-0.8px] h-8 w-8 animate-toggle-theme transition-colors duration-300 ease-in-out"
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
            className="relative left-[3.34px] top-[3.32px] h-10 w-10 animate-toggle-theme transition-colors duration-300 ease-in-out"
            strokeWidth={2}
            fill={theme === 'dark' ? 'currentColor' : 'none'}
            style={{
              color: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
              transition: 'fill 0.3s ease-in-out, color 0.3s ease-in-out',
            }}
          />
        </Button>

        <div className="relative flex items-center">
          <Button
            ref={avatarButtonRef}
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 p-0 text-foreground hover:bg-transparent flex items-center justify-center"
            aria-label="Profile"
            onClick={handleAvatarClick}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 flex items-center justify-center overflow-hidden opacity-100">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src="/images/Avatar.png"
                  alt="Avatar"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </Button>

          <AvatarPopover
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            triggerRef={avatarButtonRef as React.RefObject<HTMLElement | null>}
          />
        </div>

      </div>
    </header>
  )
}

export default DashboardHeader

