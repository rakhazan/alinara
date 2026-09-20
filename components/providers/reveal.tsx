"use client";
import { useEffect, useRef, type ReactNode } from "react";
export default function Reveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !('IntersectionObserver' in window)) return;
    const nodes = root.current.querySelectorAll<HTMLElement>("main > section, main > div > section");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.remove("reveal-pending"); observer.unobserve(entry.target); } }), { threshold: 0.05 });
    nodes.forEach((node) => { if (node.getBoundingClientRect().top > window.innerHeight) { node.classList.add("reveal-pending", "reveal-section"); observer.observe(node); } });
    return () => { observer.disconnect(); nodes.forEach((node) => node.classList.remove("reveal-pending")); };
  }, [children]);
  return <div ref={root} className="contents">{children}</div>;
}
