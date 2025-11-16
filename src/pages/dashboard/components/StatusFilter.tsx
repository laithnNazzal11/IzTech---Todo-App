import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import StatusPopover from './popovers/StatusPopover'

interface StatusFilterProps {
  onCreateStatus?: (status: { title: string; color: string }) => void | Promise<void>
  isLoading?: boolean
}

function StatusFilter({ onCreateStatus, isLoading = false }: StatusFilterProps) {
  const { t } = useTranslation()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          ref={buttonRef}
          variant="outline"
          onClick={handleClick}
          className="w-full sm:w-[200px] h-[36px] gap-2 opacity-100 flex items-center justify-between rounded-md bg-white dark:bg-background"
          style={{
            border: '1px solid hsla(240, 6%, 90%, 1)',
            boxShadow: '0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)',
          }}
        >
          <span className="font-primary text-sm font-normal text-foreground">{t('dashboard.status')}</span>
          <motion.div
            animate={{ rotate: isPopoverOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-foreground" />
          </motion.div>
        </Button>
      </motion.div>

      <StatusPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        triggerRef={buttonRef as React.RefObject<HTMLElement | null>}
        onCreateStatus={onCreateStatus}
        isLoading={isLoading}
      />
    </motion.div>
  )
}

export default StatusFilter

