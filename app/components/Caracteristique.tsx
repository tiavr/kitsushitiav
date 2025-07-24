"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SectionCloud from "./AnimatedCloud";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import { createPortal } from "react-dom";

interface CharacteristicCardProps {
  title: string;
  backgroundImage: string;
  modalImage?: string;
  unoptimized?: boolean;
}

interface TraitDeCaractere {
  titre: string;
  description: string;
  gif: string;
}

/* -------------------------------------------------------------------------- */
/*                            HOOK MODAL OPTIMISÉ                             */
/* -------------------------------------------------------------------------- */

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const open = useCallback(() => {
    // Sauvegarder la position de scroll
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    
    // Bloquer le scroll avec une meilleure méthode
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    // Restaurer le scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    
    // Restaurer la position de scroll
    window.scrollTo(0, scrollPosition);
    
    setIsOpen(false);
  }, [scrollPosition]);

  // Cleanup au démontage
  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    };
  }, []);

  return { isOpen, open, close };
};

/* -------------------------------------------------------------------------- */
/*                         WRAPPER MODAL AVEC PORTAL                          */
/* -------------------------------------------------------------------------- */

const ModalWrapper = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[99999]"
      style={{ position: 'fixed' }}
    >
      {/* Backdrop avec meilleur contrôle du clic */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Contenu de la modal */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {children}
      </div>
    </motion.div>,
    document.body
  );
};

/* -------------------------------------------------------------------------- */
/*                          MODAL CARACTÈRE OPTIMISÉE                         */
/* -------------------------------------------------------------------------- */

