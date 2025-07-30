import { ReactNode, forwardRef, useState, useEffect } from 'react';
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
    const [isMounted, setIsMounted] = useState(false);
    const isInView = useInView(ref as React.RefObject<HTMLElement>, {
      threshold: 0.1,
      once: true,
    });

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Variants pour le contenu uniquement, pas pour le fond
    const contentVariants = {
      hidden: { 
        opacity: 0, 
        y: 20 
      },
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

    // Pas d'animation pour la section elle-même (fond)
    return (
      <section
        ref={ref}
        id={id}
        className={`scroll-mt-20 ${className}`}
      >
        <motion.div
          className="w-full h-full"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={contentVariants}
        >
          {children}
        </motion.div>
      </section>
    );
  }
);

Section.displayName = 'Section';