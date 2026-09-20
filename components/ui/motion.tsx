"use client";

import { AnimatePresence, motion, useIsPresent, useReducedMotion, type HTMLMotionProps } from "motion/react";

/** A small lift for interactive cards. Motion hover ignores emulated touch hover. */
export function MotionSurface({ children, ...props }: HTMLMotionProps<"div">) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Key the component by the value to replay a brief, decorative feedback pulse. */
export function MotionFeedback({ children, ...props }: HTMLMotionProps<"span">) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.span
      initial={{ scale: 1 }}
      animate={{ scale: reducedMotion ? 1 : [1, 1.18, 1] }}
      transition={{ duration: reducedMotion ? 0 : 0.28 }}
      {...props}
    >
      {children}
    </motion.span>
  );
}

/** Content stays visible in server HTML; replay when a keyed view changes. */
export function MotionEntrance({ children, ...props }: HTMLMotionProps<"div">) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0.65, 1], y: [8, 0] }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Exiting content remains visual only, never keyboard or screen-reader interactive. */
function PresencePanel({ children, ...props }: HTMLMotionProps<"div">) {
  const reducedMotion = useReducedMotion();
  const present = useIsPresent();
  return <motion.div
    initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
    transition={{ duration: reducedMotion ? 0 : 0.2 }}
    {...props}
    inert={!present}
    aria-hidden={!present || undefined}
    data-presence={present ? "present" : "exiting"}
  >{children}</motion.div>;
}

/** Keep this wrapper mounted and toggle `show`, so exit can finish. */
export function MotionPresence({ show, children, ...props }: HTMLMotionProps<"div"> & { show: boolean }) {
  return <AnimatePresence initial={false}>
    {show && <PresencePanel key="content" {...props}>{children}</PresencePanel>}
  </AnimatePresence>;
}

/** Wait for the outgoing view before mounting the next keyed view. */
export function MotionSwap({ activeKey, children, ...props }: HTMLMotionProps<"div"> & { activeKey: string | number }) {
  return <AnimatePresence initial={false} mode="wait">
    <PresencePanel key={activeKey} {...props}>{children}</PresencePanel>
  </AnimatePresence>;
}

/** Use inside AnimatePresence with stable keys; padding belongs to the inner content. */
export function MotionListItem({ children, ...props }: HTMLMotionProps<"li">) {
  const reducedMotion = useReducedMotion();
  const present = useIsPresent();
  return <motion.li
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: reducedMotion ? 0 : 0.24 }}
    {...props}
    style={{ overflow: "clip", ...props.style }}
    inert={!present}
    aria-hidden={!present || undefined}
    data-presence={present ? "present" : "exiting"}
  >{children}</motion.li>;
}
