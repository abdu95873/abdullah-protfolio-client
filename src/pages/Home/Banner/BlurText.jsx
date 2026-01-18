import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });

  return keyframes;
};

const BlurText = ({
  text = "",
  delay = 120,
  className = "",
  animateBy = "words", // words | chars
  direction = "top", // top | bottom
  threshold = 0.15,
  rootMargin = "0px",
  stepDuration = 0.6,
  onAnimationComplete,
}) => {
  const elements =
    animateBy === "words" ? text.split(" ") : text.split("");

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  /* Intersection observer */
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  /* Default animation */
  const from = useMemo(
    () => ({
      filter: "blur(12px)",
      opacity: 0,
      y: direction === "top" ? -40 : 40,
    }),
    [direction]
  );

  const to = useMemo(
    () => [
      {
        filter: "blur(4px)",
        opacity: 0.6,
        y: direction === "top" ? 6 : -6,
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
      },
    ],
    [direction]
  );

  const keyframes = buildKeyframes(from, to);
  const stepCount = to.length + 1;
  const duration = stepDuration * (stepCount - 1);
  const times = Array.from(
    { length: stepCount },
    (_, i) => i / (stepCount - 1)
  );

  /* Semantic tag (SEO safe) */
  const Tag = className.includes("text-5xl") || className.includes("text-6xl")
    ? "h1"
    : "p";

  return (
    <Tag
      ref={ref}
      className={`flex flex-wrap will-change-transform ${className}`}
    >
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={from}
          animate={inView ? keyframes : from}
          transition={{
            duration,
            times,
            delay: (index * delay) / 1000,
            ease: "easeOut",
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </Tag>
  );
};

export default BlurText;
