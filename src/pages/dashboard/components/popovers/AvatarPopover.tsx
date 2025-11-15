import { User as UserIcon, LogOut } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/utils/auth'
import Popover from './Popover'

interface AvatarPopoverProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
}

function AvatarPopover({ isOpen, onClose, triggerRef }: AvatarPopoverProps) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleProfile = () => {
    onClose()
    // TODO: Navigate to profile page when implemented
  }

  const handleExit = () => {
    logout()
    navigate('/signin', { replace: true })
    onClose()
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      width={134}
      height={72}
    >
      <div className="flex flex-col h-full">
        {/* Profile Item */}
        <button
          onClick={handleProfile}
          className={`flex items-center hover:bg-muted transition-colors opacity-100 w-[134px] h-7 pr-1 pl-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <div className="flex items-center rounded-sm opacity-100 w-[126px] h-7 pt-1.5 pr-2 pb-1.5 pl-2 gap-2">
            <UserIcon 
              className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}
              strokeWidth={2}
            />
            <span className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
              {t('dashboard.profile')}
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className={`opacity-100 w-[134px] h-px border-t ${theme === 'dark' ? 'border-t-[hsla(0,0%,16%,1)]' : 'border-t-[hsla(200,33%,98%,1)]'}`} />

        {/* Exit Item */}
        <button
          onClick={handleExit}
          className={`flex items-center hover:bg-muted transition-colors relative opacity-100 w-[134px] h-7 pr-1 pl-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <div className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 `} />
          <div className="flex items-center rounded-sm opacity-100 w-[126px] h-7 pt-1.5 pr-2 pl-2 gap-2">
            <LogOut 
              className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}
              strokeWidth={2}
            />
            <span className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
              {t('dashboard.exit')}
            </span>
          </div>
        </button>
      </div>
    </Popover>
  )
}

export default AvatarPopover

