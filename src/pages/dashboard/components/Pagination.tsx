import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPrevious,
  onNext,
}: PaginationProps) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isRTL = language === "ar";
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const borderColor =
    theme === "dark" ? "hsla(0, 0%, 16%, 1)" : "hsla(200, 33%, 98%, 1)";

  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="w-[112px] h-[36px] rounded-md gap-2 opacity-100 bg-white dark:bg-background flex items-center justify-center"
        style={{
          paddingTop: "8px",
          paddingRight: "4px",
          paddingBottom: "8px",
          paddingLeft: "4px",
          border: `1px solid ${borderColor}`,
          boxShadow: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)",
        }}
      >
        {isRTL ? (
          <>
            <ArrowRight className="h-4 w-4 text-foreground" strokeWidth={2.5} />
            <span className="font-primary text-sm font-medium text-foreground">
              {t("dashboard.previous")}
            </span>
          </>
        ) : (
          <>
            <ArrowLeft className="h-4 w-4 text-foreground" strokeWidth={2.5} />
            <span className="font-primary text-sm font-medium text-foreground">
              {t("dashboard.previous")}
            </span>
          </>
        )}
      </Button>

      <span className="font-primary text-sm text-muted-foreground">
        {startItem}-{endItem} {t("dashboard.of")} {totalItems}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="w-[112px] h-[36px] rounded-md gap-2 opacity-100 bg-white dark:bg-background flex items-center justify-center"
        style={{
          paddingTop: "8px",
          paddingRight: "4px",
          paddingBottom: "8px",
          paddingLeft: "4px",
          border: `1px solid ${borderColor}`,
          boxShadow: "0px 1px 2px 0px hsla(0, 0%, 0%, 0.05)",
        }}
      >
        {isRTL ? (
          <>
            <span className="font-primary text-sm font-medium text-foreground">
              {t("dashboard.next")}
            </span>

            <ArrowLeft className="h-4 w-4 text-foreground" strokeWidth={2.5} />
          </>
        ) : (
          <>
            <span className="font-primary text-sm font-medium text-foreground">
              {t("dashboard.next")}
            </span>
            <ArrowRight className="h-4 w-4 text-foreground" strokeWidth={2.5} />
          </>
        )}
      </Button>
    </div>
  );
}

export default Pagination;
