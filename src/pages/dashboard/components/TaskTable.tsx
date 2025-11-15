import { useState, useRef, useEffect } from 'react'
import { Star, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { getCurrentUser } from '@/utils/auth'
import type { Task, Status } from '@/types'
import TaskActionsPopover from './popovers/TaskActionsPopover'

interface TaskTableProps {
  tasks: Task[]
}

function TaskTable({ tasks }: TaskTableProps) {
  const { t } = useTranslation()
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<Status[]>([])
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  useEffect(() => {
    // Load statuses from current user
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.status && currentUser.status.length > 0) {
      setStatuses(currentUser.status)
    } else {
      setStatuses([])
    }
  }, [tasks]) // Reload when tasks change

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

  // Helper function to get status color by name
  const getStatusColor = (statusName: string): string => {
    const status = statuses.find((s) => s.name === statusName)
    return status?.color || 'hsla(237, 77%, 67%, 1)' // Default color if not found
  }

  // Helper function to convert hsla color to rgba with opacity
  const getStatusColorWithOpacity = (statusName: string, opacity: number = 0.1): string => {
    const color = getStatusColor(statusName)
    // If color is already in hsla format, convert it
    if (color.startsWith('hsla')) {
      // Extract hsla values: hsla(h, s%, l%, a)
      const match = color.match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/)
      if (match) {
        const [, h, s, l] = match
        return `hsla(${h}, ${s}%, ${l}%, ${opacity})`
      }
    }
    // Fallback: try to parse and convert
    return color.replace(/[\d.]+\)$/, `${opacity})`)
  }

  return (
    <div className="flex flex-col w-full bg-background min-h-[300px]" style={{ boxShadow: '0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)' }}>
      {/* Table Header */}
      <div className="grid grid-cols-[24px_1fr_0.2fr_10px] sm:grid-cols-[24px_2fr_3fr_.5fr_10px] gap-y-4 gap-x-6 sm:gap-4 pb-2 border-b border-b-[hsla(180,33%,99%,1)]">
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
            className="grid grid-cols-[24px_1fr_0.2fr_10px] sm:grid-cols-[24px_2fr_3fr_.5fr_10px] gap-y-3 gap-x-6 sm:gap-4 py-3 border-b border-b-[hsla(180,33%,99%,1)] hover:bg-muted/50 transition-colors cursor-pointer"
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
              <span className="truncate">{task.description || ''}</span>
            </div>
            <div className="flex items-center justify-center gap-[10px]">
              {/* Mobile: Small colored box */}
              <div
                className="w-6 h-6 opacity-100 sm:hidden"
                style={{
                  background: getStatusColor(task.status),
                  borderRadius: '4.8px',
                }}
              />
              {/* Desktop: Status badge */}
              <span
                className="hidden sm:flex w-[104px] h-[38px] rounded-md items-center justify-center opacity-100 gap-[10px]"
                style={{
                  background: getStatusColorWithOpacity(task.status, 0.1),
                  paddingTop: '8px',
                  paddingRight: '4px',
                  paddingBottom: '8px',
                  paddingLeft: '4px',
                }}
              >
                <p
                  className="font-primary text-xs font-[700]"
                  style={{
                    color: getStatusColor(task.status),
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
                taskStatus={task.status}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskTable

