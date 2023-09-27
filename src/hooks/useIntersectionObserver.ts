import { useRef } from "react";

export default function useIntersectionObserver(callback: () => void) {
  const observer = useRef(
    new IntersectionObserver(
      (entries, _) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (target: HTMLDivElement | null) => {
    if (target === null) return null;

    observer.current.observe(target);
  };

  const unobserve = (target: HTMLDivElement | null) => {
    if (target === null) return null;

    observer.current.unobserve(target);
  };

  return [observe, unobserve];
}
