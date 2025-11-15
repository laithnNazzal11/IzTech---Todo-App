import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  onPrevious: () => void
  onNext: () => void
}

function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPrevious,
  onNext,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="w-[112px] h-[36px] rounded-md gap-2 opacity-100 bg-white dark:bg-background flex items-center justify-center"
        style={{
          paddingTop: '8px',
          paddingRight: '4px',
          paddingBottom: '8px',
          paddingLeft: '4px',
          border: '1px solid hsla(200, 33%, 98%, 1)',
          boxShadow: '0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)',
        }}
      >
        <ChevronLeft className="h-4 w-4 text-foreground" />
        <span className="font-primary text-sm font-medium text-foreground">Previous</span>
      </Button>

      <span className="font-primary text-sm text-muted-foreground">
        {startItem}-{endItem} of {totalItems}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="w-[112px] h-[36px] rounded-md gap-2 opacity-100 bg-white dark:bg-background flex items-center justify-center"
        style={{
          paddingTop: '8px',
          paddingRight: '4px',
          paddingBottom: '8px',
          paddingLeft: '4px',
          border: '1px solid hsla(200, 33%, 98%, 1)',
          boxShadow: '0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)',
        }}
      >
        <span className="font-primary text-sm font-medium text-foreground">Next</span>
        <ChevronRight className="h-4 w-4 text-foreground" />
      </Button>
    </div>
  )
}

export default Pagination

