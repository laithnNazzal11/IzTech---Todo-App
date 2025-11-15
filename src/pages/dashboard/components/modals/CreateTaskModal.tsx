import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, X } from 'lucide-react'
import Modal from './Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask?: (task: { title: string; description: string; status: string }) => void
}

// Mock statuses - replace with actual data
const statuses = [
  { id: 'todo', name: 'To Do' },
  { id: 'in-progress', name: 'In Progress' },
  { id: 'done', name: 'Done' },
]

function CreateTaskModal({ isOpen, onClose, onCreateTask }: CreateTaskModalProps) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isRTL = language === 'ar'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('todo')

  const handleCreate = () => {
    if (title.trim()) {
      onCreateTask?.({
        title: title.trim(),
        description: description.trim(),
        status,
      })
      // Reset form
      setTitle('')
      setDescription('')
      setStatus('todo')
      onClose()
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setStatus('todo')
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
              <div className="relative w-full h-[36px] opacity-100">
                <select
                  id="task-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={cn(
                    'w-full h-full rounded-md bg-background',
                    'px-3 py-2',
                    isRTL ? 'pr-4' : 'pl-4',
                    'flex justify-between items-center',
                    'font-primary text-sm font-normal leading-[160%] tracking-[0%] opacity-100',
                    'text-foreground',
                    'border border-input dark:border-white',
                    'shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.05)]',
                    'ring-offset-background',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'appearance-none cursor-pointer'
                  )}
                >
                  <option value="todo">To Do</option>
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 opacity-100 pointer-events-none text-muted-foreground',
                    isRTL ? 'left-4' : 'right-4'
                  )}
                  style={{ width: '16px', height: '16px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-primary text-sm font-[700]"
        >
          {t('dashboard.create')}
        </Button>
      </div>
    </Modal>
  )
}

export default CreateTaskModal

