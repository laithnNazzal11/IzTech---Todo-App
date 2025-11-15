import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import StatusPopover from './popovers/StatusPopover'

function StatusFilter() {
  const { t } = useTranslation()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <div className="relative">
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
        <ChevronDown className="h-4 w-4 text-foreground" />
      </Button>

      <StatusPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        triggerRef={buttonRef as React.RefObject<HTMLElement | null>}
      />
    </div>
  )
}

export default StatusFilter

