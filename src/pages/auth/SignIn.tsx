import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'
import PromoPanel from './components/PromoPanel'
import AuthHeader from './components/AuthHeader'
import SignInForm from './components/SignInForm'
import AuthFooter from './components/AuthFooter'

function SignIn() {
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()

  const handleLanguageToggle = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <section className="flex min-h-screen w-full justify-center bg-background text-foreground">
      <div className="flex w-full flex-1">
        <PromoPanel />

        <div className="flex min-h-screen flex-1 flex-col px-6">
          <AuthHeader
            theme={theme}
            onToggleLanguage={handleLanguageToggle}
            onToggleTheme={toggleTheme}
          />

          <main className="flex flex-1 items-center justify-center">
            <SignInForm />
          </main>

          <AuthFooter />
        </div>
      </div>
    </section>
  )
}

export default SignIn
