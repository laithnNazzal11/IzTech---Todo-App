import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-background text-foreground">
            <AppRoutes />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
