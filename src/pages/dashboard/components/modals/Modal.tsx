import { useTheme } from '@/contexts/ThemeContext'
import type { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: number | string
  height?: number | string
  showBackdrop?: boolean
}

function Modal({ 
  isOpen, 
  onClose, 
  children, 
  width = 400, 
  height = 'auto',
  showBackdrop = true 
}: ModalProps) {
  const { theme } = useTheme()

  const widthStyle = typeof width === 'number' ? `${width}px` : width
  const heightStyle = typeof height === 'number' ? `${height}px` : height

  const isAutoSize = width === 'auto' && height === 'auto'

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          // Ensure always centered on sm and above, bottom on small screens
          'left-[50%] translate-x-[-50%] translate-y-[0%] bottom-0 sm:bottom-auto sm:top-[50%] sm:translate-y-[-50%]',
          !isAutoSize && 'p-0 overflow-hidden',
          !isAutoSize && (theme === 'dark' 
            ? 'bg-[hsla(4,67%,7%,1)] border-[hsla(0,0%,16%,1)]' 
            : 'bg-white border-[hsla(200,33%,98%,1)]'),
          !isAutoSize && 'shadow-[0px_2px_4px_-1px_hsla(0,0%,0%,0.06),0px_4px_6px_-1px_hsla(0,0%,0%,0.1)]',
          !showBackdrop && '[&>button]:hidden',
          isAutoSize && 'p-0 border-0 bg-transparent shadow-none w-fit h-fit !grid-cols-1',
          isAutoSize && '[&>button]:hidden',
          '[&>button>svg]:text-[hsla(0,0%,28%,1)]'
        )}
        style={!isAutoSize ? {
          width: widthStyle,
          height: heightStyle,
          borderRadius: 'calc(var(--radius) - 2px)',
          maxWidth: '90vw',
          maxHeight: '90vw',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        } : {
          width: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'fit-content',
          maxWidth: '100vw',
          maxHeight: '90vw',
          display: 'flex',
        }}
        onInteractOutside={(e) => {
          if (!showBackdrop) {
            e.preventDefault()
          }
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal

