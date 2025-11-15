import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface PopoverProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  children: ReactNode
  width?: number
  height?: number | string
}

function Popover({ isOpen, onClose, triggerRef, children, width = 134, height = "auto" }: PopoverProps) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const popoverRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom')

  // Calculate position based on available space
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return

    const calculatePosition = () => {
      const triggerElement = triggerRef.current
      if (!triggerElement) return

      const triggerRect = triggerElement.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - triggerRect.bottom
      const spaceAbove = triggerRect.top
      const popoverHeight = height
      const gap = 8 // 8px gap between trigger and popover

      // Determine numeric value of popoverHeight to avoid TS error
      const popoverHeightNum = typeof popoverHeight === 'number' 
        ? popoverHeight 
        : popoverRef.current?.offsetHeight ?? 0

      // Check if popover fits below
      const fitsBelow = spaceBelow >= popoverHeightNum + gap
      // Check if popover fits above
      const fitsAbove = spaceAbove >= popoverHeightNum + gap

      // If it fits in both, prefer bottom (default behavior)
      // If it only fits in one, use that
      // If it fits in neither, use the one with more space
      if (fitsBelow) {
        setPosition('bottom')
      } else if (fitsAbove) {
        setPosition('top')
      } else {
        // Not enough space in either direction, use the one with more space
        setPosition(spaceAbove > spaceBelow ? 'top' : 'bottom')
      }
    }

    // Calculate position when popover opens
    calculatePosition()

    // Recalculate on scroll or resize
    window.addEventListener('scroll', calculatePosition, true)
    window.addEventListener('resize', calculatePosition)

    return () => {
      window.removeEventListener('scroll', calculatePosition, true)
      window.removeEventListener('resize', calculatePosition)
    }
  }, [isOpen, triggerRef, height])

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

  const positionClasses = position === 'top' 
    ? 'bottom-[calc(100%+8px)]' 
    : 'top-[calc(100%+8px)]'

  return (
    <div
      ref={popoverRef}
      className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} ${positionClasses} z-50 rounded-md opacity-100 pt-1 pb-1 overflow-hidden ${
        theme === 'dark' 
          ? 'bg-[hsla(4,67%,7%,1)] border border-[hsla(0,0%,16%,1)]' 
          : 'bg-white border border-[hsla(200,33%,98%,1)]'
      } shadow-[0px_2px_4px_-1px_hsla(0,0%,0%,0.06),0px_4px_6px_-1px_hsla(0,0%,0%,0.1)]`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxHeight:"250px",
        borderRadius: 'calc(var(--radius) - 2px)',
      }}
    >
      {children}
    </div>
  )
}

export default Popover

