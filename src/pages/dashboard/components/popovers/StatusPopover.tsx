import { useTheme } from '@/contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import Popover from './Popover'

interface Status {
  id: string
  name: string
  color: string
  count: number
}

interface StatusPopoverProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
}

// Mock status data - replace with actual data fetching
const statuses: Status[] = [
  { id: '1', name: 'Do It', color: '#6A66E0', count: 3 },
  { id: '2', name: 'Done', color: '#E01F3C', count: 2 },
  { id: '3', name: 'In Progress', color: '#804FE0', count: 4 },
]

function StatusPopover({ isOpen, onClose, triggerRef }: StatusPopoverProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const handleCreateNewStatus = () => {
    onClose()
    // TODO: Implement create new status functionality
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      width={210}
      height={128}
    >
      <div className="flex flex-col h-full">
        {/* Top Box - Status List */}
        <div
          className="opacity-100"
          style={{
            width: '210px',
            height: '84px',
            paddingRight: '8px',
            paddingLeft: '8px',
          }}
        >
          <div className="flex flex-col h-full gap-2 py-1">
            {statuses.map((status) => (
              <div
                key={status.id}
                className="flex items-center justify-between opacity-100"
                style={{
                  paddingRight: '4px',
                  paddingLeft: '4px',
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-sm opacity-100"
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: status.color,
                    }}
                  />
                  <span
                    className="font-primary text-sm"
                    style={{
                      color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                    }}
                  >
                    {status.name}
                  </span>
                </div>
                <span
                  className="font-primary text-sm"
                  style={{
                    color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                  }}
                >
                  {status.count}
                </span>
              </div>
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

        {/* Bottom Box - Create New Status */}
        <div
          className="opacity-100"
          style={{
            height: '28px',
            paddingRight: '8px',
            paddingLeft: '8px',
          }}
        >
          <button
            onClick={handleCreateNewStatus}
            className="flex items-center hover:bg-muted transition-colors opacity-100 w-full"
            style={{
              height: '28px',
              paddingTop: '6px',
              paddingRight: '4px',
              paddingBottom: '6px',
              paddingLeft: '4px',
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
              <span
                className="font-primary text-sm"
                style={{
                  color: theme === 'dark' ? 'hsla(0, 0%, 100%, 1)' : undefined,
                }}
              >
                {t('dashboard.createNewStatus')}
              </span>
            </div>
          </button>
        </div>
      </div>
    </Popover>
  )
}

export default StatusPopover

