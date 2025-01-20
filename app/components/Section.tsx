import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = '', id, delay = 0 }, ref) => {
    const isInView = useInView(ref as React.RefObject<HTMLElement>, {
      threshold: 0.1,
      once: true,
    });

    const variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.1,
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        id={id}
        className={`scroll-mt-20 ${className}`}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
      >
        {children}
      </motion.section>
    );
  }
);

Section.displayName = 'Section'; 