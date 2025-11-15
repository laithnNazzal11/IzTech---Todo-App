import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { isAuth, getCurrentUser } from '@/utils/auth'
import { storage, STORAGE_KEYS } from '@/utils/storage'
import type { Task, Status, User } from '@/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import DashboardHeader from './components/DashboardHeader'
import DashboardContent from './components/DashboardContent'
import SearchBar from './components/SearchBar'
import StatusFilter from './components/StatusFilter'
import TaskTable from './components/TaskTable'
import Pagination from './components/Pagination'
import CreateTaskModal from './components/modals/CreateTaskModal'
import CreateStatusModal from './components/modals/CreateStatusModal'
import EmptyState from './components/EmptyState'

function Dashboard() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const [isCreateStatusModalOpen, setIsCreateStatusModalOpen] = useState(false)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [isCreatingStatus, setIsCreatingStatus] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [status, setStatus] = useState<Status[]>([])
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const itemsPerPage = 7

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (!isAuth()) {
      navigate('/signin', { replace: true })
      return
    }

    // Load tasks and status from current_user in localStorage
    const currentUser = getCurrentUser()
    if (currentUser) {
      setTasks(currentUser.tasks || [])
      setStatus(currentUser.status || [])
    }
  }, [navigate])

  // Reset to page 1 if current page is invalid after tasks change
  useEffect(() => {
    const totalPages = Math.ceil(tasks.length / itemsPerPage)
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [tasks.length, currentPage, itemsPerPage])

  const handleLanguageToggle = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en')
  }

  const handlePrevious = async () => {
    if (currentPage > 1) {
      setIsLoadingPage(true)
      // Mock loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentPage(currentPage - 1)
      setIsLoadingPage(false)
    }
  }

  const totalItems = tasks.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleNext = async () => {
    if (currentPage < totalPages) {
      setIsLoadingPage(true)
      // Mock loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentPage(currentPage + 1)
      setIsLoadingPage(false)
    }
  }

  // Calculate paginated tasks
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTasks = tasks.slice(startIndex, endIndex)

  const handleCreateTask = async (taskData: { title: string; description: string; status: string }) => {
    setIsCreatingTask(true)

    try {
      // Mock loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get current user
      const currentUser = getCurrentUser()
      if (!currentUser) return

      // Create new task object
      const newTask: Task = {
        id: uuidv4(),
        title: taskData.title.trim(),
        description: taskData.description?.trim() || undefined,
        status: taskData.status,
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
      }

      // Update current user's tasks array
      const updatedTasks = [...(currentUser.tasks || []), newTask]
      const updatedUser = {
        ...currentUser,
        tasks: updatedTasks,
      }

      // Update localStorage - CURRENT_USER
      storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

      // Update localStorage - USERS array
      const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? updatedUser : user
      )
      storage.set(STORAGE_KEYS.USERS, updatedUsers)

      // Update local state
      setTasks(updatedTasks)
    } finally {
      setIsCreatingTask(false)
    }
  }

  const handleCreateStatus = async (statusData: { title: string; color: string }) => {
    setIsCreatingStatus(true)

    try {
      // Mock loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get current user
      const currentUser = getCurrentUser()
      if (!currentUser) return

      // Create new status object
      const newStatus: Status = {
        id: uuidv4(),
        name: statusData.title.trim(),
        color: statusData.color,
        userId: currentUser.id,
      }

      // Update current user's status array
      const updatedStatuses = [...(currentUser.status || []), newStatus]
      const updatedUser = {
        ...currentUser,
        status: updatedStatuses,
      }

      // Update localStorage - CURRENT_USER
      storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

      // Update localStorage - USERS array
      const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? updatedUser : user
      )
      storage.set(STORAGE_KEYS.USERS, updatedUsers)

      // Update local state
      setStatus(updatedStatuses)
    } finally {
      setIsCreatingStatus(false)
    }
  }

  const handleToggleFavorite = (taskId: string) => {
    // Get current user
    const currentUser = getCurrentUser()
    if (!currentUser) return

    // Update task's favorite status
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, isFavorite: !task.isFavorite, updatedAt: new Date().toISOString() }
        : task
    )

    const updatedUser = {
      ...currentUser,
      tasks: updatedTasks,
    }

    // Update localStorage - CURRENT_USER
    storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

    // Update localStorage - USERS array
    const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user
    )
    storage.set(STORAGE_KEYS.USERS, updatedUsers)

    // Update local state
    setTasks(updatedTasks)
  }

  // Check if status array is empty
  const isStatusEmpty = !status || status.length === 0
  // Check if tasks array is empty (but status exists)
  const isTasksEmpty = !tasks || tasks.length === 0

  return (
    <section className="flex h-screen w-full flex-col bg-background text-foreground px-[8px] sm:px-4 md:px-0 overflow-hidden">
      {/* Top Container */}
      <div className="w-full flex-shrink-0">
        <DashboardHeader
          onToggleLanguage={handleLanguageToggle}
          onToggleTheme={toggleTheme}
        />
      </div>

      {/* Bottom Container */}
      <div className="w-full flex-1 min-h-0 mt-4 md:mt-10">
        <DashboardContent centerContent={isStatusEmpty}>
          {isStatusEmpty ? (
            <EmptyState 
              isStatus={true} 
              onCreateClick={() => setIsCreateStatusModalOpen(true)} 
            />
          ) : (
            /* My Tasks Section */
            <div className={cn("flex flex-col gap-[24px]", isTasksEmpty && "h-full")}>
              <div className="flex items-center justify-between">
                <h1 className="font-primary text-[24px] font-[700] leading-[32px] tracking-[0] text-foreground">
                  {t('dashboard.myTasks')}
                </h1>
                <Button
                  onClick={() => setIsCreateTaskModalOpen(true)}
                  className="w-12 h-8 gap-2 py-2 px-1 rounded-md opacity-100 transition-all duration-200 bg-[hsla(350,96%,43%,1)] shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.06),0px_1px_3px_0px_hsla(0,0%,0%,0.1)] hover:bg-[hsla(350,96%,38%,1)] hover:shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.1),0px_2px_6px_0px_hsla(0,0%,0%,0.15)] sm:w-[142px] sm:h-[36px] sm:bg-primary sm:text-primary-foreground sm:shadow-none sm:hover:bg-primary/90 sm:hover:shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.1)]"
                >
                  <Plus className="h-4 w-4 text-white sm:hidden" />
                  <span className="hidden sm:inline">{t('dashboard.createNewTask')}</span>
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <SearchBar />
                <StatusFilter onCreateStatus={handleCreateStatus} isLoading={isCreatingStatus} />
              </div>

              {/* Task Table or Empty State */}
              {isTasksEmpty ? (
                <EmptyState 
                  isStatus={false} 
                  onCreateClick={() => setIsCreateTaskModalOpen(true)} 
                />
              ) : (
                <>
                  {/* Task Table */}
                  <div className="mt-[24px] mb-4">
                    <TaskTable 
                      tasks={paginatedTasks} 
                      onToggleFavorite={handleToggleFavorite}
                      isLoading={isLoadingPage}
                    />
                  </div>

                  {/* Pagination */}
                  <div className={cn(
                    "flex-shrink-0 pb-4 pt-4 border-t",
                    theme === 'dark' 
                      ? 'border-t-[hsla(0,0%,16%,1)]' 
                      : 'border-t-[hsla(200,33%,98%,1)]'
                  )}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      onPrevious={handlePrevious}
                      onNext={handleNext}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </DashboardContent>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
        isLoading={isCreatingTask}
      />

      {/* Create Status Modal */}
      <CreateStatusModal
        isOpen={isCreateStatusModalOpen}
        onClose={() => setIsCreateStatusModalOpen(false)}
        onCreateStatus={handleCreateStatus}
        isLoading={isCreatingStatus}
      />
    </section>
  )
}

export default Dashboard
