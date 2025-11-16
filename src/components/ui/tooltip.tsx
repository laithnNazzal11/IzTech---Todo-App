import { useState, useRef, useEffect, cloneElement, isValidElement } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
  className?: string
}

function Tooltip({ content, children, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom')
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!isVisible || !triggerRef.current) return

    const calculatePosition = () => {
      const triggerElement = triggerRef.current
      if (!triggerElement) return

      const triggerRect = triggerElement.getBoundingClientRect()
      const gap = 8
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - triggerRect.bottom
      const spaceAbove = triggerRect.top

      // Estimate tooltip height (will be recalculated after render)
      const estimatedHeight = 40
      let newPosition: 'top' | 'bottom' = 'bottom'
      let top = 0

      if (spaceBelow >= estimatedHeight + gap) {
        newPosition = 'bottom'
        top = triggerRect.bottom + gap
      } else if (spaceAbove >= estimatedHeight + gap) {
        newPosition = 'top'
        top = triggerRect.top - estimatedHeight - gap
      } else {
        newPosition = spaceAbove > spaceBelow ? 'top' : 'bottom'
        if (newPosition === 'top') {
          top = triggerRect.top - estimatedHeight - gap
        } else {
          top = triggerRect.bottom + gap
        }
      }

      // Center horizontally on trigger element
      const left = triggerRect.left + triggerRect.width / 2

      setPosition(newPosition)
      setTooltipStyle({
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 99999,
      })

      // Recalculate after tooltip is rendered to get actual dimensions
      if (tooltipRef.current) {
        requestAnimationFrame(() => {
          const actualHeight = tooltipRef.current?.offsetHeight || 0
          const actualWidth = tooltipRef.current?.offsetWidth || 0

          if (newPosition === 'top') {
            top = triggerRect.top - actualHeight - gap
          } else {
            top = triggerRect.bottom + gap
          }

          // Ensure tooltip stays within viewport
          let finalLeft = triggerRect.left + triggerRect.width / 2
          finalLeft = Math.max(actualWidth / 2 + 10, Math.min(finalLeft, window.innerWidth - actualWidth / 2 - 10))

          setTooltipStyle({
            position: 'fixed',
            top: `${top}px`,
            left: `${finalLeft}px`,
            zIndex: 99999,
          })
        })
      }
    }

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      calculatePosition()
    })

    window.addEventListener('resize', calculatePosition)
    window.addEventListener('scroll', calculatePosition, true)

    return () => {
      window.removeEventListener('resize', calculatePosition)
      window.removeEventListener('scroll', calculatePosition, true)
    }
  }, [isVisible])

  // Recalculate position after tooltip is rendered to get actual dimensions
  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return

    const recalculateWithActualDimensions = () => {
      const triggerElement = triggerRef.current
      const tooltipElement = tooltipRef.current
      if (!triggerElement || !tooltipElement) return

      const triggerRect = triggerElement.getBoundingClientRect()
      const actualHeight = tooltipElement.offsetHeight || 0
      const actualWidth = tooltipElement.offsetWidth || 0
      const gap = 8

      let top = 0
      if (position === 'top') {
        top = triggerRect.top - actualHeight - gap
      } else {
        top = triggerRect.bottom + gap
      }

      // Center horizontally on trigger element, but keep within viewport
      let finalLeft = triggerRect.left + triggerRect.width / 2
      finalLeft = Math.max(actualWidth / 2 + 10, Math.min(finalLeft, window.innerWidth - actualWidth / 2 - 10))

      setTooltipStyle({
        position: 'fixed',
        top: `${top}px`,
        left: `${finalLeft}px`,
        zIndex: 99999,
      })
    }

    // Use double requestAnimationFrame to ensure tooltip is fully rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        recalculateWithActualDimensions()
      })
    })
  }, [isVisible, position])

  // Only show tooltip if content is truncated
  const handleMouseEnter = () => {
    // Try to get the content element from ref first, then fallback to querySelector
    const element = contentRef.current || triggerRef.current?.querySelector('span.truncate') as HTMLElement
    if (element) {
      // Check if text is truncated
      if (element.scrollWidth > element.clientWidth) {
        setIsVisible(true)
      }
    }
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  // Don't show tooltip if content is empty
  if (!content || content.trim() === '') {
    return <>{children}</>
  }

  // Clone child element to add ref if it's a valid React element
  const childWithRef = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        ref: (el: HTMLElement | null) => {
          contentRef.current = el
        },
      } as any)
    : children

  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      className={cn(
        'px-2 py-1.5 rounded-md text-xs font-primary whitespace-normal break-words shadow-lg pointer-events-none',
        theme === 'dark'
          ? 'bg-[hsla(4,67%,7%,1)] border border-[hsla(0,0%,16%,1)] text-white'
          : 'bg-[hsla(0,0%,0%,0.9)] text-white border border-[hsla(0,0%,0%,0.1)]'
      )}
      style={{
        ...tooltipStyle,
        wordBreak: 'break-word',
        maxWidth: '300px',
        minWidth: '100px',
        transform: 'translateX(-50%)',
      }}
    >
      {content}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent',
          position === 'top'
            ? 'top-full border-t-4'
            : 'bottom-full border-b-4',
          theme === 'dark'
            ? position === 'top'
              ? 'border-t-[hsla(4,67%,7%,1)]'
              : 'border-b-[hsla(4,67%,7%,1)]'
            : position === 'top'
            ? 'border-t-[hsla(0,0%,0%,0.9)]'
            : 'border-b-[hsla(0,0%,0%,0.9)]'
        )}
      />
    </div>
  )

  return (
    <>
      <div
        ref={triggerRef}
        className={cn('relative inline-block w-full', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {childWithRef}
      </div>
      {tooltipContent && typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  )
}

export { Tooltip }

