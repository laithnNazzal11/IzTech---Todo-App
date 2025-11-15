import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/Logo'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getCurrentUser } from '@/utils/auth'
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
    const currentUser = getCurrentUser()
    // Use avatar if provided, otherwise use default avatar path
    setUserAvatar(currentUser?.avatar || '/images/Avatar.png')
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
              color: theme === 'dark' ? 'hsla(0, 0%, 92%, 1)' : 'hsl(var(--foreground))',
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
          <svg
            key={theme}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative left-[3.34px] top-[3.32px] h-10 w-10 animate-toggle-theme transition-colors duration-300 ease-in-out"
            style={{
              transition: 'stroke 0.3s ease-in-out, fill 0.3s ease-in-out',
            }}
          >
            <g clipPath="url(#clip0_1_5510)">
              <path
                d="M20.0417 4.32178L20.1238 4.32959L20.1677 4.3335H20.655C21.2259 4.3335 21.5268 5.00439 21.1707 5.42236L21.074 5.52295C19.0672 7.40265 17.7771 9.92263 17.4265 12.6509C17.0739 15.3954 17.694 18.1767 19.1794 20.5112C20.665 22.8458 22.9219 24.586 25.5574 25.4292C28.193 26.2723 31.0414 26.1654 33.6062 25.1265H33.6072C34.1528 24.9051 34.6982 25.4519 34.4705 25.9995C33.382 28.6184 31.6027 30.8925 29.323 32.5796C27.0433 34.2667 24.3479 35.3031 21.5251 35.5786C18.7026 35.8541 15.8585 35.3583 13.2957 34.144C10.7327 32.9297 8.54686 31.043 6.97241 28.6841C5.39795 26.3251 4.49343 23.5823 4.35522 20.7495C4.2171 17.9169 4.85095 15.1 6.18823 12.5991C7.52558 10.0981 9.51639 8.00641 11.949 6.54834C14.3794 5.09164 17.1595 4.32171 19.9929 4.31982L20.0417 4.32178Z"
                fill={theme === 'dark' ? 'hsl(var(--primary))' : 'none'}
                stroke={theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
                strokeWidth="2"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_5510">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
              <img
                src={userAvatar || '/images/Avatar.png'}
                alt="Avatar"
                className={userAvatar && userAvatar.startsWith('data:') 
                  ? "h-full w-full object-cover" 
                  : "h-full w-full object-contain"}
              />
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

