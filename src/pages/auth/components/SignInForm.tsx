import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

function SignInForm() {
  const { t } = useTranslation()

  return (
    <div className="flex h-[386px] w-[360px] max-w-[360px] flex-col gap-8">
      <div className="flex h-[124px] flex-col gap-3 text-center">
        <h1 className="text-3xl font-semibold">{t('auth.signInTitle')}</h1>
        <p className="text-sm text-muted-foreground">{t('auth.signInSubtitle')}</p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input id="email" type="email" name="email" placeholder={t('auth.email')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder={t('auth.password')}
          />
        </div>
        <Button className="mt-2 h-12 w-full rounded-full text-base font-semibold">
          {t('auth.signInCta')}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t('auth.signUpPrompt')}{' '}
        <button type="button" className="font-semibold text-primary">
          {t('auth.signUpLink')}
        </button>
      </p>
    </div>
  )
}

export default SignInForm

