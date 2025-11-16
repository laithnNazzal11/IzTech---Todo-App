import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DashboardContentProps {
  children: ReactNode
  centerContent?: boolean
}

function DashboardContent({ children, centerContent = false }: DashboardContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col w-full h-full gap-6 opacity-100 py-6 px-4 sm:gap-6 sm:py-0 sm:px-4 md:gap-6 md:py-0 md:px-8",
        centerContent && "justify-center items-center min-h-0",
        !centerContent && "overflow-y-auto min-h-0"
      )}
    >
      {children}
    </motion.div>
  )
}

export default DashboardContent

