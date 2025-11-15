import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Loader2 } from "lucide-react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface CreateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStatus?: (status: { title: string; color: string }) => void | Promise<void>;
  isLoading?: boolean;
}

// Color palette for status colors
const colorPalette = [
  "hsla(331, 96%, 39%, 1)",
  "hsla(237, 77%, 67%, 1)",
  "hsla(217, 59%, 72%, 1)",
  "hsla(217, 40%, 33%, 1)",
  "hsla(93, 100%, 24%, 1)",
  "hsla(255, 83%, 62%, 1)",
  "hsla(8, 18%, 69%, 1)",
  "hsla(212, 100%, 50%, 1)",
];

function CreateStatusModal({
  isOpen,
  onClose,
  onCreateStatus,
  isLoading = false,
}: CreateStatusModalProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);

  const handleCreate = async () => {
    if (title.trim() && !isLoading) {
      await onCreateStatus?.({
        title: title.trim(),
        color: selectedColor,
      });
      // Reset form
      setTitle("");
      setSelectedColor(colorPalette[0]);
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setSelectedColor(colorPalette[0]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} width="auto" height="auto">
      <div
        className={cn(
          "flex flex-col opacity-100 relative",
          theme === "dark" ? "bg-[hsla(4,67%,7%,1)]" : "bg-white",
          "w-full max-w-[390px] pt-6 pr-6 pb-10 pl-6 gap-[35px] rounded-t-lg",
          "sm:max-w-[448px] sm:p-6 sm:rounded-lg sm:rounded-t-lg",
          "shadow-[0px_4px_6px_-2px_hsla(0,0%,0%,0.05),0px_10px_15px_-3px_hsla(0,0%,0%,0.1)]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[18px]">
          <h2 className="font-primary text-lg font-[700] text-foreground">
            {t("dashboard.createStatus")}
          </h2>
        </div>

        {/* Close Button - Fixed Position */}
        <button
          onClick={handleClose}
          className={cn(
            "absolute top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10",
            isRTL ? "left-6" : "right-6"
          )}
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>

        {/* Form - Center Box: width 400, height 144, gap 24 */}
        <div className="flex flex-col w-full max-w-[400px] h-[144px] gap-[24px] opacity-100">
          {/* Status Title Input - width 400, height 54, gap 8 */}
          <div className="flex flex-col w-full h-[54px] gap-1 opacity-100">
            <Label
              htmlFor="status-title"
              className="font-primary text-sm font-[400] text-foreground"
            >
              {t("dashboard.statusTitle")}
            </Label>
            <Input
              id="status-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("dashboard.statusTitlePlaceholder")}
              className={cn(
                "font-primary text-sm",
                "text-foreground",
                "placeholder:text-muted-foreground",
                "py-2",
                !isRTL && "px-3"
              )}
            />
          </div>

          {/* Color Selection - width 400, height 66, gap 8 */}
          <div className="flex flex-col w-full h-[66px] gap-1 opacity-100">
            <Label className="font-primary text-sm font-[400] text-foreground">
              {t("dashboard.selectColor")}
            </Label>
            {/* Color Swatches - width 400, height 48, gap 8px */}
            <div className="relative flex w-full h-[48px] gap-1 opacity-100  gap-[0px] sm:gap-[8px]">
              {colorPalette.map((color) => (
                <div
                  key={color}
                  className="flex items-center justify-center w-[43px] h-[43px] rounded-[8px] bg-transparent"
                  style={{
                    border:
                    
                      selectedColor === color
                        ? `1px solid ${color}`
                        : "2px solid transparent",
                  }}
                >
                  <button
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "flex-shrink-0 w-[30px] h-[30px] cursor-pointer transition-all opacity-100 rounded-[6px]"
                    )}
                    style={{
                      backgroundColor: color,
                    }}
                    aria-label={`Select color ${color}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          disabled={isLoading}
          className={cn(
            "w-full h-10 font-primary text-sm font-[700] transition-all",
            isLoading
              ? "bg-primary/70 text-primary-foreground cursor-wait"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("dashboard.creating", { defaultValue: "Creating..." })}</span>
            </div>
          ) : (
            t("dashboard.create")
          )}
        </Button>
      </div>
    </Modal>
  );
}

export default CreateStatusModal;
