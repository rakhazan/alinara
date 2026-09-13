"use client";

import { useCallback, useId, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/ui/button";
import { HIcon } from "@/components/ui/icon";
import { ChevronLeftIcon, ChevronRightIcon } from "@hugeicons/core-free-icons";

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

type TestimonialsProps = { testimonials: Testimonial[]; isDemo?: boolean };

export default function Testimonials({
  testimonials,
  isDemo = false,
}: TestimonialsProps) {
  const carouselId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onChange).on("reInit", onChange);
      return () => {
        emblaApi.off("select", onChange).off("reInit", onChange);
      };
    },
    [emblaApi],
  );
  const getSnapshot = useCallback(
    () =>
      (emblaApi?.canScrollPrev() ? 1 : 0) | (emblaApi?.canScrollNext() ? 2 : 0),
    [emblaApi],
  );
  const navigation = useSyncExternalStore(subscribe, getSnapshot, () => 0);

  if (!testimonials.length) return null;
  const average =
    testimonials.reduce((sum, item) => sum + item.rating, 0) /
    testimonials.length;
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-surface px-4 py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Suara Komunitas
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-3xl text-primary lg:text-4xl"
            >
              Kata Mereka tentang Alinara
            </h2>
          </div>
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto lg:shrink-0 lg:flex-col-reverse lg:items-end">
            <p className="text-sm font-semibold text-secondary">
              <span aria-hidden="true">★ </span>
              {average.toFixed(1)} / 5{" "}
              <span className="font-normal text-on-surface-variant">
                dari {testimonials.length} ulasan{isDemo ? " contoh" : ""}
              </span>
            </p>
            <div
              className="flex shrink-0 gap-2"
              role="group"
              aria-label="Navigasi testimonial"
            >
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                aria-label="Testimonial sebelumnya"
                aria-controls={carouselId}
                disabled={!(navigation & 1)}
                onClick={() => emblaApi?.scrollPrev()}
              >
                <span aria-hidden="true">
                  <HIcon icon={ChevronLeftIcon} size="sm" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full"
                aria-label="Testimonial berikutnya"
                aria-controls={carouselId}
                disabled={!(navigation & 2)}
                onClick={() => emblaApi?.scrollNext()}
              >
                <span aria-hidden="true">
                  <HIcon icon={ChevronRightIcon} size="sm" />
                </span>
              </Button>
            </div>
          </div>
        </div>
        {isDemo && (
          <p className="mb-4 text-xs text-on-surface-variant">
            Contoh tampilan testimonial — belum merupakan ulasan pelanggan.
          </p>
        )}
        <div
          ref={emblaRef}
          id={carouselId}
          className="overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Ulasan pelanggan"
        >
          <ul className="flex touch-pan-y touch-pinch-zoom gap-4 lg:gap-6">
            {testimonials.map((item) => (
              <li
                key={item.id}
                className="flex min-w-0 flex-[0_0_85%] flex-col rounded-2xl bg-surface-container-low p-6 sm:flex-[0_0_60%] lg:flex-[0_0_calc((100%-3rem)/3)] lg:p-8"
              >
                <p
                  aria-label={`${item.rating} dari 5 bintang`}
                  className="mb-5 tracking-widest text-secondary"
                >
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </p>
                <figure className="flex flex-1 flex-col">
                  <blockquote className="mb-8 flex-1 font-display text-lg leading-relaxed text-primary">
                    <p>“{item.quote}”</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-sm font-semibold text-on-secondary-fixed-variant"
                    >
                      {item.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-on-surface-variant">
                        {item.location}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
