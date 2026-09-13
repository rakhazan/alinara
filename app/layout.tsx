import type { Metadata } from "next";
import { Montserrat, Kalnia } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const kalnia = Kalnia({
  variable: "--font-kalnia",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alinara Butique",
  description:
    "Alinara Butique is a fashion brand that offers a wide range of stylish and trendy clothing for men and women. Our mission is to provide high-quality fashion at affordable prices, while also promoting sustainability and ethical practices in the fashion industry.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${kalnia.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
