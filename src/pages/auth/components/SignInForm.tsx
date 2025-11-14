import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

function SignInForm() {
  const { t } = useTranslation()

  return (
    <div className="flex h-[386px] w-[360px] max-w-[360px] flex-col gap-8">
      <div className="flex h-[124px] w-[360px] flex-col gap-[12px] text-center">
        <h1 className="font-primary text-[32px] font-[700] leading-[40px] tracking-[0] text-center">
          {t('auth.signInTitle')}
        </h1>
        <p className="font-primary text-[16px] font-[400] leading-[32px] tracking-[0.01em] text-center text-muted-foreground">
          {t('auth.signInSubtitle')}
        </p>
      </div>

      <form className="flex w-[360px] flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input id="email" type="email" name="email" placeholder={t('auth.email')} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder={t('auth.password')}
          />
        </div>
        <Button className="mt-4 h-[36px] w-[360px] rounded-md py-[6px] px-[3px] opacity-50">
          {t('auth.signInCta')}
        </Button>
      </form>

      <p className="flex h-[22px] w-[360px] items-center justify-center gap-1 text-center opacity-100">
        <span className="font-primary text-[14px] font-[700] leading-[160%] tracking-[0] text-muted-foreground">
          {t('auth.signUpPrompt')}{' '}
        </span>
        <button
          type="button"
          className="font-primary text-[14px] font-[700] leading-[20px] tracking-[0] underline decoration-solid underline-offset-0 decoration-[1px] text-primary"
        >
          {t('auth.signUpLink')}
        </button>
      </p>
    </div>
  )
}

export default SignInForm

