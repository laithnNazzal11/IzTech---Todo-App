import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useTranslation()
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-1"
    >
      <motion.div
        animate={{ 
          scale: value ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </motion.div>
      <Input
        type="text"
        placeholder={t('dashboard.search')}
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  )
}

export default SearchBar

