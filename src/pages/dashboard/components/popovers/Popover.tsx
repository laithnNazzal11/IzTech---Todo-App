import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface PopoverProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  children: ReactNode
  width?: number
  height?: number
}

function Popover({ isOpen, onClose, triggerRef, children, width = 134, height = 72 }: PopoverProps) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const popoverRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, triggerRef])

  if (!isOpen) return null

  return (
    <div
      ref={popoverRef}
      className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-[calc(100%+8px)] z-50 rounded-md opacity-100`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: theme === 'dark' ? 'hsla(4, 67%, 7%, 1)' : 'hsla(0, 0%, 100%, 1)',
        border: theme === 'dark' ? '1px solid hsla(0, 0%, 16%, 1)' : '1px solid hsla(200, 33%, 98%, 1)',
        boxShadow: '0px 2px 4px -1px hsla(0, 0%, 0%, 0.06), 0px 4px 6px -1px hsla(0, 0%, 0%, 0.1)',
        paddingTop: '4px',
        paddingBottom: '4px',
      }}
    >
      {children}
    </div>
  )
}

export default Popover

