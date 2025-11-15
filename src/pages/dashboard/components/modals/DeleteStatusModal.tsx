import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface DeleteStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  statusName?: string;
}

function DeleteStatusModal({
  isOpen,
  onClose,
  onDelete,
  statusName = "To Do",
}: DeleteStatusModalProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";

  // Append "Status" / "حالة" to the status name (keep status name as is, only translate "Status")
  const translatedStatusName = statusName 
    ? `${statusName} ${t("dashboard.statusWord")}` 
    : `To Do ${t("dashboard.statusWord")}`;

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="auto" height="auto">
      <div
        className={cn(
          "flex flex-col opacity-100 relative",
          "bg-background",
          "w-full max-w-[390px] h-auto gap-[40px] rounded-lg p-6",
          "sm:max-w-[448px] sm:h-[342px]",
          "shadow-[0px_4px_6px_-2px_hsla(0,0%,0%,0.05),0px_10px_15px_-3px_hsla(0,0%,0%,0.1)]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[18px]">
          <h2 className="font-primary text-lg font-[700] text-foreground">
            {t("dashboard.deleteStatus")}
          </h2>
        </div>

        {/* Close Button - Fixed Position */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10",
            isRTL ? "left-6" : "right-6"
          )}
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col w-full max-w-[400px] h-[160px] gap-4 opacity-100">
          <div className="flex flex-col w-full h-[72px] opacity-100 items-center justify-center">
            <p className="font-primary font-[700] text-[20px] leading-[32px] tracking-[0%] text-center text-foreground">
              {t("dashboard.deleteStatusWarning")}
            </p>
            <p className="font-primary font-[700] text-[20px] leading-[32px] tracking-[0%] text-center text-foreground">
              {t("dashboard.deleteStatusWarningName", { statusName: translatedStatusName })}
            </p>
          </div>

          <div className="flex flex-col w-full h-[72px] opacity-100 items-center justify-center">
            <p className="font-primary font-[400] text-sm sm:text-base leading-[24px] sm:leading-[36px] tracking-[0%] text-center text-foreground whitespace-pre-line">
              {t("dashboard.deleteStatusDescription")}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <Button
          onClick={handleDelete}
          className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-primary text-sm font-[700]"
        >
          {t("dashboard.deleteStatusButton")}
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteStatusModal;

