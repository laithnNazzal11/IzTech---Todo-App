import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DashboardContentProps {
  children: ReactNode
  centerContent?: boolean
}

function DashboardContent({ children, centerContent = false }: DashboardContentProps) {
  return (
    <div className={cn(
      "flex flex-col w-full h-full gap-6 opacity-100 py-6 px-4 sm:gap-6 sm:py-0 sm:px-4 md:gap-6 md:py-0 md:px-8",
      centerContent && "justify-center items-center min-h-0",
      !centerContent && "overflow-y-auto min-h-0"
    )}>
      {children}
    </div>
  )
}

export default DashboardContent

