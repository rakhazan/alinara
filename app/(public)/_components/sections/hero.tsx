"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

export type HeroSlide = {
  title: string;
  description: string;
  imageSm: string;
  imageLg: string;
  cta?: string;
  href?: string;
};

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const reducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (!slides.length) return null;

  return (
    <section
      aria-label="Koleksi Alinara"
      aria-roledescription="carousel"
      className="relative bg-stone-800 text-white m-4 lg:m-0 max-lg:rounded-3xl max-lg:overflow-clip"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => {
            const common = {
              alt: "",
              sizes: "100vw",
              loading: index === 0 ? ("eager" as const) : ("lazy" as const),
              fetchPriority:
                index === 0 ? ("high" as const) : ("auto" as const),
            };
            const { props: mobile } = getImageProps({
              ...common,
              src: slide.imageSm,
              width: 750,
              height: 1000,
            });
            const { props: desktop } = getImageProps({
              ...common,
              src: slide.imageLg,
              width: 1920,
              height: 900,
            });
            const Heading = index === 0 ? "h1" : "h2";

            return (
              <div
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} dari ${slides.length}: ${slide.title}`}
                aria-hidden={index !== selectedIndex}
                inert={index !== selectedIndex}
                className="relative min-w-0 flex-[0_0_100%]"
              >
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={desktop.srcSet ?? desktop.src}
                    sizes={desktop.sizes}
                  />
                  {/* getImageProps provides Next.js optimized image props. */}
                  <img
                    {...mobile}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-linear-to-r from-black/65 to-black/20" />
                <motion.div
                  initial={false}
                  animate={{ opacity: index === selectedIndex ? 1 : 0, y: index === selectedIndex || reducedMotion ? 0 : 18 }}
                  transition={{ duration: reducedMotion ? 0 : 0.55 }}
                  className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-6 py-24 lg:min-h-[640px] lg:px-16">
                  <Heading className="max-w-3xl font-display text-4xl leading-tight lg:text-6xl">
                    {slide.title}
                  </Heading>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 lg:text-lg">
                    {slide.description}
                  </p>
                  {slide.cta && slide.href && (
                    <Link
                      href={slide.href}
                      className="mt-8 w-fit bg-white px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      {slide.cta}
                    </Link>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-0 right-2 flex items-center justify-end gap-2">
          <div className="flex gap-0.5">
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Tampilkan slide ${index + 1}: ${slide.title}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                onClick={() => emblaApi?.scrollTo(index, !!reducedMotion)}
                className="flex h-11 w-4 items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${index === selectedIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {selectedIndex + 1} dari {slides.length}
      </p>
    </section>
  );
}
