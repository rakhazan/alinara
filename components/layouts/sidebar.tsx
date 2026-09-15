"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { MenuSquareIcon, XIcon } from "@hugeicons/core-free-icons";
import { HIcon } from "@/components/ui/icon";
import Button from "@/components/ui/button";
import styles from "./sidebar.module.css";

export type NavigationItem = {
  title: string;
  detail?: string;
} & (
  | { href: string; children?: never }
  | { href?: string; children: [NavigationItem, ...NavigationItem[]] }
);

const navigation: NavigationItem[] = [
  { title: "Beranda", detail: "Awal cerita", href: "/" },
  {
    title: "Kategori Pilihan",
    detail: "Temukan gaya Anda",
    href: "/#categories-heading",
    children: [
      { title: "Semua Kategori", href: "/#categories-heading" },
      { title: "Koleksi Signature", href: "/#featured-heading" },
    ],
  },
  {
    title: "Koleksi Signature",
    detail: "Pilihan dengan cerita",
    href: "/#featured-heading",
  },
  {
    title: "Karya Terfavorit",
    detail: "Dicintai, setiap hari",
    href: "/#popular-heading",
  },
  {
    title: "Styling Journal",
    detail: "Catatan inspirasi",
    href: "/#journal-heading",
  },
  {
    title: "vhjvjjh",
    detail: "Cerita bersama Alinara",
    href: "/#community-fyytfyt",
  },
  {
    title: "vjhvj",
    detail: "Cerita bersama Alinara",
    href: "/#community-yfyyv",
  },
  {
    title: "fxtuc",
    detail: "Cerita bersama Alinara",
    href: "/#community-vuyguyg",
  },
];

function SidebarNavigationItem({ item, index, onNavigate, nested = false }: {
  item: NavigationItem;
  index: number;
  onNavigate: () => void;
  nested?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const submenuId = useId();
  const hasChildren = Boolean(item.children?.length);
  const rowClass = "group flex w-full items-center gap-4 border-b border-outline-variant/60 py-4 text-left focus-visible:outline-2 focus-visible:outline-secondary lg:py-5";
  const label = <>
    {!nested && <span className="self-start pt-1 text-sm text-secondary">{String(index + 1).padStart(2, "0")}</span>}
    <span className="min-w-0 flex-1">
      <span className={nested ? "block text-sm text-primary" : "block font-display text-xl text-primary lg:text-2xl"}>{item.title}</span>
      {item.detail && <span className="mt-1 block text-xs text-on-surface-variant">{item.detail}</span>}
    </span>
    <span aria-hidden="true" className="text-secondary">{hasChildren ? (expanded ? "−" : "+") : "↗"}</span>
  </>;

  return (
    <li className={nested ? undefined : styles.item} style={{ "--item-index": index } as CSSProperties}>
      {hasChildren ? (
        <button type="button" className={rowClass} aria-expanded={expanded} aria-controls={submenuId} onClick={() => setExpanded(!expanded)}>{label}</button>
      ) : item.href ? (
        <Link href={item.href} onClick={onNavigate} className={rowClass}>{label}</Link>
      ) : null}
      {hasChildren && (
        <div id={submenuId} className={styles.submenu} data-expanded={expanded} inert={!expanded} aria-hidden={!expanded}>
          <div className={styles.submenuInner}>
            <ul className="ml-4 border-l border-outline-variant pl-4">
              {item.href && !item.children?.some((child) => child.href === item.href) && <li><Link href={item.href} onClick={onNavigate} className={rowClass}>Lihat semua {item.title} <span aria-hidden="true">↗</span></Link></li>}
              {item.children?.map((child, childIndex) => <SidebarNavigationItem key={`${child.title}-${childIndex}`} item={child} index={childIndex} onNavigate={onNavigate} nested />)}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

export default function Sidebar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const scrollLocked = useRef(false);
  useEffect(
    () => () => {
      if (scrollLocked.current)
        document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");

  function open() {
    if (!dialogRef.current || dialogRef.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scrollLocked.current = true;
    setPhase("open");
    dialogRef.current.showModal();
  }

  function close() {
    if (phase === "open") setPhase("closing");
  }

  function finishClose() {
    dialogRef.current?.close();
    document.body.style.overflow = previousOverflow.current;
    scrollLocked.current = false;
    setPhase("closed");
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        onClick={open}
        aria-label="Buka menu navigasi"
        aria-haspopup="dialog"
        aria-expanded={phase !== "closed"}
        aria-controls="navigation-sidebar"
        className="-ml-2 rounded-full"
      >
        <HIcon icon={MenuSquareIcon} className="size-5 lg:size-6" />
      </Button>
      <dialog
        ref={dialogRef}
        id="navigation-sidebar"
        aria-labelledby="sidebar-title"
        className={styles.dialog}
        data-phase={phase}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div
          className={styles.panel}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && phase === "closing")
              finishClose();
          }}
        >
          <aside aria-hidden="true" className={styles.spine}>
            <span>ALINARA — THE ART OF EVERYDAY</span>
            <span>EST. WITH LOVE</span>
          </aside>
          <div className={styles.content}>
            <div className="mb-8 flex shrink-0 items-center justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-secondary">
                  A little world of Alinara
                </p>
                <h2
                  id="sidebar-title"
                  className="mt-2 font-display text-2xl tracking-wider text-primary"
                >
                  Jelajahi Alinara
                </h2>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={close}
                aria-label="Tutup menu navigasi"
                className="shrink-0 rounded-full"
              >
                <HIcon
                  icon={XIcon}
                  aria-hidden="true"
                  className="text-2xl font-normal"
                />
              </Button>
            </div>
            <nav aria-label="Navigasi utama" className={styles.navigation}>
              <ul>
                {navigation.map((item, index) => (
                  <SidebarNavigationItem key={`${item.title}-${index}`} item={item} index={index} onNavigate={close} />
                ))}
              </ul>
            </nav>
            <div className="mt-8 shrink-0 rounded-xl bg-surface-container p-5">
              <p className="font-display text-lg text-primary">
                Kemewahan yang terasa dekat.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
                Tekstur lembut, warna hangat, dan ruang untuk menjadi diri
                sendiri.
              </p>
            </div>
            <div className="mt-6 flex shrink-0 justify-between text-[10px] uppercase tracking-[0.2em] text-secondary">
              <span>Curated with care</span>
              <span>Indonesia</span>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
