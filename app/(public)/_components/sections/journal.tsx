import Image from "next/image";

export type JournalArticle = {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  steps: { title: string; description: string }[];
};

export default function Journal({ article }: { article: JournalArticle }) {
  return (
    <section
      aria-labelledby="journal-heading"
      className="bg-surface px-4 py-10 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1920px] overflow-hidden rounded-3xl bg-primary-container p-6 text-on-primary shadow-sm lg:p-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-container">
              Alinara Styling Journal
            </p>
            <h2
              id="journal-heading"
              className="max-w-xl font-display text-3xl leading-snug lg:text-5xl"
            >
              {article.title}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-on-primary/80 lg:text-base">
              {article.description}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-16">
            {article.images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative aspect-square overflow-hidden rounded-xl bg-surface-tint lg:aspect-3/4 lg:even:translate-y-1/2 lg:scale-200 lg:-rotate-12"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 28vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        {article.steps.length > 0 && (
          <details className="group mt-8 lg:mt-12">
            <summary className="w-fit cursor-pointer rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-on-secondary hover:bg-on-secondary-fixed-variant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary">
              Lihat Panduan Penuh
            </summary>
            <ol className="mt-8 grid gap-6 border-t border-on-primary/20 pt-8 md:grid-cols-3">
              {article.steps.map((step, index) => (
                <li key={step.title}>
                  <p className="mb-3 text-sm text-secondary-container">
                    0{index + 1}
                  </p>
                  <h3 className="font-display text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-primary/80">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </details>
        )}
      </div>
    </section>
  );
}
