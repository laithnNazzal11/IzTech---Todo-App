import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

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
      console.error("Signin error:", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-[486px] w-[512px] max-w-[512px] md:h-[386px] md:w-[360px] md:max-w-[360px] flex-col gap-[40px] sm:gap-[56px] md:gap-8 rounded-lg p-6 md:rounded-none md:border-0 sm:bg-transparent md:p-0"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-[124px] w-full flex-col gap-[12px] text-center"
      >
        <h1 className="font-primary text-[32px] font-[700] leading-[40px] tracking-[0] text-center">
          {t("auth.signInTitle")}
        </h1>
        <p className="font-primary text-[16px] font-[400] leading-[32px] tracking-[0.01em] text-center text-muted-foreground">
          {t("auth.signInSubtitle")}
        </p>
      </motion.div>

      <form
        className="flex w-full flex-col md:gap-4 sm:gap-[42px] gap-[40px]"
        onSubmit={handleSubmit}
      >
        {/* Error Message */}
        {error && (
          <div className="flex flex-col gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="font-primary text-sm font-[400] text-destructive">
              {t("auth.signInError")}
            </p>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
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
            className={cn(isLoading && "cursor-not-allowed opacity-50")}
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
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
            className={cn(isLoading && "cursor-not-allowed opacity-50")}
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:gap-4 md:gap-4 lg:gap-4 gap-[40px] "
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "sm:mt-4 mt-0 h-[36px] w-full rounded-md py-[6px] px-[3px] font-primary text-sm font-[700] transition-all",
                isLoading
                  ? "bg-primary/70 text-primary-foreground cursor-wait"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t("auth.signingIn") || "Signing in..."}</span>
                </div>
              ) : (
                t("auth.signIn")
              )}
            </Button>
          </motion.div>
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
        </motion.div>
      </form>
    </motion.div>
  );
}

export default SignInForm;
