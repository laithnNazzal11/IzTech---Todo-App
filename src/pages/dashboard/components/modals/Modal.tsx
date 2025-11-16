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
  isLoading?: boolean
}

function Modal({ 
  isOpen, 
  onClose, 
  children, 
  width = 400, 
  height = 'auto',
  showBackdrop = true,
  isLoading = false
}: ModalProps) {
  const { theme } = useTheme()

  const widthStyle = typeof width === 'number' ? `${width}px` : width
  const heightStyle = typeof height === 'number' ? `${height}px` : height

  const isAutoSize = width === 'auto' && height === 'auto'

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isLoading && onClose()}>
      <DialogContent
        className={cn(
          'items-end sm:items-center',
          !isAutoSize && 'p-0 overflow-hidden',
          isAutoSize && 'overflow-visible',
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
          display: 'flex',
        } : {
          width: '100vh',
          justifyContent: 'center',
          height: '100%',
          maxWidth: '100vw',
          display: 'flex',
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          // Prevent closing when loading or when showBackdrop is false
          if (isLoading || !showBackdrop) {
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

