"use client";

import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/** Scroll enhancement: content stays visible until it actually enters the viewport. */
export default function Reveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!root.current || reducedMotion) return;
    const scope = root.current;
    const sections = Array.from(scope.querySelectorAll<HTMLElement>(
      "main > section, main > div > section",
    )).filter((node) => !node.querySelector("[data-scroll-reveal]") && node.getBoundingClientRect().top >= window.innerHeight);
    const targets = [...sections, ...scope.querySelectorAll<HTMLElement>("[data-scroll-reveal]")];
    const animations = new Map<Element, ReturnType<typeof animate>>();
    const originals = new Map(targets.map((node) => [node, {
      opacity: node.style.opacity, transform: node.style.transform,
    }]));
    const restore = (node: HTMLElement) => {
      const original = originals.get(node);
      if (!original) return;
      node.style.opacity = original.opacity;
      node.style.transform = original.transform;
    };
    const stop = inView(targets, (element) => {
      const node = element as HTMLElement;
      // Never move focused controls, even when focus scrolls them into view.
      if (node.contains(document.activeElement)) return;
      const lift = node.dataset.scrollReveal === "rise";
      const delay = Math.min(Math.max(Number(node.dataset.scrollDelay) || 0, 0), 0.18);
      const animation = animate(node, {
        opacity: [0.45, 1], ...(lift ? { y: [20, 0] } : {}),
      }, { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] });
      animations.set(node, animation);
      animation.then(() => {
        if (animations.get(node) !== animation) return;
        animation.cancel();
        restore(node);
        animations.delete(node);
      });
    }, { amount: 0.1 });
    const onFocus = (event: FocusEvent) => {
      for (const [node, animation] of animations) {
        if (event.target instanceof Node && node.contains(event.target)) {
          animations.delete(node);
          animation.cancel();
          restore(node as HTMLElement);
        }
      }
    };
    scope.addEventListener("focusin", onFocus);
    return () => {
      stop();
      scope.removeEventListener("focusin", onFocus);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      targets.forEach(restore);
    };
  }, [pathname, children, reducedMotion]);

  return <div ref={root} className="contents">{children}</div>;
}
