import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function SignUpForm() {
  const { t } = useTranslation();
  const { signUp, isLoading, error, clearError } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAvatarError(null);
    clearError();
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setAvatarError('File must be an image');
        setAvatarFile(null);
        setAvatarPreview(null);
        return;
      }

      // Validate file size (2MB limit)
      const maxSizeBytes = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSizeBytes) {
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        setAvatarError(`Image size must be less than 2MB. Current size: ${fileSizeMB}MB`);
        setAvatarFile(null);
        setAvatarPreview(null);
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    const input = document.getElementById('avatar-upload') as HTMLInputElement;
    input?.click();
  };

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
      await signUp(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        avatarFile || undefined
      );
    } catch (err) {
      // Error is handled by the hook and displayed via error state
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="flex w-[640px] max-w-[640px] md:w-[360px] md:max-w-[360px] flex-col  sm:gap-[24px] md:gap-8 rounded-lg p-6 md:rounded-none md:border-0 sm:bg-transparent md:p-0">
      <div className="flex w-full h-[116px] sm:h-[92px] flex-col gap-[12px] text-center">
        <h1 className="font-primary text-[32px] font-[700] leading-[40px] tracking-[0] text-center">
          {t("auth.signUpTitle")}
        </h1>
        <p className="font-primary text-[14px] font-[400] sm:leading-[32px] leading-[24px] tracking-[0.01em] text-center text-muted-foreground">
          {t("auth.signUpSubtitle")}
        </p>
      </div>

      <form className="flex w-full flex-col md:gap-4 gap-4" onSubmit={handleSubmit}>
        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center  gap-[24px] sm:gap-4 sm:flex-row md:items-center md:justify-start md:pb-[16px] sm:h-[88px]">
          <div className="relative flex-shrink-0">
            <div className="h-[80px] w-[80px] sm:h-[40px] sm:w-[40px] md:h-[40px] md:w-[40px] rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src="/images/Avatar.png"
                  alt="Avatar"
                  className="h-full w-full object-contain"
                /> )}
            </div>
          </div>
          <div className="w-full sm:w-[104px]">
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isLoading}
              className="hidden w-full"
 
            />
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={handleUploadClick}
              disabled={isLoading}
              className={cn(
                "w-full h-[36px] py-2 px-1 gap-2 rounded-md border border-border dark:border-white opacity-100",
                isLoading && "cursor-not-allowed opacity-50"
              )}
            >
              <Upload className="h-4 w-4 opacity-100" style={{ width: '16px', height: '16px' }} />
              <span 
                className="font-primary text-[14px] font-[700] leading-[20px] tracking-[0] opacity-100 inline-flex items-center"
                style={{ height: '20px' }}
              >
                {t("auth.upload")}
              </span>
            </Button>
          </div>
        </div>

        {/* Avatar Error Message */}
        {avatarError && (
          <div className="flex flex-col gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="font-primary text-sm font-[400] text-destructive">
              {avatarError}
            </p>
          </div>
        )}

        {/* General Error Message */}
        {error && (
          <div className="flex flex-col gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="font-primary text-sm font-[400] text-destructive">
              {error}
            </p>
          </div>
        )}

        {/* Form Fields */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t("auth.name")}</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t("auth.name")}
            required
            disabled={isLoading}
            className={cn(isLoading && "cursor-not-allowed opacity-50")}
          />
        </div>
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
            className={cn(isLoading && "cursor-not-allowed opacity-50")}
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
            minLength={8}
            className={cn(isLoading && "cursor-not-allowed opacity-50")}
          />
          <p className="font-primary text-[12px] font-[400] leading-[16px] tracking-[0] text-muted-foreground">
            {t("auth.passwordHint")}
          </p>
        </div>

        {/* Submit Button and Footer */}
        <div className="flex flex-col sm:gap-4 md:gap-4 lg:gap-4 gap-[40px]">
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
                <span>{t("auth.signingUp")}</span>
              </div>
            ) : (
              t("auth.signUp")
            )}
          </Button>
          <p className="flex h-[22px] w-full items-center justify-center gap-1 text-center opacity-100">
            <span className="font-primary text-[14px] font-[400] leading-[160%] tracking-[0] text-muted-foreground">
              {t("auth.signInPrompt")}{" "}
            </span>
            <Link
              to="/signin"
              className="font-primary text-[14px] font-[700] leading-[20px] tracking-[0] underline decoration-solid underline-offset-0 decoration-[1px] text-primary"
            >
              {t("auth.signInLink")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;

