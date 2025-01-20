import { useEffect, useState, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useInView = (
  ref: RefObject<HTMLElement | null>,
  options: UseInViewOptions = {}
) => {
  const [isInView, setIsInView] = useState(false);
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, rootMargin, once]);

  return isInView;
}; 