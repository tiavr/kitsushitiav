"use client";

import { useState, useRef, useEffect } from "react";
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
      titre: "Méfiant et Hautain",
      description:
        "Ryuma aura beaucoup de mal à accorder sa confiance à une personne. Il évaluera d'abord les intentions de cette personne et ne lui laissera jamais la mainmise totale sur ses projets. Il évitera de s'associer avec des personnes qu'il considère comme étant faible.",
      gif: "/img/caractéristiques/loyal_gif.gif",
    },
    {
      titre: "Calculateur et Manipulateur",
      description:
        "L'aspect calculateur permet à Ryuma de tirer avantage de certaines situations, chacune de ses décisions serviront à un but précis. Il n'hésitera pas à manipuler les gens pour son propre intérêt. Il ne fait rien sans arrière-pensées.",
      gif: "/img/caractéristiques/calculateur_gif.gif",
    },
    {
      titre: "Sociable ?",
      description:
        "Ryuma se montrera sociable et quelque peu extraverti. Cela lui permet de facilement tisser des liens... tout en masquant ses intentions. Il s'agit principalement d'une façade, il montre son engouement par rapport à son retour au village afin de facilement gagner la confiance des autres. Sa vraie nature est plutôt calme et posé.",
      gif: "/img/caractéristiques/sociable_gif.gif",
    },
  ];

  const traitsSecondaires: TraitDeCaractere[] = [
    {
      titre: "Kleptomane",
      description:
        "Le passé de Ryuma à Oto l'a rendu Kleptomane. Il ressent constamment le besoin de voler. A l'époque il volait pour survivre, mais en grandissant il a apprit à voler pour avoir une forme de pression, un contrôle sur les autres. Cela lui donne le sentiment d'avoir le dessus sur les gens. Sa kleptomanie pourrait lui causer du tort car il poussait créer des tensions au sein du village ou du clan.",
      gif: "/img/caractéristiques/kleptomane.gif", // À remplacer par le vrai GIF
    },
    {
      titre: "Soucieux",
      description:
        "Ryuma est parfois soucieux, de son avenir, de sa relation avec son père, de sa relation avec les autres. Il est conscient de ses défauts, il aimerait retrouver ses valeurs mais son passé reprend le dessus. Il se remet parfois en question sur ses actes.",
      gif: "/img/caractéristiques/soucieux.gif", // À remplacer par le vrai GIF
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[800px] mx-auto mt-6">
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
      className="py-20 relative bg-[#e0bd7f]"
      id="caracteristiques"
    >
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={titleVariants}
          className="text-5xl text-black font-bold text-center mb-12"
        >
          Caractéristiques
        </motion.h2>

        <div className="flex items-center justify-center mb-16">
          <motion.div
            variants={separatorVariants}
            className="h-px bg-sand-600 w-full max-w-[200px]"
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
            />
          </motion.div>
          <motion.div
            variants={separatorVariants}
            className="h-px bg-sand-600 w-full max-w-[200px]"
          />
        </div>

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
