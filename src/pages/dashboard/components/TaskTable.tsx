import { useState, useRef } from 'react'
import { Star, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import TaskActionsPopover from './popovers/TaskActionsPopover'

interface Task {
  id: string
  title: string
  description: string
  status: string
  isFavorite: boolean
}

interface TaskTableProps {
  tasks: Task[]
}

function TaskTable({ tasks }: TaskTableProps) {
  const { t } = useTranslation()
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const handleMoreClick = (taskId: string) => {
    setOpenPopoverId(openPopoverId === taskId ? null : taskId)
  }

  const handleStatusChange = (taskId: string, newStatus: string) => {
    // TODO: Implement status change logic
    console.log(`Change task ${taskId} status to ${newStatus}`)
  }

  const handleEdit = (taskId: string) => {
    // TODO: Implement edit logic
    console.log(`Edit task ${taskId}`)
  }

  const handleDelete = (taskId: string) => {
    // TODO: Implement delete logic
    console.log(`Delete task ${taskId}`)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[24px_1fr_0.2fr_10px] sm:grid-cols-[24px_2fr_3fr_.5fr_10px] gap-y-4 gap-x-6 sm:gap-4 pb-2">
        <div className="font-primary text-sm font-[700] text-foreground"></div>
        <div className="font-primary text-sm font-[700] text-foreground">{t('dashboard.title')}</div>
        <div className="font-primary text-sm font-[700] text-foreground hidden sm:block">{t('dashboard.description')}</div>
        <div className="font-primary text-sm font-[700] text-foreground flex items-center justify-center w-full">{t('dashboard.status')}</div>
        <div className="font-primary text-sm font-[700] text-foreground flex"></div>

      </div>

      {/* Table Rows */}
      <div className="flex flex-col">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-[24px_1fr_0.2fr_10px] sm:grid-cols-[24px_2fr_3fr_.5fr_10px] gap-y-3 gap-x-6 sm:gap-4 py-3 "
          >
            <div className="flex items-center justify-center" style={{ width: '24px' }}>
              {task.isFavorite ? (
                <Star className="h-6 w-6 fill-primary text-primary opacity-100" />
              ) : (
                <Star className="h-6 w-6 text-primary opacity-100" />
              )}
            </div>
            <div className="font-primary text-sm text-foreground flex items-center min-w-0 overflow-hidden">
              <span className="truncate">{task.title}</span>
            </div>
            <div className="font-primary text-sm text-muted-foreground hidden sm:flex sm:items-center min-w-0 overflow-hidden">
              <span className="truncate">{task.description}</span>
            </div>
            <div className="flex items-center justify-center gap-[10px]">
              {/* Mobile: Small colored box */}
              <div
                className="w-6 h-6 opacity-100 sm:hidden"
                style={{
                  background: 'hsla(237, 77%, 67%, 1)',
                  borderRadius: '4.8px',
                }}
              />
              {/* Desktop: Status badge */}
              <span
                className="hidden sm:flex w-[104px] h-[38px] rounded-md items-center justify-center opacity-100 gap-[10px]"
                style={{
                  background: 'hsla(255, 83%, 62%, 0.1)',
                  paddingTop: '8px',
                  paddingRight: '4px',
                  paddingBottom: '8px',
                  paddingLeft: '4px',
                }}
              >
                <p
                  className="font-primary text-xs font-[700]"
                  style={{
                    color: 'hsla(255, 83%, 62%, 1)',
                  }}
                >
                  {task.status}
                </p>
              </span>
            </div>
            <div className="flex items-center justify-end relative">
              <Button
                ref={(el) => {
                  buttonRefs.current[task.id] = el
                }}
                variant="ghost"
                size="icon"
                onClick={() => handleMoreClick(task.id)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <TaskActionsPopover
                isOpen={openPopoverId === task.id}
                onClose={() => setOpenPopoverId(null)}
                triggerRef={{ current: buttonRefs.current[task.id] }}
                onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                onEdit={() => handleEdit(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskTable

