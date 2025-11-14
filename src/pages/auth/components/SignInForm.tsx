import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function SignInForm() {
  const { t } = useTranslation();

  return (
    <div className="flex h-[486px] w-[512px] max-w-[512px] md:h-[386px] md:w-[360px] md:max-w-[360px] flex-col gap-[40px] sm:gap-[56px] md:gap-8 rounded-lg p-6 md:rounded-none md:border-0 sm:bg-transparent md:p-0">
      <div className="flex h-[124px] w-full flex-col gap-[12px] text-center">
        <h1 className="font-primary text-[32px] font-[700] leading-[40px] tracking-[0] text-center">
          {t("auth.signInTitle")}
        </h1>
        <p className="font-primary text-[16px] font-[400] leading-[32px] tracking-[0.01em] text-center text-muted-foreground">
          {t("auth.signInSubtitle")}
        </p>
      </div>

      <form className="flex w-full flex-col md:gap-4 sm:gap-[42px] gap-[40px] ">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder={t("auth.email")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{t("auth.password")}</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder={t("auth.password")}
          />
        </div>
        <div className="flex flex-col sm:gap-4 md:gap-4 lg:gap-4 gap-[40px] ">
          <Button className="sm:mt-4 mt-0 h-[36px] w-full rounded-md py-[6px] px-[3px] opacity-50">
            {t("auth.signInCta")}
          </Button>
          <p className="flex h-[22px] w-full items-center justify-center gap-1 text-center opacity-100">
            <span className="font-primary text-[14px] font-[700] leading-[160%] tracking-[0] text-muted-foreground">
              {t("auth.signUpPrompt")}{" "}
            </span>
            <Link
              to="/signup"
              className="font-primary text-[14px] font-[700] leading-[20px] tracking-[0] underline decoration-solid underline-offset-0 decoration-[1px] text-primary"
            >
              {t("auth.signUpLink")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
