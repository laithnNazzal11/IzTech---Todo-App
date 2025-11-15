import { User as UserIcon, LogOut } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { storage, STORAGE_KEYS } from '@/utils/storage'
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
    storage.remove(STORAGE_KEYS.CURRENT_USER)
    navigate('/signin')
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
          className={`flex items-center hover:bg-muted transition-colors opacity-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}
          style={{
            width: '134px',
            height: '28px',
            paddingRight: '4px',
            paddingLeft: '4px',
          }}
        >
          <div
            className={`flex items-center rounded-sm opacity-100 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            style={{
              width: '126px',
              height: '28px',
              paddingTop: '6px',
              paddingRight: '8px',
              paddingBottom: '6px',
              paddingLeft: '8px',
              gap: '8px',
            }}
          >
            <UserIcon 
              className="h-4 w-4" 
              strokeWidth={2}
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
              }}
            />
            <span 
              className="font-primary text-sm"
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
              }}
            >
              {t('dashboard.profile')}
            </span>
          </div>
        </button>

        {/* Divider */}
        <div
          className="opacity-100"
          style={{
            width: '134px',
            height: '1px',
            borderTop: theme === 'dark' ? '1px solid hsla(0, 0%, 16%, 1)' : '1px solid hsla(200, 33%, 98%, 1)',
          }}
        />

        {/* Exit Item */}
        <button
          onClick={handleExit}
          className={`flex items-center hover:bg-muted transition-colors relative opacity-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}
          style={{
            width: '134px',
            height: '28px',
            paddingRight: '4px',
            paddingLeft: '4px',
          }}
        >
          <div className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 `} />
          <div
            className={`flex items-center rounded-sm opacity-100 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            style={{
              width: '126px',
              height: '28px',
              paddingTop: '6px',
              paddingRight: '8px',
              paddingLeft: '8px',
              gap: '8px',
            }}
          >
            <LogOut 
              className="h-4 w-4" 
              strokeWidth={2}
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
              }}
            />
            <span 
              className="font-primary text-sm"
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
              }}
            >
              {t('dashboard.exit')}
            </span>
          </div>
        </button>
      </div>
    </Popover>
  )
}

export default AvatarPopover

