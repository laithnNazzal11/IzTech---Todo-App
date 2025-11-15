import { useState } from 'react'
import { Zap } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from 'react-i18next'
import Popover from './Popover'
import DeleteStatusModal from '../modals/DeleteStatusModal'

interface TaskActionsPopoverProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onStatusChange?: (status: string) => void
  onEdit?: () => void
  onDelete?: () => void
  taskStatus?: string
}

// Available statuses with their colors
const availableStatuses = [
  { name: 'Do It', color: '#6A66E0' },
  { name: 'Done', color: '#E01F3C' },
]

function TaskActionsPopover({
  isOpen,
  onClose,
  triggerRef,
  onStatusChange,
  onEdit,
  onDelete,
  taskStatus,
}: TaskActionsPopoverProps) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const [isDeleteStatusModalOpen, setIsDeleteStatusModalOpen] = useState(false)

  const handleStatusClick = (status: string) => {
    onStatusChange?.(status)
    onClose()
  }

  const handleEdit = () => {
    onEdit?.()
    onClose()
  }

  const handleDelete = () => {
    setIsDeleteStatusModalOpen(true)
    onClose()
  }

  const handleDeleteStatus = () => {
    onDelete?.()
    setIsDeleteStatusModalOpen(false)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteStatusModalOpen(false)
  }

  return (
    <>
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      width={210}
      height={172}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* First Box - Change to Section */}
        <div className="opacity-100 overflow-hidden w-full max-w-[210px] h-[84px] pr-1 pl-1">
          <div className="flex flex-col h-full gap-2 py-1">
            {/* Change to Header */}
            <div className="flex items-center opacity-100 pr-1.5 pl-1.5">
              <Zap
                className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}
                strokeWidth={2}
              />
              <span
                className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'} ${language === 'ar' ? 'mr-3' : 'ml-2'}`}
              >
                {t('dashboard.changeTo')}
              </span>
            </div>

            {/* Status Options */}
            {availableStatuses.map((status) => (
              <button
                key={status.name}
                onClick={() => handleStatusClick(status.name)}
                className="flex items-center hover:bg-muted transition-colors opacity-100"
              >
                <div
                  className="rounded-sm opacity-100 w-4 h-4 mx-2"
                  style={{
                    backgroundColor: status.color,
                  }}
                />
                <span className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
                  {status.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Divider */}
        <div className="opacity-100 flex items-center justify-center w-full h-2 pt-1 pb-1">
          <div className={`w-full h-0 border-t ${theme === 'dark' ? 'border-t-[hsla(0,0%,16%,1)]' : 'border-t-[hsla(200,33%,98%,1)]'}`} />
        </div>

        {/* Second Box - Edit */}
        <div className="opacity-100 overflow-hidden w-full max-w-[210px] h-7 pr-1.5 pl-1.5">
          <button
            onClick={handleEdit}
            className="flex items-center hover:bg-muted transition-colors opacity-100 w-full h-full pr-1.5 pl-1.5"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M8 2.00016H3.33333C2.97971 2.00016 2.64057 2.14064 2.39052 2.39069C2.14048 2.64074 2 2.97987 2 3.3335V12.6668C2 13.0205 2.14048 13.3596 2.39052 13.6096C2.64057 13.8597 2.97971 14.0002 3.33333 14.0002H12.6667C13.0203 14.0002 13.3594 13.8597 13.6095 13.6096C13.8595 13.3596 14 13.0205 14 12.6668V8.00016M12.2501 1.75015C12.5153 1.48493 12.875 1.33594 13.2501 1.33594C13.6251 1.33594 13.9848 1.48493 14.2501 1.75015C14.5153 2.01537 14.6643 2.37508 14.6643 2.75015C14.6643 3.12522 14.5153 3.48493 14.2501 3.75015L8.2414 9.75948C8.0831 9.91765 7.88753 10.0334 7.67273 10.0962L5.7574 10.6562C5.70003 10.6729 5.63922 10.6739 5.58134 10.6591C5.52345 10.6442 5.47061 10.6141 5.42836 10.5719C5.38611 10.5296 5.35599 10.4768 5.34116 10.4189C5.32633 10.361 5.32733 10.3002 5.34406 10.2428L5.90406 8.32748C5.96708 8.11285 6.08309 7.91752 6.2414 7.75948L12.2501 1.75015Z"
                stroke={theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : '#474747'}
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'} ${language === 'ar' ? 'mr-3' : 'ml-2'}`}
            >
              {t('dashboard.edit')}
            </span>
          </button>
        </div>

        {/* Divider between Edit and Delete */}
        <div className="opacity-100 flex items-center justify-center w-full h-2 pt-1 pb-1">
          <div className={`w-full h-0 border-t ${theme === 'dark' ? 'border-t-[hsla(0,0%,16%,1)]' : 'border-t-[hsla(200,33%,98%,1)]'}`} />
        </div>

        {/* Third Box - Delete */}
        <div className="opacity-100 overflow-hidden w-full max-w-[210px] h-7 pr-1.5 pl-1.5">
          <button
            onClick={handleDelete}
            className="flex items-center hover:bg-muted transition-colors opacity-100 w-full h-full pr-1.5 pl-1.5"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M2 4.00016H14M12.6667 4.00016V13.3335C12.6667 14.0002 12 14.6668 11.3333 14.6668H4.66667C4 14.6668 3.33333 14.0002 3.33333 13.3335V4.00016M5.33333 4.00016V2.66683C5.33333 2.00016 6 1.3335 6.66667 1.3335H9.33333C10 1.3335 10.6667 2.00016 10.6667 2.66683V4.00016"
                stroke={theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : '#474747'}
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`font-primary text-sm ${theme === 'dark' ? 'text-white' : 'text-foreground'} ${language === 'ar' ? 'mr-3' : 'ml-2'}`}
            >
              {t('dashboard.delete')}
            </span>
          </button>
        </div>
      </div>
    </Popover>
    
    {/* Delete Status Modal */}
    <DeleteStatusModal
      isOpen={isDeleteStatusModalOpen}
      onClose={handleCloseDeleteModal}
      onDelete={handleDeleteStatus}
      statusName={taskStatus}
    />
    </>
  )
}

export default TaskActionsPopover

