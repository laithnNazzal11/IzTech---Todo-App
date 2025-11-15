import { Zap, Pencil, Trash2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import Popover from './Popover'

interface TaskActionsPopoverProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onStatusChange?: (status: string) => void
  onEdit?: () => void
  onDelete?: () => void
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
}: TaskActionsPopoverProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const handleStatusClick = (status: string) => {
    onStatusChange?.(status)
    onClose()
  }

  const handleEdit = () => {
    onEdit?.()
    onClose()
  }

  const handleDelete = () => {
    onDelete?.()
    onClose()
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      width={210}
      height={172}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* First Box - Change to Section */}
        <div
          className="opacity-100 overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '210px',
            height: '84px',
            paddingRight: '4px',
            paddingLeft: '4px',
          }}
        >
          <div className="flex flex-col h-full gap-2 py-1">
            {/* Change to Header */}
            <div
              className="flex items-center opacity-100"
              style={{
                paddingRight: '6px',
                paddingLeft: '6px',
              }}
            >
              <Zap
                className="h-4 w-4"
                strokeWidth={2}
                style={{
                  color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                }}
              />
              <span
                className="font-primary text-sm"
                style={{
                  color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                  marginLeft: '8px', // Align with text position: 4px (outer) + 4px (inner) + 16px (icon) + 8px (gap) - 4px (button padding) = 28px
                }}
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
                  className="rounded-sm opacity-100"
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: status.color,
                    marginLeft: '8px', // Align with text position: 4px (outer) + 4px (inner) + 16px (icon) + 8px (gap) - 4px (button padding) = 28px
                  }}
                />
                <span
                  className="font-primary text-sm"
                  style={{
                    color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                    marginLeft: '8px',
                  }}
                >
                  {status.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Divider */}
        <div
          className="opacity-100 flex items-center justify-center"
          style={{
            width: '100%',
            height: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '0px',
              borderTop: theme === 'dark' ? '1px solid hsla(0, 0%, 16%, 1)' : '1px solid hsla(200, 33%, 98%, 1)',
            }}
          />
        </div>

        {/* Second Box - Edit */}
        <div
          className="opacity-100 overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '210px',
            height: '28px',
            paddingRight: '6px',
            paddingLeft: '6px',
          }}
        >
          <button
            onClick={handleEdit}
            className="flex items-center hover:bg-muted transition-colors opacity-100 w-full"
            style={{
              paddingRight: '6px',
              paddingLeft: '6px',
              height: '100%',
            }}
          >
            <Pencil
              className="h-4 w-4"
              strokeWidth={2}
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
              }}
            />
            <span
              className="font-primary text-sm"
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                marginLeft: '8px',
              }}
            >
              {t('dashboard.edit')}
            </span>
          </button>
        </div>

        {/* Divider between Edit and Delete */}
        <div
          className="opacity-100 flex items-center justify-center"
          style={{
            width: '100%',
            height: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '0px',
              borderTop: theme === 'dark' ? '1px solid hsla(0, 0%, 16%, 1)' : '1px solid hsla(200, 33%, 98%, 1)',
            }}
          />
        </div>

        {/* Third Box - Delete */}
        <div
          className="opacity-100 overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '210px',
            height: '28px',
            paddingRight: '6px',
            paddingLeft: '6px',
          }}
        >
          <button
            onClick={handleDelete}
            className="flex items-center hover:bg-muted transition-colors opacity-100 w-full"
            style={{
              paddingRight: '6px',
              paddingLeft: '6px',
              height: '100%',
            }}
          >
            <Trash2
              className="h-4 w-4"
              strokeWidth={2}
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
              }}
            />
            <span
              className="font-primary text-sm"
              style={{
                color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                marginLeft: '8px',
              }}
            >
              {t('dashboard.delete')}
            </span>
          </button>
        </div>
      </div>
    </Popover>
  )
}

export default TaskActionsPopover

