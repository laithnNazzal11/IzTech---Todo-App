import { useState, useEffect } from 'react'
import { FileX } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import { getCurrentUser } from '@/utils/auth'
import { cn } from '@/lib/utils'
import Popover from './Popover'
import CreateStatusModal from '../modals/CreateStatusModal'

interface StatusWithCount {
  id: string
  name: string
  color: string
  count: number
}

interface StatusPopoverProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onCreateStatus?: (status: { title: string; color: string }) => void | Promise<void>
  isLoading?: boolean
}

function StatusPopover({ isOpen, onClose, triggerRef, onCreateStatus, isLoading = false }: StatusPopoverProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const [isCreateStatusModalOpen, setIsCreateStatusModalOpen] = useState(false)
  const [statusesWithCount, setStatusesWithCount] = useState<StatusWithCount[]>([])

  useEffect(() => {
    // Load current user from localStorage
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      setStatusesWithCount([])
      return
    }


    const tasks = currentUser.tasks || []
    const statuses = currentUser.status || []

    // If there are no tasks, return empty array
    if (tasks.length === 0) {
      setStatusesWithCount([])
      return
    }

    // Group tasks by status and count them
    const taskCountByStatus: Record<string, number> = {}
    tasks.forEach((task) => {
      const statusName = task.status
      taskCountByStatus[statusName] = (taskCountByStatus[statusName] || 0) + 1
    })

    // Map statuses with their counts
    const statusesWithCounts: StatusWithCount[] = statuses
      .map((status) => ({
        id: status.id,
        name: status.name,
        color: status.color,
        count: taskCountByStatus[status.name] || 0,
      }))
      .filter((status) => status.count > 0) // Only show statuses that have tasks

    setStatusesWithCount(statusesWithCounts)
  }, [isOpen]) // Recalculate when popover opens

  const handleCreateNewStatus = () => {
    onClose()
    setIsCreateStatusModalOpen(true)
  }

  const handleCloseCreateStatusModal = () => {
    // Prevent closing during loading
    if (isLoading) return
    setIsCreateStatusModalOpen(false)
  }

  const handleCreateStatus = async (status: { title: string; color: string }) => {
    try {
      await onCreateStatus?.(status)
      // Only close modal after successful creation
      setIsCreateStatusModalOpen(false)
    } catch (error) {
      // Handle error if needed
      console.error("Error creating status:", error)
    }
  }

  // Calculate height based on number of statuses


  return (
    <>
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      width={210}
    >
      <div className="flex flex-col overflow-hidden">
        {/* Top Box - Status List */}
        <div className="opacity-100 w-[210px] pr-2 pl-2">
          <div className={cn(
            "flex flex-col gap-2 py-1",
            statusesWithCount.length > 4 && "max-h-[112px] overflow-y-auto"
          )}>
            {statusesWithCount.length === 0 ? (
              <div className="flex items-center gap-2 py-2 pr-1 pl-1">
                <FileX className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-foreground'}`} />
                <span className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                  there is no tasks yet
                </span>
              </div>
            ) : (
              statusesWithCount.map((status) => (
                <div
                  key={status.id}
                  className="flex items-center justify-between opacity-100 pr-1 pl-1"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-sm opacity-100 w-4 h-4"
                      style={{
                        backgroundColor: status.color,
                      }}
                    />
                    <span className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                      {status.name}
                    </span>
                  </div>
                  <span className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                    {status.count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center Divider */}
        <div className="opacity-100 flex items-center justify-center w-full h-2 pt-1 pb-1">
          <div className={`w-full h-0 border-t ${theme === 'dark' ? 'border-t-[hsla(0,0%,16%,1)]' : 'border-t-[hsla(200,33%,98%,1)]'}`} />
        </div>

        {/* Bottom Box - Create New Status */}
        <div className="opacity-100 h-7 pr-2 pl-2">
          <button
            onClick={handleCreateNewStatus}
            className="flex items-center hover:bg-muted transition-colors opacity-100 w-full h-7 pt-1.5 pr-1 pb-1.5 pl-1"
            style={{
              borderRadius: 'calc(var(--radius) - 4px)',
            }}
          >
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-100"
              >
                <g clipPath="url(#clip0_1_10008)">
                  <path
                    d="M8.00001 1.3335C9.29344 1.33326 10.559 1.70928 11.6425 2.41573C12.7259 3.12218 13.5805 4.12855 14.102 5.31219C14.6235 6.49582 14.7894 7.8056 14.5795 9.08189C14.3697 10.3582 13.7931 11.5458 12.92 12.5002M8.00001 5.3335V10.6668M10.6667 8.00016H5.33334M1.66668 5.91683C1.45424 6.5626 1.34183 7.23707 1.33334 7.91683M1.88673 10.6668C2.26106 11.528 2.81312 12.3005 3.50673 12.9335M3.09083 3.49012C3.27686 3.2876 3.47524 3.09679 3.68483 2.91878M5.76271 14.2802C7.42517 14.8724 9.25464 14.7813 10.85 14.0269"
                    stroke={theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : '#474747'}
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_10008">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                {t('dashboard.createNewStatus')}
              </span>
            </div>
          </button>
        </div>
      </div>
    </Popover>
    
    {/* Create Status Modal */}
    <CreateStatusModal
      isOpen={isCreateStatusModalOpen}
      onClose={handleCloseCreateStatusModal}
      onCreateStatus={handleCreateStatus}
      isLoading={isLoading}
    />
    </>
  )
}

export default StatusPopover

