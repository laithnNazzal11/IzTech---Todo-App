import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

function SearchBar() {
  const { t } = useTranslation()
  
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={t('dashboard.search')}
        className="pl-10"
      />
    </div>
  )
}

export default SearchBar

