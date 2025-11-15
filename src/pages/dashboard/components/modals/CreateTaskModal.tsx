import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, X } from 'lucide-react'
import Modal from './Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getCurrentUser } from '@/utils/auth'
import type { Status } from '@/types'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask?: (task: { title: string; description: string; status: string }) => void | Promise<void>
  isLoading?: boolean
}

function CreateTaskModal({ isOpen, onClose, onCreateTask, isLoading = false }: CreateTaskModalProps) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isRTL = language === 'ar'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [statuses, setStatuses] = useState<Status[]>([])
  const [status, setStatus] = useState('')
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const statusDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load statuses from current user
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.status && currentUser.status.length > 0) {
      setStatuses(currentUser.status)
      // Set default status to first status
      setStatus(currentUser.status[0].name)
    } else {
      setStatuses([])
      setStatus('')
    }
  }, [isOpen]) // Reload when modal opens

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false)
      }
    }

    if (isStatusDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isStatusDropdownOpen])

  const handleCreate = async () => {
    if (title.trim() && status && !isLoading) {
      await onCreateTask?.({
        title: title.trim(),
        description: description.trim(),
        status,
      })
      // Reset form
      setTitle('')
      setDescription('')
      const currentUser = getCurrentUser()
      if (currentUser && currentUser.status && currentUser.status.length > 0) {
        setStatus(currentUser.status[0].name)
      } else {
        setStatus('')
      }
      onClose()
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.status && currentUser.status.length > 0) {
      setStatus(currentUser.status[0].name)
    } else {
      setStatus('')
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      width="auto"
      height="auto"
    >
      <div
        className={cn(
          'flex flex-col opacity-100 relative',
          theme === 'dark' ? 'bg-[hsla(4,67%,7%,1)]' : 'bg-white',
          'w-full max-w-[390px] h-[508px] pt-6 pr-6 pb-10 pl-6 gap-[35px] rounded-t-lg',
          'sm:max-w-[448px] sm:h-[492px] sm:p-6 sm:rounded-lg sm:rounded-t-lg',
          'shadow-[0px_4px_6px_-2px_hsla(0,0%,0%,0.05),0px_10px_15px_-3px_hsla(0,0%,0%,0.1)]'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[18px]">
          <h2 className="font-primary text-lg font-[700] text-foreground">
            {t('dashboard.createTask')}
          </h2>
        </div>
        
        {/* Close Button - Fixed Position */}
        <button
          onClick={handleClose}
          className={cn(
            'absolute top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10',
            isRTL ? 'left-6' : 'right-6'
          )}
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>

        {/* Form */}
        <div className="flex flex-col flex-1">
          {/* Description Section - Contains Task Title and Status */}
          <div className="flex flex-col w-full max-w-[400px] gap-[24px] opacity-100">
            {/* Task Title Box */}
            <div className="flex flex-col w-full h-[54px] gap-1 opacity-100">
              <Label htmlFor="task-title" className="font-primary text-sm font-[400] text-foreground">
                {t('dashboard.taskTitle')}
              </Label>
              <Input
                id="task-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('dashboard.taskTitlePlaceholder')}
                className={cn(
                  'font-primary text-sm',
                  'text-foreground',
                  'placeholder:text-muted-foreground',
                  'py-2',
                  !isRTL && 'px-3 pr-10',
                )}
              />
            </div>

          {/* Description Box */} 
          <div className="flex flex-col w-full h-[154px] gap-1 opacity-100">
            <Label htmlFor="task-description" className="font-primary text-sm font-[400] text-foreground">
              {t('dashboard.description')}
            </Label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('dashboard.descriptionPlaceholder')}
              className={cn(
                'flex w-full rounded-md border border-input bg-background px-3 py-2',
                'dark:border-white',
                'shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.05)]',
                'font-primary text-sm ring-offset-background',
                'text-foreground',
                'placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'resize-none'
              )}
              style={{ height: '136px' }}
            />
          </div>

            {/* Status Box */}
            <div className="flex flex-col w-full h-[54px] gap-1 opacity-100">
              <Label htmlFor="task-status" className="font-primary text-sm font-[400] text-foreground">
                {t('dashboard.status')}
              </Label>
              <div className="relative w-full h-[36px] opacity-100" ref={statusDropdownRef}>
                {statuses.length === 0 ? (
                  <div className={cn(
                    'w-full h-full rounded-md bg-background',
                    'px-3 py-2',
                    'flex items-center',
                    'font-primary text-sm font-normal leading-[160%] tracking-[0%] opacity-100',
                    'text-muted-foreground',
                    'border border-input dark:border-white',
                    'shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.05)]'
                  )}>
                    {t('dashboard.noStatusAvailable') || 'No status available'}
                  </div>
                ) : (
                  <>
                    {/* Custom Select Button */}
                    <button
                      type="button"
                      onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                      className={cn(
                        'w-full h-full rounded-md bg-background',
                        'px-3 py-2',
                        // isRTL ? '' : '',
                        'flex justify-between items-center',
                        'font-primary text-sm font-normal leading-[160%] tracking-[0%] opacity-100',
                        'text-foreground',
                        'border border-input dark:border-white',
                        'shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.05)]',
                        'ring-offset-background',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'cursor-pointer'
                      )}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {status && (() => {
                          const selectedStatus = statuses.find((s) => s.name === status)
                          return selectedStatus ? (
                            <>
                              <div
                                className="w-3 h-3 rounded-sm flex-shrink-0"
                                style={{ backgroundColor: selectedStatus.color }}
                              />
                              <span className="truncate">{selectedStatus.name}</span>
                            </>
                          ) : (
                            <span className="truncate">{status}</span>
                          )
                        })()}
                      </div>
                      <ChevronDown 
                        className={cn(
                          'opacity-100 text-muted-foreground flex-shrink-0',
                          isStatusDropdownOpen && 'rotate-180',
                          'transition-transform'
                        )}
                        style={{ width: '16px', height: '16px' }}
                      />
                    </button>

                    {/* Dropdown Options */}
                    {isStatusDropdownOpen && (
                      <div
                        className={cn(
                          'absolute z-50 w-full mt-1 rounded-md bg-background border border-input dark:border-white',
                          'shadow-[0px_4px_6px_-2px_hsla(0,0%,0%,0.05),0px_10px_15px_-3px_hsla(0,0%,0%,0.1)]',
                          'max-h-[200px] overflow-auto'
                        )}
                      >
                        {statuses.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setStatus(s.name)
                              setIsStatusDropdownOpen(false)
                            }}
                            className={cn(
                              'w-full px-3 py-2 flex items-center gap-2',
                              'font-primary text-sm font-normal leading-[160%] tracking-[0%]',
                              'text-foreground hover:bg-muted',
                              'transition-colors',
                              status === s.name && 'bg-muted'
                            )}
                          >
                            <div
                              className="w-3 h-3 rounded-sm flex-shrink-0"
                              style={{ backgroundColor: s.color }}
                            />
                            <span className="text-left">{s.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          disabled={isLoading}
          className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-primary text-sm font-[700] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('dashboard.creating') || 'Creating...' : t('dashboard.create')}
        </Button>
      </div>
    </Modal>
  )
}

export default CreateTaskModal

