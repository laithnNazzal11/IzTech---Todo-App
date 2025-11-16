import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { isAuth, getCurrentUser } from '@/utils/auth'
import type { Task, Status } from '@/types'
import { createTask, createStatus, toggleTaskFavorite, changeTaskStatus, updateTask, deleteTask, deleteStatus } from '@/utils/dashboard'
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
import TaskTableSkeleton from './components/TaskTableSkeleton'

function Dashboard() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if navigating from signup
  const fromSignup = (location.state as { fromSignup?: boolean })?.fromSignup || false
    
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const [isCreateStatusModalOpen, setIsCreateStatusModalOpen] = useState(false)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [isDeletingTask, setIsDeletingTask] = useState(false)
  const [isCreatingStatus, setIsCreatingStatus] = useState(false)
  const [isDeletingStatus, setIsDeletingStatus] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [status, setStatus] = useState<Status[]>([])
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [changingStatusTaskId, setChangingStatusTaskId] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  
  
  // Responsive items per page: 4 for mobile (< 391px), 7 for desktop (>= 391px)
  const isMobile = useMemo(() => windowWidth < 391, [windowWidth])
  const itemsPerPage = useMemo(() => isMobile ? 4 : 7, [isMobile])

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (!isAuth()) {
      navigate('/signin', { replace: true })
      return
    }

    // Load tasks and status from current_user in localStorage with 2s delay
    const loadData = async (): Promise<void> => {
      setIsInitialLoading(true)
      // Mock loading delay of 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      const currentUser = getCurrentUser()
      if (currentUser) {
        setTasks(currentUser.tasks || [])
        setStatus(currentUser.status || [])
      }
      setIsInitialLoading(false)
    }

    loadData()
  }, [])

  // Track window width for responsive pagination
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Debounce search query with loading state
  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery)
        setIsSearching(false)
      }, 300) // 300ms delay for search

      return () => {
        clearTimeout(timer)
        setIsSearching(false)
      }
    }
  }, [searchQuery, debouncedSearchQuery])

  const handleLanguageToggle = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en')
  }

  // Filter tasks by search query (title) - use debounced query for actual filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase().trim())
    )
  }, [tasks, debouncedSearchQuery])

  // Reset to page 1 if current page is invalid after tasks change or itemsPerPage change
  useEffect(() => {
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    } else if (totalPages === 0 && currentPage > 1) {
      setCurrentPage(1)
    }
  }, [filteredTasks.length, currentPage, itemsPerPage])

  const handlePrevious = async () => {
    if (currentPage > 1) {
      setIsLoadingPage(true)
      // Mock loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentPage(currentPage - 1)
      setIsLoadingPage(false)
    }
  }

  const totalItems = useMemo(() => filteredTasks.length, [filteredTasks])
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage])

  const handleNext = async () => {
    if (currentPage < totalPages) {
      setIsLoadingPage(true)
      // Mock loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentPage(currentPage + 1)
      setIsLoadingPage(false)
    }
  }

  // Calculate paginated tasks from filtered tasks
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredTasks.slice(startIndex, endIndex)
  }, [filteredTasks, currentPage, itemsPerPage])

  // Reset to page 1 when debounced search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery])

  const handleCreateTask = async (taskData: { title: string; description: string; status: string }) => {
    setIsCreatingTask(true)

    try {
      const updatedTasks = await createTask(taskData)
      if (updatedTasks) {
        setTasks(updatedTasks)
      }
    } finally {
      setIsCreatingTask(false)
    }
  }

  const handleUpdateTask = async (taskId: string, taskData: { title: string; description: string; status: string }) => {
    setIsCreatingTask(true)

    try {
      const updatedTasks = await updateTask(taskId, taskData, tasks)
      if (updatedTasks) {
        setTasks(updatedTasks)
        setEditingTask(null)
      }
    } finally {
      setIsCreatingTask(false)
    }
  }

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setEditingTask(task)
      setIsCreateTaskModalOpen(true)
    }
  }

  const handleCloseTaskModal = () => {
    setIsCreateTaskModalOpen(false)
    setEditingTask(null)
  }

  const handleDeleteTask = async (taskId: string) => {
    setIsDeletingTask(true)

    try {
      const updatedTasks = await deleteTask(taskId, tasks)
      if (updatedTasks) {
        setTasks(updatedTasks)
        setEditingTask(null)
        setIsCreateTaskModalOpen(false)
      }
    } finally {
      setIsDeletingTask(false)
    }
  }

  const handleCreateStatus = async (statusData: { title: string; color: string }) => {
    setIsCreatingStatus(true)

    try {
      const updatedStatuses = await createStatus(statusData)
      if (updatedStatuses) {
        setStatus(updatedStatuses)
      }
    } finally {
      setIsCreatingStatus(false)
    }
  }

  const handleToggleFavorite = (taskId: string) => {
    const updatedTasks = toggleTaskFavorite(taskId, tasks)
    if (updatedTasks) {
      setTasks(updatedTasks)
    }
  }

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    // Set loading state
    setChangingStatusTaskId(taskId)

    try {
      const updatedTasks = await changeTaskStatus(taskId, newStatus, tasks)
      if (updatedTasks) {
        setTasks(updatedTasks)
      }
    } finally {
      // Clear loading state
      setChangingStatusTaskId(null)
    }
  }

  const handleDeleteStatus = async (statusId: string, statusName: string) => {
    setIsDeletingStatus(true)

    try {
      const result = await deleteStatus(statusId, statusName, status, tasks)
      if (result) {
        setStatus(result.updatedStatuses)
        setTasks(result.updatedTasks)
      }
    } finally {
      setIsDeletingStatus(false)
    }
  }

  // Check if status array is empty
  const isStatusEmpty = useMemo(() => !status || status.length === 0, [status])
  // Check if tasks array is empty (but status exists) - don't consider empty during initial loading
  const isTasksEmpty = useMemo(() => !isInitialLoading && (!tasks || tasks.length === 0), [isInitialLoading, tasks])

  if(isInitialLoading && !fromSignup) {
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
          <DashboardContent centerContent={false}>
            <TaskTableSkeleton itemsPerPage={isMobile ? 4 : 7} />
          </DashboardContent>
        </div>
      </section>
    )
  }

  if (fromSignup && location.state) {
    // Replace current location without the fromSignup state
    navigate(location.pathname, { replace: true, state: {} })
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-screen w-full flex-col bg-background text-foreground px-[8px] sm:px-4 md:px-0 overflow-hidden"
    >
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={cn("flex flex-col gap-[24px]", isTasksEmpty && "h-full")}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-primary text-[24px] font-[700] leading-[32px] tracking-[0] text-foreground">
                  {t('dashboard.myTasks')}
                </h1>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setIsCreateTaskModalOpen(true)}
                    className="w-12 h-8 gap-2 py-2 px-1 rounded-md opacity-100 transition-all duration-200 bg-[hsla(350,96%,43%,1)] shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.06),0px_1px_3px_0px_hsla(0,0%,0%,0.1)] hover:bg-[hsla(350,96%,38%,1)] hover:shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.1),0px_2px_6px_0px_hsla(0,0%,0%,0.15)] sm:w-[142px] sm:h-[36px] sm:bg-primary sm:text-primary-foreground sm:shadow-none sm:hover:bg-primary/90 sm:hover:shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.1)]"
                  >
                    <Plus className="h-4 w-4 text-white sm:hidden" />
                    <span className="hidden sm:inline">{t('dashboard.createNewTask')}</span>
                  </Button>
                </motion.div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <StatusFilter onCreateStatus={handleCreateStatus} isLoading={isCreatingStatus} />
              </div>

              {isTasksEmpty ? (
                <EmptyState 
                  isStatus={false} 
                  onCreateClick={() => setIsCreateTaskModalOpen(true)} 
                />
              ) : filteredTasks.length === 0 ? (
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
                      onStatusChange={handleStatusChange}
                      onEdit={handleEditTask}
                      onDeleteStatus={handleDeleteStatus}
                      isLoading={isLoadingPage || isSearching}
                      changingStatusTaskId={changingStatusTaskId}
                      isDeletingStatus={isDeletingStatus}
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
            </motion.div>
          )}
        </DashboardContent>
      </div>

      {/* Create/Edit Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={handleCloseTaskModal}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        isLoading={isCreatingTask}
        isDeleting={isDeletingTask}
        isEdit={!!editingTask}
        task={editingTask}
      />

      {/* Create Status Modal */}
      <CreateStatusModal
        isOpen={isCreateStatusModalOpen}
        onClose={() => setIsCreateStatusModalOpen(false)}
        onCreateStatus={handleCreateStatus}
        isLoading={isCreatingStatus}
      />
    </motion.section>
  )
}

export default Dashboard
