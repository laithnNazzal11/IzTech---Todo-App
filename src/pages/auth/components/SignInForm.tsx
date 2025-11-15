import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

function SignInForm() {
  const { t } = useTranslation();
  const { signIn, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      // Error is handled by the hook and displayed via error state
      console.error('Signin error:', err);
    }
  };

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

      <form className="flex w-full flex-col md:gap-4 sm:gap-[42px] gap-[40px]" onSubmit={handleSubmit}>
        {/* Error Message */}
        {error && (
          <div className="flex flex-col gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="font-primary text-sm font-[400] text-destructive">
              {t("auth.signInError")}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t("auth.email")}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{t("auth.password")}</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t("auth.password")}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col sm:gap-4 md:gap-4 lg:gap-4 gap-[40px] ">
          <Button 
            type="submit"
            className="sm:mt-4 mt-0 h-[36px] w-full rounded-md py-[6px] px-[3px] bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? t("auth.signingIn") || "Signing in..." : t("auth.signInCta")}
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
