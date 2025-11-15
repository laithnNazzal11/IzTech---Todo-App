import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface EmptyStateProps {
  isStatus: boolean;
  onCreateClick: () => void;
}

function EmptyState({ isStatus, onCreateClick }: EmptyStateProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const statusConfig = {
    title: t("dashboard.emptyStatusTitle"),
    description: t("dashboard.emptyStatusDescription"),
    buttonText: t("dashboard.createNewStatus"),
    imageSrc: theme === 'dark' ? "/images/emptyStatusDark.png" : "/images/emptyStatus.png",
  };

  const tasksConfig = {
    title: t("dashboard.emptyTasksTitle"),
    description: t("dashboard.emptyTasksDescription"),
    buttonText: t("dashboard.createNewTask"),
    imageSrc: "/images/emptyTasks.png",
  };

  const config = isStatus ? statusConfig : tasksConfig;

  return (
    <div
      className={cn(
        "flex flex-col",
        "border border-dashed rounded-lg p-4 sm:p-6 gap-4 sm:gap-6",
        "border-[hsla(240,6%,90%,1)]",
        isStatus
          ? "items-center justify-center w-full max-w-full md:max-w-[1344px] h-auto"
          : "items-center justify-center w-full max-w-full md:max-w-[100%] h-full mb-8 overflow-hidden"
      )}
    >
      {/* Ghost Illustration */}
      <div className={cn(
        "flex items-center justify-center",
        isStatus 
          ? "w-[91.74px] h-[185.99px]"
          : "w-[136.13px] h-[169.08px]"
      )}>
        <img
          src={config.imageSrc}
          alt={isStatus ? "Empty status" : "Empty tasks"}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text Box Container */}
      <div className={cn(
        "flex flex-col items-center justify-center",
        isStatus 
          ? "w-full max-w-[1296px] h-auto min-h-[112px] gap-2"
          : "w-full max-w-[1344px] h-auto min-h-[112px] gap-2"
      )}>
        {/* Title - Heading 3 */}
        <h2 className={cn(
          "font-primary font-[700] text-center text-foreground",
          "text-2xl sm:text-3xl leading-[1.2] tracking-[0%]"
        )}>
          {config.title}
        </h2>

        {/* Description - Heading 5 */}
        <p className={cn(
          "font-primary font-[400] text-center whitespace-pre-line",
          "leading-[1.5] tracking-[0.01em]",
          isStatus 
            ? "text-lg sm:text-xl text-foreground"
            : theme === 'dark' 
              ? "text-sm sm:text-lg text-[hsla(0,0%,92%,1)]"
              : "text-sm sm:text-lg text-[hsla(0,0%,28%,1)]"
        )}>
          {config.description}
        </p>
      </div>

      {/* Create Button */}
      <Button
        onClick={onCreateClick}
        className={cn(
          "rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-primary font-[700]",
          "shadow-[0px_1px_2px_0px_hsla(0,0%,0%,0.06),0px_1px_3px_0px_hsla(0,0%,0%,0.1)]",
          isStatus
            ? "w-[154px] h-9 py-2 px-4 gap-2"
            : "h-10 px-6 gap-2"
        )}
      >
        {config.buttonText}
      </Button>
    </div>
  );
}

export default EmptyState;
