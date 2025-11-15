import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface TaskTableSkeletonProps {
  itemsPerPage?: number
}

function TaskTableSkeleton({ itemsPerPage = 7 }: TaskTableSkeletonProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex items-center justify-between">
        <h1 className="font-primary text-[24px] font-[700] leading-[32px] tracking-[0] text-foreground">
          {t('dashboard.myTasks')}
        </h1>
        <Button
          disabled
          className="w-12 h-8 gap-2 py-2 px-1 rounded-md opacity-100 transition-all duration-200 bg-[hsla(350,96%,43%,1)] shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.06),0px_1px_3px_0px_hsla(0,0%,0%,0.1)] hover:bg-[hsla(350,96%,38%,1)] hover:shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.1),0px_2px_6px_0px_hsla(0,0%,0%,0.15)] sm:w-[142px] sm:h-[36px] sm:bg-primary sm:text-primary-foreground sm:shadow-none sm:hover:bg-primary/90 sm:hover:shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.1)] opacity-50"
        >
          <Plus className="h-4 w-4 text-white sm:hidden" />
          <span className="hidden sm:inline">{t('dashboard.createNewTask')}</span>
        </Button>
      </div>

      {/* Task Table with Skeleton Loading */}
      <div className="mt-[24px] mb-4">
        <div className="flex flex-col w-full bg-background" style={{ boxShadow: '0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)' }}>
          {/* Table Header */}
          <div className="grid grid-cols-[24px_1fr_0.2fr_10px] sm:grid-cols-[24px_2fr_3fr_.5fr_10px] gap-y-4 gap-x-6 sm:gap-4 pb-2 border-b border-b-[hsla(180,33%,99%,1)]">
            <div className="font-primary text-sm font-[700] text-foreground"></div>
            <div className="font-primary text-sm font-[700] text-foreground">{t('dashboard.title')}</div>
            <div className="font-primary text-sm font-[700] text-foreground hidden sm:block">{t('dashboard.description')}</div>
            <div className="font-primary text-sm font-[700] text-foreground flex items-center justify-center w-full">{t('dashboard.status')}</div>
            <div className="font-primary text-sm font-[700] text-foreground flex"></div>
          </div>
          {/* Table Rows - Skeleton */}
          <div className="flex flex-col">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="grid grid-cols-[24px_1fr_0.2fr_10px] sm:grid-cols-[24px_2fr_3fr_.5fr_10px] gap-y-3 gap-x-6 sm:gap-4 py-3 border-b border-b-[hsla(180,33%,99%,1)] dark:border-b-[hsla(0,0%,16%,1)]"
              >
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 rounded bg-muted animate-pulse" />
                </div>
                <div className="flex items-center w-full">
                  <div className="h-4 w-full rounded bg-muted animate-pulse" />
                </div>
                <div className="hidden sm:flex sm:items-center w-full">
                  <div className="h-4 w-full rounded bg-muted animate-pulse" />
                </div>
                <div className="flex items-center justify-center gap-[10px]">
                  {/* Mobile: Small skeleton box */}
                  <div className="w-6 h-6 opacity-100 sm:hidden rounded bg-muted animate-pulse" style={{ borderRadius: '4.8px' }} />
                  {/* Desktop: Status badge skeleton */}
                  <div className="hidden sm:flex w-[104px] h-[38px] rounded-md items-center justify-center bg-muted animate-pulse" />
                </div>
                <div className="flex items-center justify-end">
                  <div className="w-8 h-8 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskTableSkeleton

