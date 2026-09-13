import {
  HeartIcon,
  HelpCircleIcon,
  PanelLeftIcon,
  ShoppingBasket01Icon,
} from "@hugeicons/core-free-icons";
import Logo from "../ui/logo";
import { HIcon } from "../ui/icon";
import { isMobile } from "@/lib/utils";

const RunningText = () => {
  const content = (
    <>
      <span className="shrink-0 whitespace-nowrap font-semibold">
        Kurasi Kemewahan Bersahaja
      </span>

      <span className="shrink-0 whitespace-nowrap font-bold tracking-widest">
        Bebas Ongkir Seluruh Indonesia Min. Rp 300.000 | Garansi Retur 7 Hari
      </span>
    </>
  );

  return (
    <>
      {/* Mobile marquee */}
      <div className="relative flex-1 overflow-hidden lg:hidden">
        <div className="flex w-max animate-marquee">
          <div className="flex shrink-0 items-center gap-8 pr-8">{content}</div>

          <div
            aria-hidden="true"
            className="flex shrink-0 items-center gap-8 pr-8"
          >
            {content}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:contents">{content}</div>
    </>
  );
};

const Navbar = () => {
  return (
    <header className="">
      <div className="bg-foreground text-background flex items-center justify-between gap-4 px-4 lg:px-8 py-2 uppercase text-xs overflow-hidden">
        <RunningText />
        <div className="hidden lg:flex items-center gap-4 font-semibold">
          <span className="flex gap-1">
            <HIcon icon={HelpCircleIcon} size="sm" stroke={2} /> Bantuan
          </span>
          <span className="">ID</span>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-6 bg-background text-foreground relative">
        <div className="flex items-center justify-between gap-8">
          <HIcon
            icon={PanelLeftIcon}
            size={isMobile() ? "sm" : "md"}
            color="currentColor"
          />
          <Logo className="absolute -translate-x-1/2 left-1/2" />
          <div className="flex items-center gap-6 lg:gap-8">
            <HIcon
              icon={HeartIcon}
              size={isMobile() ? "sm" : "md"}
              color="currentColor"
            />
            <HIcon
              icon={ShoppingBasket01Icon}
              size={isMobile() ? "sm" : "md"}
              color="currentColor"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
