import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, X, Loader2 } from 'lucide-react'
import Modal from './Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { getCurrentUser } from '@/utils/auth'
import type { Status, Task } from '@/types'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask?: (task: { title: string; description: string; status: string }) => void | Promise<void>
  onUpdateTask?: (taskId: string, task: { title: string; description: string; status: string }) => void | Promise<void>
  onDeleteTask?: (taskId: string) => void | Promise<void>
  isLoading?: boolean
  isDeleting?: boolean
  isEdit?: boolean
  task?: Task | null
}

function CreateTaskModal({ isOpen, onClose, onCreateTask, onUpdateTask, onDeleteTask, isLoading = false, isDeleting = false, isEdit = false, task = null }: CreateTaskModalProps) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isRTL = language === 'ar'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [statuses, setStatuses] = useState<Status[]>([])
  const [status, setStatus] = useState('')
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [titleError, setTitleError] = useState('')
  const statusDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load statuses from current user
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.status && currentUser.status.length > 0) {
      setStatuses(currentUser.status)
      // Set default status to first status or task status if editing
      if (isEdit && task) {
        setStatus(task.status)
        setTitle(task.title)
        setDescription(task.description || '')
      } else {
        setStatus(currentUser.status[0].name)
      }
    } else {
      setStatuses([])
      setStatus('')
    }
    // Clear error when modal opens
    setTitleError('')
  }, [isOpen, isEdit, task]) // Reload when modal opens or edit mode/task changes

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
    // Validate title
    if (!title.trim()) {
      setTitleError(t('dashboard.taskTitleRequired') || 'Task title is required')
      return
    }

    // Clear error if validation passes
    setTitleError('')

    if (status && !isLoading) {
      if (isEdit && task) {
        await onUpdateTask?.(task.id, {
          title: title.trim(),
          description: description.trim(),
          status,
        })
      } else {
        await onCreateTask?.({
          title: title.trim(),
          description: description.trim(),
          status,
        })
      }
      // Reset form
      setTitle('')
      setDescription('')
      setTitleError('')
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
    setTitleError('')
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.status && currentUser.status.length > 0) {
      setStatus(currentUser.status[0].name)
    } else {
      setStatus('')
    }
    onClose()
  }

  const handleDeleteClick = () => {
    if (!isLoading && !isDeleting) {
      setIsDeleteConfirmOpen(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (isEdit && task && !isLoading && !isDeleting) {
      await onDeleteTask?.(task.id)
      setIsDeleteConfirmOpen(false)
      handleClose()
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false)
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
          'w-full max-w-[390px] pt-6 pr-6 pb-10 pl-6 gap-[35px] rounded-t-lg',
          isEdit ? 'h-[568px]' : 'h-[508px]',
          'sm:max-w-[448px] sm:p-6 sm:rounded-lg sm:rounded-t-lg',
          isEdit ? 'sm:h-[552px]' : 'sm:h-[492px]',
          'shadow-[0px_4px_6px_-2px_hsla(0,0%,0%,0.05),0px_10px_15px_-3px_hsla(0,0%,0%,0.1)]'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[18px]">
          <h2 className="font-primary text-lg font-[700] text-foreground">
            {isEdit ? t('dashboard.editTask') : t('dashboard.createTask')}
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
            <div className="flex flex-col w-full gap-1 opacity-100">
              <Label htmlFor="task-title" className="font-primary text-sm font-[400] text-foreground">
                {t('dashboard.taskTitle')}
              </Label>
              <Input
                id="task-title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  // Clear error when user starts typing
                  if (titleError) {
                    setTitleError('')
                  }
                }}
                placeholder={t('dashboard.taskTitlePlaceholder')}
                className={cn(
                  'font-primary text-sm',
                  'text-foreground',
                  'py-2',
                  !isRTL && 'px-3 pr-10',
                  titleError 
                    ? 'border-destructive focus-visible:ring-destructive placeholder:text-destructive' 
                    : 'placeholder:text-muted-foreground'
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


        <div className="flex flex-col w-full max-w-[400px] gap-4 opacity-100">
        {/* Create/Update Button */}
        <Button
          onClick={handleCreate}
          disabled={isLoading || isDeleting}
          className={cn(
            "w-full h-10 font-primary text-sm font-[700] transition-all",
            (isLoading || isDeleting)
              ? "bg-primary/70 text-primary-foreground cursor-wait"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{isEdit ? t('dashboard.updating') : t('dashboard.creating')}</span>
            </div>
          ) : (
            isEdit ? t('dashboard.update') : t('dashboard.create')
          )}
        </Button>

        {/* Delete Button - Only show in edit mode */}
        {isEdit && (
          <Button
            variant="outline"
            onClick={handleDeleteClick}
            disabled={isLoading || isDeleting}
            className={cn(
              "w-full h-10 font-primary text-sm font-[700] transition-all mt-1",
              "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",
              (isLoading || isDeleting) && "opacity-50 cursor-wait"
            )}
          >
            {isDeleting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{t('dashboard.deleting')}</span>
              </div>
            ) : (
              t('dashboard.delete')
            )}
          </Button>

        )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteConfirmOpen} onClose={handleDeleteCancel} width="auto" height="auto">
        <div
          className={cn(
            'flex flex-col opacity-100 relative',
            theme === 'dark' ? 'bg-[hsla(4,67%,7%,1)]' : 'bg-white',
            'w-full max-w-[390px] h-auto gap-[40px] rounded-lg p-6',
            'sm:max-w-[448px] sm:h-auto',
            'shadow-[0px_4px_6px_-2px_hsla(0,0%,0%,0.05),0px_10px_15px_-3px_hsla(0,0%,0%,0.1)]'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-[18px]">
            <h2 className="font-primary text-lg font-[700] text-foreground">
              {t('dashboard.deleteTask') || 'Delete Task'}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDeleteCancel}
            className={cn(
              'absolute top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10',
              isRTL ? 'left-6' : 'right-6'
            )}
          >
            <X className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Close</span>
          </button>

          {/* Content */}
          <div className="flex flex-col w-full max-w-[400px] gap-4 opacity-100">
            <div className="flex flex-col w-full opacity-100 items-center justify-center">
              <p className="font-primary font-[400] text-sm sm:text-base leading-[24px] sm:leading-[36px] tracking-[0%] text-center text-foreground whitespace-pre-line">
                {t('dashboard.deleteTaskWarning') || 'Are you sure you want to delete this task? This action cannot be undone.'}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className={cn(
                "w-full h-10 font-primary text-sm font-[700] transition-all",
                isDeleting
                  ? "bg-destructive/70 text-destructive-foreground cursor-wait"
                  : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              )}
            >
              {isDeleting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t('dashboard.deleting')}</span>
                </div>
              ) : (
                t('dashboard.delete')
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeleting}
              className="w-full h-10 font-primary text-sm font-[700] transition-all"
            >
              {t('dashboard.cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </Modal>
  )
}

export default CreateTaskModal

