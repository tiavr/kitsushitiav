"use client";

import { useState, useRef, useEffect } from "react";
import SectionCloud from "./AnimatedCloud";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";

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
/*                          MODAL SPÉCIFIQUE CARACTÈRE                        */
/* -------------------------------------------------------------------------- */

const CaractereModal = ({ onClose }: { onClose: () => void }) => {
  const [traitHover, setTraitHover] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isModalInView = useInView(modalRef, {
    threshold: 0.5,
    once: false,
    rootMargin: "0px",
  });

  // ------------------------------------------------------------------------
  // Scroll lock au montage / déverrouillage au démontage de la modal
  // ------------------------------------------------------------------------
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

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
      gif: "/img/caractéristiques/kleptomane.gif", // À remplacer par le vrai GIF
    },
  ];

  const traitVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#1a1a1a]/70 rounded-2xl w-[90vw] h-[90vh] max-w-[1600px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0">
          <Image
            src="/img/caractéristiques/background_caractere_modal.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/60 to-[#1a1a1a]/95" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-sand-200 z-20
                     text-4xl transition-all duration-300 p-4 rounded-full 
                     hover:bg-white/10 hover:scale-110 backdrop-blur-sm"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="h-[28vh]" />

          <div className="flex-1 px-8 pb-8 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1400px] mx-auto">
              {traits.map((trait, index) => (
                <motion.div
                  key={trait.titre}
                  custom={index}
                  variants={traitVariants}
                  initial="hidden"
                  animate={isModalInView ? "visible" : "hidden"}
                  className="flex flex-col items-center group"
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setTraitHover(trait.titre)}
                  onHoverEnd={() => setTraitHover(null)}
                >
                  <div
                    className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 max-w-[240px]
                                 shadow-2xl transform transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <Image
                      src={trait.gif}
                      alt={trait.titre}
                      fill
                      className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 
                                   group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-2 transition-all duration-300 
                                 group-hover:text-sand-200 text-shadow-lg tracking-wide"
                  >
                    {trait.titre}
                  </h3>

                  <div className="relative h-[100px] w-full flex items-start justify-center">
                    <AnimatePresence>
                      {traitHover === trait.titre && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute top-0 bg-black/80 backdrop-blur-md p-3 rounded-xl 
                                     shadow-2xl border border-white/20 transform-gpu"
                        >
                          <p className="text-white text-center text-sm leading-relaxed">
                            {trait.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full max-w-[800px] mx-auto mt-6">
              {traitsSecondaires.map((trait, index) => (
                <motion.div
                  key={trait.titre}
                  custom={index + traits.length}
                  variants={traitVariants}
                  initial="hidden"
                  animate={isModalInView ? "visible" : "hidden"}
                  className="flex flex-col items-center group"
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setTraitHover(trait.titre)}
                  onHoverEnd={() => setTraitHover(null)}
                >
                  <div
                    className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 max-w-[180px]
                                 shadow-2xl transform transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <Image
                      src={trait.gif}
                      alt={trait.titre}
                      fill
                      className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 
                                   group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-2 transition-all duration-300 
                                 group-hover:text-sand-200 text-shadow-lg tracking-wide"
                  >
                    {trait.titre}
                  </h3>

                  <div className="relative h-[100px] w-full flex items-start justify-center">
                    <AnimatePresence>
                      {traitHover === trait.titre && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute top-0 bg-black/80 backdrop-blur-md p-3 rounded-xl 
                                     shadow-2xl border border-white/20 transform-gpu"
                        >
                          <p className="text-white text-center text-sm leading-relaxed">
                            {trait.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-white/70 italic text-sm text-center mt-4">
              Passez la souris sur les icônes pour développer les caractères
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                         MODAL GÉNÉRIQUE PAR DÉFAUT                         */
/* -------------------------------------------------------------------------- */

const Modal = ({
  title,
  modalImage,
  onClose,
}: {
  title: string;
  modalImage?: string;
  onClose: () => void;
}) => {
  // Si le titre est "Caractère", on renvoie la modal personnalisée
  if (title === "Caractère") {
    return <CaractereModal onClose={onClose} />;
  }

  // ------------------------------------------------------------------------
  // Scroll lock au montage / déverrouillage au démontage de la modal
  // ------------------------------------------------------------------------
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

/* -------------------------------------------------------------------------- */
/*                       CARTE CARACTÉRISTIQUE (CARD)                         */
/* -------------------------------------------------------------------------- */

const CharacteristicCard = ({
  title,
  backgroundImage,
  modalImage,
  unoptimized = false,
  index,
}: CharacteristicCardProps & { index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, {
    threshold: 0.5,
    once: false,
    rootMargin: "0px",
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 }, // Réduit l'amplitude du mouvement
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15, // Encore plus rapide
        delay: 0.1 + index * 0.05, // Délai minimal entre les cartes
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
          unoptimized={unoptimized}
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
};

/* -------------------------------------------------------------------------- */
/*                     SECTION "CARACTÉRISTIQUES" PRINCIPALE                  */
/* -------------------------------------------------------------------------- */

const Caracteristique = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.2,
    once: false,
    rootMargin: "0px",
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
  const symbolVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.15,
      },
    },
  };

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
      className="py-20 relative bg-[#C5C4C4]"
      id="caracteristiques"
    >
      {/* Nuages qui "bugguent" dans cette section */}
      <SectionCloud cloudCount={2} />
      
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={titleVariants}
          className="text-5xl text-rougePerso font-bold text-center mb-12"
        >
          Caractéristiques
        </motion.h2>

      <div className="flex items-center justify-center mb-16">
  <motion.div
    variants={separatorVariants}
    className="h-px w-full max-w-[200px]"
    style={{ backgroundColor: '#920000' }}
  />
  <motion.div
    variants={symbolVariants}
    animate={{
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        delay: 1,
      },
    }}
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
    variants={separatorVariants}
    className="h-px w-full max-w-[200px]"
    style={{ backgroundColor: '#920000' }}
  />
</div>

        {/* Image d'Akemaru avec effet de transparence */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <Image
              src="/img/caractéristiques/akemaru.png"
              alt="Akemaru"
              width={300}
              height={400}
              className="object-contain"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 70%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 70%, black 100%)'
              }}
            />
            {/* Effet de glow subtil */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(146, 0, 0, 0.1) 0%, transparent 70%)',
                maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 70%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 70%, black 100%)'
              }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {characteristics.map((characteristic, index) => (
            <CharacteristicCard key={index} {...characteristic} index={index} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Caracteristique;
