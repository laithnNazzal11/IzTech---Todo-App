import { Logo } from "@/components/brand/Logo";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

function PromoPanel() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <aside className="hidden w-full md:flex md:flex-1 md:max-w-[520px] break1040:flex-none flex-col justify-between bg-primary px-[12px] pb-12 pt-[100px] text-white md:min-w-0">
      {/* Todo Logo */}
      <div className="mx-auto flex h-[84.82438659667969px] w-[279.42742919921875px] max-w-full flex-col items-center justify-center gap-[10.6px] scale-90 mdlg:scale-100">
        <Logo variant="dark" size="lg" />
      </div>

      {/* Middle Section */}
      <div className="relative mx-auto h-[322px] w-full max-w-[424px] scale-90 mdlg:scale-100">
        <div className="absolute left-[83px] top-[182px] flex min-h-[72px] w-[308px] max-w-[90%] flex-col items-center justify-center gap-4 rounded-[8px] bg-white/15 p-[8px] text-center">
          <p className="font-logo text-[18px] font-[400] leading-[28px] tracking-[0] text-white">
            {t("auth.promoTitle")}
            <br />
            {t("auth.promoSubtitle")}
          </p>
        </div>
        <img
          src="/images/Group.png"
          alt="Decorative elements"
          className={`absolute top-[23px] h-[162.6162071224119px] w-[133.98629446401122px] ${
            isRTL ? 'right-[-17px]' : 'left-[-17px]'
          }`}
          style={{ transform: isRTL ? 'rotate(1.95deg) scaleX(-1)' : 'rotate(1.95deg)' }}
        />
      </div>

      {/* Bottom Section */}
      <div className="mx-auto flex h-[149.37997436523438px] w-full max-w-[424px] items-center gap-2 scale-90 mdlg:scale-100">
        <img
          src="/images/shap2.png"
          alt="Ghost illustration"
          className="h-[149.37997436523438px] w-[160.5654296875px] object-contain"
          style={isRTL ? { transform: 'scaleX(-1)' } : undefined}
        />
        <div className="flex h-[48px] w-[255.4345703125px] flex-col gap-1 tracking-[0.4em]">
          <p className="font-primary text-[16px] font-[700] leading-[24px] tracking-[0] text-white">
            Iztech Vally
          </p>
          <p className="h-[20px] w-[255.4345703125px] font-primary text-[14px] font-[400] leading-[20px] tracking-[0] text-white opacity-80">
            Iztech Vally
          </p>
        </div>
      </div>
    </aside>
  );
}

export default PromoPanel;
