import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: FadeInProps) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const ScaleIn = ({ children, delay = 0, className = "" }: ScaleInProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.5,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = "" }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer = ({ children, staggerDelay = 0.1, className = "" }: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.4, 0.25, 1],
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface FloatingProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const Floating = ({ children, delay = 0, className = "" }: FloatingProps) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export const HoverScale = ({ children, scale = 1.05, className = "" }: HoverScaleProps) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export const SlideIn = ({ children, direction = "left", delay = 0, className = "" }: SlideInProps) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.7,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);
