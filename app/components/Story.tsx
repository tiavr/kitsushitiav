"use client";

import { useState, useRef, useEffect, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import SectionCloud from "./AnimatedCloud";

interface StoryData {
  title: string;
  content: string;
  backgroundImage: string;
  modalImage?: string;
}

const stories: StoryData[] = [
  {
    title: "COMMENCEMENT",
    content: "Contenu détaillé de l'histoire de l'abandon...",
    backgroundImage: "/img/story/card-1.png",
    modalImage: "/img/story/eclosion_modal.png",
  },
  {
    title: "L'Évolution",
    content: "Contenu de l'histoire 2...",
    backgroundImage: "/img/story/card-2.png",
    modalImage: "/img/story/evolution_modal.png",
  },
  {
    title: "Nouveau départ",
    content: "Contenu de l'histoire 3...",
    backgroundImage: "/img/story/card-3.png",
    modalImage: "/img/story/nouvelere_modal.png",
  },
];

interface StoryCardProps extends StoryData {
  index: number;
}

const Modal = ({
  title,
  modalImage,
  onClose,
}: {
  title: string;
  modalImage?: string;
  onClose: () => void;
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    // Gestion des touches clavier
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { 
      scale: prefersReducedMotion ? 1 : 0.8, 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 300,
        damping: 30,
        duration: prefersReducedMotion ? 0.1 : 0.4
      }
    },
    exit: { 
      scale: prefersReducedMotion ? 1 : 0.8, 
      opacity: 0,
      y: prefersReducedMotion ? 0 : -50,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.3
      }
    }
  };

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        variants={contentVariants}
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 z-10 
                     text-2xl transition-all duration-200 p-3 rounded-full 
                     hover:bg-white/10 hover:scale-110 backdrop-blur-sm
                     border border-white/20 hover:border-red-400/50"
          aria-label="Fermer (Échap)"
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
        >
          <motion.span
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✕
          </motion.span>
        </motion.button>
        {modalImage && (
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <Image
              src={modalImage}
              alt={title}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              width={1200}
              height={800}
              priority
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const StoryCard = memo(
  ({ title, backgroundImage, modalImage, index }: StoryCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isCardInView = useInView(cardRef, {
      threshold: 0.5,
      once: false,
      rootMargin: "0px",
    });

    const cardVariants = {
      hidden: { opacity: 0, y: 20, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.15,
          delay: 0.1 + index * 0.05,
          ease: "easeOut",
        },
      },
    };

    return (
      <>
        <motion.div
          ref={cardRef}
          variants={cardVariants}
          initial="hidden"
          animate={isCardInView ? "visible" : "hidden"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-64 sm:h-72 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group 
                   shadow-lg transition-shadow hover:shadow-xl"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 
                      group-hover:from-black/80 group-hover:to-black/30 transition-colors"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-left">{title}</h3>
            <p
              className="text-sand-200 mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 text-xs sm:text-sm"
            >
              Cliquez pour en savoir plus
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <Modal
              title={title}
              modalImage={modalImage}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }
);

StoryCard.displayName = "StoryCard";

// Hook pour optimiser les animations sur appareils faibles performances
const useOptimizedAnimations = () => {
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  
  useEffect(() => {
    const isLowEnd = 
      navigator.hardwareConcurrency <= 4 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    setIsLowPerfDevice(isLowEnd);
  }, []);
  
  return isLowPerfDevice;
};

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isLowPerfDevice = useOptimizedAnimations();
  
  // Animation basée sur le scroll
  const { scrollY } = useScroll();
  const buttonScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const buttonOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: prefersReducedMotion || isLowPerfDevice ? 1 : 1.15,
      rotate: prefersReducedMotion || isLowPerfDevice ? 0 : 8,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 },
  };

  // Animation améliorée de l'icône avec effet de pulsation et rotation
  const iconVariants = {
    animate: prefersReducedMotion || isLowPerfDevice ? {} : {
      scale: [1, 1.3, 1],
      rotate: [0, 8, -8, 0],
      filter: [
        "drop-shadow(0 0 0px rgba(220, 38, 38, 0.5))",
        "drop-shadow(0 0 25px rgba(220, 38, 38, 0.9))",
        "drop-shadow(0 0 0px rgba(220, 38, 38, 0.5))"
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      },
    },
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        style={{
          scale: prefersReducedMotion || isLowPerfDevice ? 1 : buttonScale,
          opacity: prefersReducedMotion || isLowPerfDevice ? 1 : buttonOpacity
        }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-6 left-6 z-10 bg-rougePerso p-5 rounded-full 
                 backdrop-blur-sm hover:bg-white hover:shadow-2xl 
                 transition-all duration-300 group overflow-hidden
                 border-3 border-transparent hover:border-rougePerso/20
                 w-22 h-22 flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
        aria-label="Ouvrir les informations sur l'histoire"
      >
        {/* Effet de brillance au hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        
        <motion.div 
          variants={iconVariants} 
          animate={prefersReducedMotion || isLowPerfDevice ? "" : "animate"}
          className="relative z-10"
        >
          <Image
            src="/img/story/icon-story.png"
            alt="Informations"
            width={44}
            height={44}
            className="group-hover:invert transition-all duration-300"
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            title="Rapport #122"
            modalImage="/img/story/info-story.png"
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Story = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.2,
    once: true,
    rootMargin: "-50px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        delay: 0,
      },
    },
  };

  const separatorVariants = {
    hidden: { opacity: 0, width: "0%", scale: 0.95 },
    visible: {
      opacity: 1,
      width: "100%",
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  return (
    <Section
      ref={sectionRef}
      className="py-10 sm:py-16 md:py-20 relative bg-fondgris"
      id="histoire"
    >
      {/* Nuages qui "bugguent" dans cette section */}
      <SectionCloud cloudCount={2} />
      
      {/* Aucune transition visible entre les sections */}
      <InfoButton />

      <motion.div
        className="container mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.div variants={titleVariants} className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-rougePerso font-bold">Histoire</h2>
        </motion.div>

        <motion.div
          variants={separatorVariants}
          className="flex items-center justify-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="h-px bg-sand-600 w-full max-w-[150px] sm:max-w-[200px]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mx-2 sm:mx-4"
          >
            <Image
              src="/img/story/symbole.png"
              alt="Séparateur"
              width={32}
              height={32}
              className="opacity-80 fill-white w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              style={{
                  filter: 'brightness(0) saturate(100%) invert(11%) sepia(89%) saturate(6391%) hue-rotate(22deg) brightness(85%) contrast(130%)'
              }}
              

            />
          </motion.div>
          <div className="h-px bg-sand-600 w-full max-w-[150px] sm:max-w-[200px]" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {stories.map((story, index) => (
            <StoryCard key={story.title} {...story} index={index} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Story;
