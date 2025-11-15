import type { ReactNode } from 'react'

interface DashboardContentProps {
  children: ReactNode
}

function DashboardContent({ children }: DashboardContentProps) {
  return (
    <div className="flex flex-col w-full h-[760px] sm:h-[808px] md:h-[784px] gap-6 opacity-100 py-6 px-4 sm:gap-6 sm:py-0 sm:px-4 md:gap-6 md:py-0 md:px-8">
      {children}
    </div>
  )
}

export default DashboardContent

