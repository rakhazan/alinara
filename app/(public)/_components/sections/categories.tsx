import Image from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "absolute left-4 top-4 rounded px-3 py-2 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-surface text-on-surface",
        accent: "bg-secondary-container text-on-secondary-fixed-variant",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type Category = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  href?: string;
  badge?: string;
  badgeTone?: VariantProps<typeof badgeVariants>["tone"];
};

type CategoriesProps = {
  categories: Category[];
  className?: string;
};

export default function Categories({ categories, className }: CategoriesProps) {
  if (!categories.length) return null;

  return (
    <section aria-labelledby="categories-heading" className={cn("bg-surface px-4 py-14 text-on-surface lg:px-8 lg:py-20", className)}>
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-8 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-secondary lg:text-sm">Kategori Pilihan</p>
            <h2 id="categories-heading" className="font-display text-3xl leading-tight text-primary lg:text-5xl">Pilihan Mahakarya Sutra</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-on-surface-variant lg:text-lg">Dari drape harian yang ringan hingga satin berkilau untuk perayaan suci istimewa.</p>
        </div>

        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:pb-0">
          {categories.map((category) => {
            const content = (
              <>
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-high">
                  <Image src={category.image} alt={category.imageAlt ?? ""} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 78vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" />
                  {category.badge && <span className={badgeVariants({ tone: category.badgeTone })}>{category.badge}</span>}
                </div>
                <div className="flex flex-1 items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-lg text-primary xl:text-xl">{category.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{category.description}</p>
                  </div>
                  {category.href && <span aria-hidden="true" className="text-xl text-outline transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>}
                </div>
              </>
            );
            const cardClass = "group flex h-full flex-col overflow-hidden rounded-2xl bg-surface-container-low";

            return (
              <li key={category.id} className="w-[78%] shrink-0 snap-start sm:w-[40%] lg:w-auto lg:min-w-0">
                {category.href ? (
                  <Link href={category.href} className={cn(cardClass, "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary")}>{content}</Link>
                ) : (
                  <div className={cardClass}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