const CaractereModal = ({ onClose }: { onClose: () => void }) => {
  const [traitHover, setTraitHover] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const traits: TraitDeCaractere[] = [
    {
      titre: "Loyal",
      description:
        "Koten vouera une loyauté sans faille au village et à son clan. Il agira toujours dans l'intérêt de ces derniers.",
      gif: "/img/caractéristiques/loyal_gif.gif",
    },
    {
      titre: "Calculateur et Manipulateur",
      description:
        "L'aspect calculateur permet à Koten de tirer avantage de certaines situations, chacune de ses décisions serviront à un but précis. Il n'hésitera pas à manipuler les gens pour son propre intérêt. Il ne fait rien sans arrière-pensées.",
      gif: "/img/caractéristiques/calculateur_gif.gif",
    },
    {
      titre: "Sociable ?",
      description:
        "Koten se montrera sociable et quelque peu extraverti. Cela lui permet de facilement tisser des liens... tout en masquant ses intentions. Il s'agit principalement d'une façade, afin de facilement gagner la confiance des autres. Sa vraie nature est plutôt calme, posée et stoique.",
      gif: "/img/caractéristiques/sociable_gif.gif",
    },
  ];

  const traitsSecondaires: TraitDeCaractere[] = [
    {
      titre: "Kleptomane",
      description:
        "Pour se venger des moqueries, Koten a pris la mauvaise habitude de voler ses camarades. Il ressent constamment le besoin de voler. A l'époque il volait par vengeance, mais en grandissant il a apprit à voler pour avoir une forme de pression, un contrôle sur les autres. Cela lui donne le sentiment d'avoir le dessus sur les gens.",
      gif: "/img/caractéristiques/kleptomane.gif",
    },
  ];

  return (
    <ModalWrapper onClose={onClose}>
      <motion.div
        ref={contentRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", damping: 25 }}
        className="relative bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-3xl 
                   w-full max-w-6xl max-h-[90vh]
                   shadow-2xl border border-white/10
                   overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background décoratif */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/img/caractéristiques/background_caractere_modal.png"
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/70 to-[#1a1a1a]/95" />
        </div>

        {/* Bouton de fermeture amélioré */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50
                     w-12 h-12 rounded-full
                     bg-white/10 backdrop-blur-sm
                     border border-white/20
                     flex items-center justify-center
                     text-white hover:text-red-400
                     hover:bg-white/20 hover:border-white/30
                     transition-all duration-300
                     group"
          aria-label="Fermer la modal"
        >
          <svg 
            className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenu scrollable */}
        <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
          <div className="p-6 md:p-8 lg:p-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Traits de Caractère
            </h2>

            {/* Grille des traits principaux */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              {traits.map((trait, index) => (
                <motion.div
                  key={trait.titre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setTraitHover(trait.titre)}
                  onMouseLeave={() => setTraitHover(null)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 
                                max-w-[180px] mx-auto md:max-w-[220px] lg:max-w-[250px]
                                shadow-xl transition-all duration-500
                                group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <Image
                      src={trait.gif}
                      alt={trait.titre}
                      width={220}
                      height={220}
                      className="w-full h-full object-cover 
                               transition-transform duration-700 
                               group-hover:scale-110"
                      unoptimized
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white text-center mb-4
                               transition-colors duration-300 
                               group-hover:text-red-400">
                    {trait.titre}
                  </h3>

                  {/* Description au survol avec meilleure animation */}
                  <AnimatePresence>
                    {traitHover === trait.titre && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 z-20
                                 bg-black/90 backdrop-blur-xl
                                 p-4 rounded-xl mt-2
                                 border border-white/20
                                 shadow-2xl"
                      >
                        <p className="text-white text-sm leading-relaxed">
                          {trait.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Trait secondaire */}
            <div className="max-w-4xl mx-auto">
              {traitsSecondaires.map((trait, index) => (
                <motion.div
                  key={trait.titre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
                  onMouseEnter={() => setTraitHover(trait.titre)}
                  onMouseLeave={() => setTraitHover(null)}
                >
                  <div className="flex flex-col items-center">
                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 
                                  max-w-[160px] mx-auto
                                  shadow-xl transition-all duration-500
                                  group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                      <Image
                        src={trait.gif}
                        alt={trait.titre}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover 
                                transition-transform duration-700 
                                group-hover:scale-110"
                        unoptimized
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-white text-center
                                transition-colors duration-300 
                                group-hover:text-red-400">
                      {trait.titre}
                    </h3>
                  </div>

                  <AnimatePresence>
                    {traitHover === trait.titre && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, type: "spring", damping: 20 }}
                        className="md:max-w-md z-20
                                  bg-black/90 backdrop-blur-xl
                                  p-4 md:p-6 rounded-xl
                                  border border-white/20
                                  shadow-2xl"
                      >
                        <p className="text-white text-sm md:text-base leading-relaxed">
                          {trait.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <p className="text-white/60 text-center mt-8 text-sm italic">
              Survolez les images pour découvrir les traits de caractère
            </p>
          </div>
        </div>
      </motion.div>
    </ModalWrapper>
  );
};

/* -------------------------------------------------------------------------- */
/*                            MODAL IMAGE OPTIMISÉE                           */
/* -------------------------------------------------------------------------- */

const ImageModal = ({ 
  title, 
  modalImage, 
  onClose 
}: { 
  title: string; 
  modalImage: string; 
  onClose: () => void 
}) => {
  return (
    <ModalWrapper onClose={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", damping: 25 }}
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-50
                     w-10 h-10 rounded-full
                     bg-white/10 backdrop-blur-sm
                     border border-white/20
                     flex items-center justify-center
                     text-white hover:text-red-400
                     hover:bg-white/20 hover:border-white/30
                     transition-all duration-300
                     group"
          aria-label="Fermer la modal"
        >
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={modalImage}
            alt={title}
            width={1200}
            height={800}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            priority
          />
        </div>
      </motion.div>
    </ModalWrapper>
  );
};

/* -------------------------------------------------------------------------- */
/*                       CARTE CARACTÉRISTIQUE OPTIMISÉE                      */
/* -------------------------------------------------------------------------- */

const CharacteristicCard = ({
  title,
  backgroundImage,
  modalImage,
  unoptimized = false,
  index,
}: CharacteristicCardProps & { index: number }) => {
  const modal = useModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, {
    threshold: 0.3,
    once: true,
  });

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: "easeOut" 
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group 
                   shadow-xl hover:shadow-2xl transition-all duration-300"
        onClick={modal.open}
      >
        <Image
          src={backgroundImage}
          alt={title}
          fill
          unoptimized={unoptimized}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                        group-hover:from-black/90 transition-all duration-300" />
        
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/80 text-sm"
          >
            Cliquez pour explorer →
          </motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {modal.isOpen && (
          title === "Caractère" ? (
            <CaractereModal onClose={modal.close} />
          ) : (
            <ImageModal title={title} modalImage={modalImage!} onClose={modal.close} />
          )
        )}
      </AnimatePresence>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                           SECTION PRINCIPALE                               */
/* -------------------------------------------------------------------------- */

const Caracteristique = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.2,
    once: true,
  });

  const characteristics = [
    {
      title: "Apparence",
      backgroundImage: "/img/caractéristiques/app_back.png",
      modalImage: "/img/caractéristiques/app_modal.png",
    },
    {
      title: "Caractère",
      backgroundImage: "/img/caractéristiques/caractere_gif.gif",
      unoptimized: true,
    },
  ];

  return (
    <Section
      ref={sectionRef}
      className="py-20 relative bg-[#C5C4C4] overflow-hidden"
      id="caracteristiques"
    >
<<<<<<< HEAD
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        {/* Fond gris similaire au Hero */}
        <div className="absolute inset-0 pointer-events-none bg-hero -z-10"></div>
=======
      <SectionCloud cloudCount={2} />
      
      <div className="container mx-auto px-6">
>>>>>>> 0c2cd38b9e1d4f42f8a9896c890df9e94093720e
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl text-rougePerso font-bold text-center mb-12"
        >
          Caractéristiques
        </motion.h2>

        {/* Séparateur animé */}
        <div className="flex items-center justify-center mb-16">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isSectionInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px w-48 bg-rougePerso origin-right"
          />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isSectionInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-4"
          >
            <Image
              src="/img/story/symbole.png"
              alt="Séparateur"
              width={40}
              height={40}
              className="opacity-80"
              style={{
                filter: 'brightness(0) saturate(100%) invert(11%) sepia(89%) saturate(6391%) hue-rotate(22deg) brightness(85%) contrast(130%)'
              }}
            />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isSectionInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px w-48 bg-rougePerso origin-left"
          />
        </div>

        {/* Image d'Akemaru */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute right-[calc(50%-150px)] top-4 z-[5] pointer-events-none hidden lg:block"
        >
          <Image
            src="/img/caractéristiques/akemaru.png"
            alt="Akemaru"
            width={300}
            height={400}
            className="object-contain opacity-90"
            style={{
              maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)'
            }}
          />
        </motion.div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
          {characteristics.map((characteristic, index) => (
            <CharacteristicCard key={index} {...characteristic} index={index} />
          ))}
        </div>
      </div>

      {/* Styles personnalisés pour la scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </Section>
  );
};

export default Caracteristique;