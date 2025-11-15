import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import DashboardHeader from './components/DashboardHeader'
import DashboardContent from './components/DashboardContent'
import SearchBar from './components/SearchBar'
import StatusFilter from './components/StatusFilter'
import TaskTable from './components/TaskTable'
import Pagination from './components/Pagination'

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

  return (
    <section className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* Top Container */}
      <div className="w-full">
        <DashboardHeader
          onToggleLanguage={handleLanguageToggle}
          onToggleTheme={toggleTheme}
        />
      </div>

      {/* Bottom Container */}
      <div className="w-full mt-4 md:mt-12">
        <DashboardContent>
        {/* My Tasks Section */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-center justify-between">
            <h1 className="font-primary text-[24px] font-[700] leading-[32px] tracking-[0] text-foreground">
              {t('dashboard.myTasks')}
            </h1>
            <Button
              className="w-[142px] h-[36px] gap-2 bg-primary text-primary-foreground hover:bg-primary/90 opacity-100"
            >
              {t('dashboard.createNewTask')}
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
    </section>
  )
}

export default Dashboard
