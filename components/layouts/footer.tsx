import {
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HIcon } from "../ui/icon";
import Logo from "../ui/logo";

const Footer = () => {
  return (
    <footer className="px-8 py-12 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
        <div className="space-y-4">
          <Logo size="lg" />
          <p className="text-sm text-pretty">
            Menghadirkan harmoni kesantunan dan kemewahan material premium.
            Dirancang dengan presisi drape sempurna bagi muslimah modern yang
            merayakan keanggunan sejati.
          </p>
        </div>

        <div className="space-y-4">
          <h6 className="font-semibold text-foreground tracking-wider text-lg">
            Pusat Bantuan
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="">
                Panduan Ukuran & Bahan
              </a>
            </li>
            <li>
              <a href="#" className="">
                Cara Pemesanan
              </a>
            </li>
            <li>
              <a href="#" className="">
                Status Pengiriman
              </a>
            </li>
            <li>
              <a href="#" className="">
                Kebijakan Pengembalian
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h6 className="font-semibold text-foreground tracking-wider text-lg">
            Mari Terhubung
          </h6>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-6">
              <a href="#" className="">
                <HIcon icon={WhatsappIcon} size="lg" />
              </a>
              <a href="#" className="">
                <HIcon icon={InstagramIcon} size="lg" />
              </a>
              <a href="#" className="">
                <HIcon icon={TiktokIcon} size="lg" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center mt-8">
        <p className="text-sm text-foreground/70">
          &copy; {new Date().getFullYear()} Alinara Butique. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
