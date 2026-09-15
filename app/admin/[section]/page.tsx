import { notFound } from "next/navigation";
import { sections } from "@/lib/admin/data";
import Manager from "@/components/admin/manager";
export function generateStaticParams() { return Object.keys(sections).map((section) => ({ section })); }
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!Object.hasOwn(sections, section)) notFound(); return <Manager key={section} section={section} />; }
