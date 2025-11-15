import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DashboardContentProps {
  children: ReactNode
  centerContent?: boolean
}

function DashboardContent({ children, centerContent = false }: DashboardContentProps) {
  return (
    <div className={cn(
      "flex flex-col w-full h-[calc(100vh-200px)] sm:h-[808px] md:h-[784px] gap-6 opacity-100 py-6 px-4 sm:gap-6 sm:py-0 sm:px-4 md:gap-6 md:py-0 md:px-8",
      centerContent && "justify-center items-center",
      "overflow-hidden"
    )}>
      {children}
    </div>
  )
}

export default DashboardContent

