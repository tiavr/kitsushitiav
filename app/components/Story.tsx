"use client";

import { useState, useRef, useEffect, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";

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
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-sand-200 z-10 
                     text-3xl transition-colors p-2 rounded-full hover:bg-black/20"
          aria-label="Fermer"
        >
          ✕
        </button>
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
          className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group 
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
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="text-2xl font-bold text-white text-left">{title}</h3>
            <p
              className="text-sand-200 mt-2 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 text-sm"
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

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const iconVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [1.5, 0.5, 1.5],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-6 left-6 z-10 bg-[#2A1810] p-2 rounded-full 
                 backdrop-blur-sm hover:bg-white transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div variants={iconVariants} animate="animate">
          <Image
            src="/img/story/icon-story.png"
            alt="Informations"
            width={100}
            height={100}
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
      className="py-20 relative bg-fondgris"
      id="histoire"
    >
      {/* Aucune transition visible entre les sections */}
      <InfoButton />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        {/* Fond gris similaire au Hero */}
        <div className="absolute inset-0 pointer-events-none bg-hero -z-10"></div>
        <motion.div variants={titleVariants} className="text-center mb-12">
          <h2 className="text-5xl text-rougePerso font-bold">Histoire</h2>
        </motion.div>

        <motion.div
          variants={separatorVariants}
          className="flex items-center justify-center mb-16"
        >
          <div className="h-px bg-sand-600 w-full max-w-[200px]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mx-4"
          >
            <Image
              src="/img/story/symbole.png"
              alt="Séparateur"
              width={40}
              height={40}
              className="opacity-80 fill-white"
              style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(57%) contrast(118%)' }}
            />
          </motion.div>
          <div className="h-px bg-sand-600 w-full max-w-[200px]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <StoryCard key={story.title} {...story} index={index} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Story;
