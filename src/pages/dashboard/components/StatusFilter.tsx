import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

function StatusFilter() {
  return (
    <Button
      variant="outline"
      className="w-[200px] h-[36px] gap-2 opacity-100 flex items-center justify-between rounded-md bg-white dark:bg-background"
      style={{
        border: '1px solid hsla(240, 6%, 90%, 1)',
        boxShadow: '0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)',
      }}
    >
      <span className="font-primary text-sm font-normal text-foreground">Status</span>
      <ChevronDown className="h-4 w-4 text-foreground" />
    </Button>
  )
}

export default StatusFilter

