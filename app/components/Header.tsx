import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '#' },
    { name: 'Histoire', href: '#histoire' },
    { name: 'Caractéristiques', href: '#caracteristiques' },
    { name: 'Objectifs', href: '#objectifs' },
    { name: 'Qui suis-je', href: '#quisuije' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-1 sm:gap-2 
            ${isScrolled || isMenuOpen
              ? 'bg-sand-100/90 dark:bg-rougePerso backdrop-blur-sm'
              : 'bg-sand-200/80 dark:bg-rougePerso backdrop-blur-sm'
            } 
            hover:shadow-xl transition-all duration-300 group`}
          aria-label="Menu principal"
        >
          <span className="text-sand-600 dark:text-sand-100 text-xs sm:text-sm font-medium pr-0.5 sm:pr-1 opacity-80 group-hover:opacity-100">
            Menu
          </span>
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="w-4 h-4 sm:w-5 sm:h-5 relative"
          >
            <motion.span
              className="absolute w-4 sm:w-5 h-0.5 bg-sand-600 dark:bg-sand-200 transform-gpu"
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute w-4 sm:w-5 h-0.5 bg-sand-600 dark:bg-sand-200 top-1.5 sm:top-2 transform-gpu"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute w-4 sm:w-5 h-0.5 bg-sand-600 dark:bg-sand-200 top-3 sm:top-4 transform-gpu"
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
          >
            <nav className="flex flex-col items-center space-y-6 sm:space-y-8 w-full max-w-md">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  custom={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-rougePerso hover:text-rougePerso/80 
                             transition-colors duration-200 relative group block"
                  >
                    {item.name}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-rougePerso/70 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 