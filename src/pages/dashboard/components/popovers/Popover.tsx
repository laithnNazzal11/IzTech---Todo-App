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
      className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-[calc(100%+8px)] z-50 rounded-md opacity-100 pt-1 pb-1 overflow-hidden ${
        theme === 'dark' 
          ? 'bg-[hsla(4,67%,7%,1)] border border-[hsla(0,0%,16%,1)]' 
          : 'bg-white border border-[hsla(200,33%,98%,1)]'
      } shadow-[0px_2px_4px_-1px_hsla(0,0%,0%,0.06),0px_4px_6px_-1px_hsla(0,0%,0%,0.1)]`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: 'calc(var(--radius) - 2px)',
      }}
    >
      {children}
    </div>
  )
}

export default Popover

