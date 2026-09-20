import type { Metadata } from "next";
import { checkoutConfig } from "@/lib/server/checkout";
import CheckoutForm from "./checkout-form";
export const metadata: Metadata = { title: "Pemesanan | Alinara", robots: { index: false, follow: false } };
export default function Page() { return <CheckoutForm {...checkoutConfig()} />; }
