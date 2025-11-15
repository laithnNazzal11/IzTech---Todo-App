import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import DashboardHeader from './components/DashboardHeader'
import DashboardContent from './components/DashboardContent'
import SearchBar from './components/SearchBar'
import StatusFilter from './components/StatusFilter'
import TaskTable from './components/TaskTable'
import Pagination from './components/Pagination'
import CreateTaskModal from './components/modals/CreateTaskModal'

// Mock data - replace with actual data fetching
const mockTasks = [
  {
    id: '1',
    title: 'Design landing Page',
    description: 'flfasdmfsdmfmsdlvm,xcmv.mxc.vmxcmvlxcmvl',
    status: 'In Progress',
    isFavorite: true,
  },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: String(i + 2),
    title: 'Design landing Page',
    description: 'flfasdmfsdmfmsdlvm,xcmv.mxc.vmxcmvlxcmvl',
    status: 'In Progress',
    isFavorite: false,
  })),
]

function Dashboard() {
  const { t } = useTranslation()
  const { toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const itemsPerPage = 7
  const totalItems = 120

  const handleLanguageToggle = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en')
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleCreateTask = (task: { title: string; description: string; status: string }) => {
    // TODO: Implement task creation logic
    console.log('Create task:', task)
  }

  return (
    <section className="flex min-h-screen w-full flex-col bg-background text-foreground px-[8px] sm:px-4 md:px-0">
      {/* Top Container */}
      <div className="w-full">
        <DashboardHeader
          onToggleLanguage={handleLanguageToggle}
          onToggleTheme={toggleTheme}
        />
      </div>

      {/* Bottom Container */}
      <div className="w-full mt-4 md:mt-10">
        <DashboardContent>
        {/* My Tasks Section */}
        <div className="flex flex-col gap-[24px]">
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
            <StatusFilter />
          </div>

          {/* Task Table */}
          <div className="flex-1 overflow-auto mt-[24px]">
            <TaskTable tasks={mockTasks} />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </DashboardContent>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
      />
    </section>
  )
}

export default Dashboard
