"use client";

import { useState, useRef, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";
import SectionCloud from "./AnimatedCloud";

// Types
interface ObjectifData {
  title: string;
  content: string;
}

// Constants
const objectifsClan: ObjectifData[] = [
  {
    title: "Rechercher les terres de ses ancêtres",
    content:
      "Koten cherchera à se renseigner sur ses ancêtres et les terres qu'ils ont habité avant de venir à Kusa. Il souhaiterait en savoir plus sur l'histoire de son clan qui ne contient que très peu de récits. Il pense que les anciennes sculptures laissées par ses ancêtres lui permettront de mieux comprendre ses origines.",
  },
  {
    title: "Apprendre les moeurs et tradition du clan",
    content:
      "Koten suivra l'éducation de son père afin d'apprendre toutes les traditions et héritages du clan. Le but étant de faire perpétuer ces valeurs aux prochaines générations du clan.",
  },
  {
    title: "Corpus secret",
    content:
      "Koten souhaitera garder des traces écrites de l'histoire du clan Kitsushi tel qu'il le connait. Suite à cette amnésie et cette perte d'identité temporaire que ses ancêtres ont subit, il juge nécessaire d'archiver dans un document secret l'histoire de son clan. Ce corpus pourrait être illustré de sculptures.",
  },
  {
    title: "Dojo Kitsushi",
    content:
      "Le dojo Kitsushi accueillera les ninjas souhaitant apprendre l'art du sculpteur. Il aimerait mettre en avant et populariser cet art auprès des personnes qui ne sont pas familier des capacités du clan Kitsushi. Cela permettra de populariser le clan au sein du village qui les a accueilli et leur faire gagner en notoriété.",
  },

  {
    title: "Relations entre les clans",
    content:
      "Koten fera en sorte d'étudier les relations entre les clans suite à l'unification des villages. Le but final est d'unifier les clans du village et de garantir une cohésion entre ceux-ci. Cela se fera en étudiant les liens entre les différents clans car ils sont les piliers du village. En organisant des réunions, en débattant, en exposant nos points de vue. Pour Koten, un village se doit d'être uni s'il veut être fort.",
  },
  {
    title: "Affirmer sa position",
    content:
      "Par le passé, le clan Kitsushi n'héritèrent jamais de grandes responsabilités. Suite à l'unification des villages. Koten souhaite en profiter pour changer les choses. Il souhaite faire prospérer le clan et protéger les intérets de ce dernier. Il souhaite affirmer la position du clan et le placer comme étant un pilier non seulement militaire mais également politique. Il motivera les membres du clan à l'accompagner dans cette quête d'occuper des postes à fortes responsabilités.",
  },
];

const objectifsPersonnels: ObjectifData[] = [
  {
    title: "Dépasser ses limites",
    content:
      "Koten continuera  son entrainement afin d'améliorer ses capacités physiques en s'entrainant avec son serviteur et les membres de sa famille. Son but est de montrer aux autres ninjas qu'il est digne de porter le nom Kitsushi malgré ses défauts. Il se dépassera et deviendra un ninja reconnu et redouté dans le monde ninja.",
  },
  {
    title: "Renforcer son lien avec son serviteur",
    content:
      "Koten souhaite réellement établir un lien fort avec son serviteur. Il souhaite que sa relation avec lui ne soit pas uniquément lié à ces statuts maitre/serviteur. Il a besoin d'un second pouvant l'épauler et le conseiller dans ses projets. Il aimerait que ce serviteur puisse occuper un poste important au sein du village.",
  },
  {
    title: "Maîtriser le Fuinjutsu",
    content:
      "Koten tâchera de trouver un maitre afin d'apprendre le fuinjutsu. Cette technique lui permettra de sceller les secrets du clan, ils lui serviront aussi pour son projet à la section policière.",
  },
  {
    title: "Rejoindre la Seido",
    content:
      "Koten fera en sorte de rejoindre la Seido le plus rapidement possible. La Seido lui permet d'être au coeur de nombreux évenements au sein du village ce qui lui permettra de récolter beaucoup d'informations qui lui serviront à l'avenir, des informations qu'il pourrait potentillement manipuler. Le but secondaire est de prendre la tête de cette section et montrer que les Kitsushi peuvent hériter de grandes responsabilités.",
  },
  {
    title: "Révolutionner les lois et sanctions de la Seido",
    content:
      "Le système et les lois d'un village peuvent changer au fur et à mesure de l'évolution de ses habitants. Koten souhaite donc effectuer de la recherche, et partir en reconnaissance dans les autres pays afin d'étudier leur section policière et leur système de loi. Il pense qu'il pourrait potentiellement s'inspirer afin d'améliorer le système de Kusa et garantir la sécurité et la perennité du village. L'une des raisons principales de l'apprentissage du Fuinjutsu pour Koten, est d'intégrer cette pratique dans les sanctions du village. Pour Koten, ce genre de sanctions peut-être bénéfique pour empecher le recidivisme et montrer le bon exemple. Bien evidemment, ces sanctions seront adaptés aux infractions commises. Comme vous pouvez le comprendre, le fuinjutsu permettra de placer différents types de sceaux sur l'individu en fonction de la nature de sa sanction.",
  },
  {
    title: "Protecteur du Pays de l'Herbe",
    content:
      "Koten souhaite atteindre un statut important au sein de Kusa, non seulement, pour casser la chaine sur la mise à l'écart du clan Kitsushi dans le passé mais également pour pouvoir protéger les hautes instances du pays afin d'assurer la perénnité du Pays et montrer son dévouement et sa loyauté au village ayant accepté de les accueillir suite aux évènements.",
  },
];

// Animations
const animations = {
  container: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  },
  title: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  },
  content: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  button: {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    }),
  },
  background: {
    left: {
      hidden: { opacity: 0, x: -200, scale: 0.8 },
      visible: {
        opacity: 0.15,
        x: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: "easeOut",
          opacity: { duration: 1 },
        },
      },
      exit: {
        opacity: 0,
        x: -200,
        scale: 0.8,
        transition: {
          duration: 0.8,
          ease: "easeIn",
        },
      },
    },
    right: {
      hidden: { opacity: 0, x: 200, scale: 0.8 },
      visible: {
        opacity: 0.15,
        x: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: "easeOut",
          opacity: { duration: 1 },
        },
      },
      exit: {
        opacity: 0,
        x: 200,
        scale: 0.8,
        transition: {
          duration: 0.8,
          ease: "easeIn",
        },
      },
    },
  },
};

// Styles
const styles = {
  backgroundImage: {
    base: "absolute inset-0",
    mask: {
      left: "linear-gradient(to right, transparent, black 80%, black 0%, transparent)",
      right:
        "linear-gradient(to left, transparent, black 0%, black 0%, transparent)",
    },
  },
  button: {
    base: "w-full text-left p-5 rounded-xl transition-all backdrop-blur-sm",
    selected:
      "bg-gradient-to-l from-rougePerso to-black/0   ",
    default:
      "bg-fondnoir/100 text-rougePerso  hover:bg-fondnoir/90 ",
  },
};

// Hook pour optimiser les animations
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

// Custom Hook
const useObjectifState = () => {
  const [activeTab, setActiveTab] = useState<"clan" | "personnels">("clan");
  const [selectedObjectif, setSelectedObjectif] = useState<ObjectifData | null>(
    objectifsClan[0]
  );

  const handleTabChange = (tab: "clan" | "personnels") => {
    setActiveTab(tab);
    setSelectedObjectif(
      tab === "clan" ? objectifsClan[0] : objectifsPersonnels[0]
    );
  };

  return {
    activeTab,
    selectedObjectif,
    handleTabChange,
    setSelectedObjectif,
  };
};

// Components optimisés
const BackgroundImage = memo(({ side, isVisible }: { side: "left" | "right"; isVisible: boolean }) => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPerfDevice = useOptimizedAnimations();
  
  return (
    <div className={`absolute ${side}-0 top-0 h-full w-[25vw] overflow-hidden pointer-events-none`}>
      {/* Image de fond fixe - ne bouge plus lors des sélections */}
      <motion.div
        className="absolute inset-0 opacity-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.15 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Effet de blur animé seulement si performance OK */}
        {!prefersReducedMotion && !isLowPerfDevice && (
          <motion.div
            className="absolute inset-0 blur-[100px] opacity-30"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/img/Objectif/Face2.png"
              alt={`Gaara ${side} blur`}
              fill
              className="object-contain"
              style={{
                filter: "grayscale(100%) brightness(0.05)",
                transform: side === "left" ? "scaleX(-1) scale(0.7)" : "scale(0.7)",
                objectPosition: "center 30%"
              }}
              priority={false}
              loading="lazy"
            />
          </motion.div>
        )}
        
        {/* Image principale fixe */}
        <div className={styles.backgroundImage.base}>
          <Image
            src="/img/Objectif/Face2.png"
            alt={`Gaara ${side}`}
            fill
            className="object-contain"
            style={{
              objectPosition: "center 30%",
              maskImage: styles.backgroundImage.mask[side],
              WebkitMaskImage: styles.backgroundImage.mask[side],
              transform: side === "left" ? "scaleX(-1) scale(0.7)" : "scale(0.7)",
            }}
            priority={true}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-${
              side === "left" ? "r" : "l"
            } from-transparent via-transparent to-transparent opacity-90`}
          />
        </div>
      </motion.div>
    </div>
  );
});

BackgroundImage.displayName = "BackgroundImage";

const ObjectifDescription = memo(({
  content,
  isVisible,
  type,
}: {
  content: string;
  isVisible: boolean;
  type: "clan" | "personnels";
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isLowPerfDevice = useOptimizedAnimations();
  
  const isContentInView = useInView(contentRef, {
    threshold: 0.1,
    once: false,
    rootMargin: "0px",
  });

  const iconSrc = useMemo(() => 
    type === "clan" ? "/img/Objectif/icon.png" : "/img/Objectif/icon.png",
    [type]
  );

  return (
    <motion.div
      ref={contentRef}
      variants={animations.content}
      initial="hidden"
      animate={isVisible && isContentInView ? "visible" : "hidden"}
      className="flex flex-col items-center gap-8"
    >
      <motion.p 
        className="text-sand-100 leading-relaxed text-lg w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {content}
      </motion.p>
      
      <motion.div
        className="flex-shrink-0 w-40 h-40 relative"
        whileHover={prefersReducedMotion || isLowPerfDevice ? {} : { 
          scale: 1.1,
          rotate: 5
        }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Effet de glow derrière l'icône */}
        {!prefersReducedMotion && !isLowPerfDevice && (
          <motion.div
            className="absolute inset-0 rounded-full bg-rougePerso/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        <Image
          src={iconSrc}
          alt="Objectif icon"
          width={160}
          height={160}
          className="object-contain relative z-10 drop-shadow-lg"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
});

ObjectifDescription.displayName = "ObjectifDescription";

const ObjectifTitle = ({ title }: { title: string }) => (
  <h3
    className="text-3xl font-bold text-rougeTitle mb-8"
    style={{ fontFamily: "Edo" }}
  >
    {title}
  </h3>
);

const ObjectifButton = memo(({
  title,
  isSelected,
  onClick,
  index,
}: {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPerfDevice = useOptimizedAnimations();
  
  return (
    <motion.button
      onClick={onClick}
      className={`${
        styles.button.base
      } ${
        isSelected ? styles.button.selected : styles.button.default
      } relative overflow-hidden group`}
      variants={animations.button}
      custom={index}
      whileHover={prefersReducedMotion || isLowPerfDevice ? {} : { 
        scale: 1.02, 
        x: 8,
        boxShadow: "0 10px 25px rgba(220, 38, 38, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Effet de brillance au hover */}
      {!prefersReducedMotion && !isLowPerfDevice && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Indicateur de sélection */}
      {isSelected && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-rougePerso"
          layoutId="activeIndicator"
          transition={{ duration: 0.3 }}
        />
      )}
      
      <span className="font-medium text-base leading-tight relative z-10 group-hover:text-white transition-colors duration-200">
        {title}
      </span>
    </motion.button>
  );
});

ObjectifButton.displayName = "ObjectifButton";

const Objectif = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.1,
    once: false,
    rootMargin: "-50px 0px -10% 0px",
  });

  const { activeTab, selectedObjectif, handleTabChange, setSelectedObjectif } =
    useObjectifState();

  return (
    <motion.div
      initial="hidden"
      animate={isSectionInView ? "visible" : "hidden"}
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      <Section
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-b from-[#C5C4C4] via-[#C5C4C4] to-black py-20 overflow-hidden geist-font"
        id="objectifs"
      >
        {/* Nuages qui "bugguent" dans cette section */}
        <SectionCloud cloudCount={1} />
        
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSectionInView ? 0.4 : 0 }}
          transition={{ duration: 1 }}
        />

        {/* Images de fond fixes - ne bougent plus lors des sélections */}
        <BackgroundImage side="left" isVisible={isSectionInView} />
        <BackgroundImage side="right" isVisible={isSectionInView} />

        <motion.div
          className="container mx-auto px-6 relative z-20"
          variants={animations.container}
        >
          <motion.h2
            variants={animations.title}
            className="text-5xl font-bold text-rougePerso/70 text-center mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            style={{ fontFamily: "Edo" }}
          >
            Objectifs
          </motion.h2>

          <div className="flex justify-center mb-16 gap-8">
            {["clan", "personnels"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab as "clan" | "personnels")}
                className={`px-8 py-4 rounded-xl text-xl font-bold transition-all
                  ${
                    activeTab === tab
                      ? "bg-rougePerso text-black/70 shadow-lg scale-105"
                      : "bg-gray-900/70 text-amber-100 hover:bg-gray-800/90 border border-amber-400/30"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "Edo" }}
              >
                Objectifs {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 relative"
              >
                {(activeTab === "clan"
                  ? objectifsClan
                  : objectifsPersonnels
                ).map((objectif, index) => (
                  <ObjectifButton
                    key={objectif.title}
                    title={objectif.title}
                    isSelected={selectedObjectif?.title === objectif.title}
                    onClick={() => setSelectedObjectif(objectif)}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>

            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                {selectedObjectif && (
                  <motion.div
                    key={selectedObjectif.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-sm rounded-xl p-6 border border-amber-400/20 shadow-xl"
                  >
                    <ObjectifTitle title={selectedObjectif.title} />
                    <ObjectifDescription
                      content={selectedObjectif.content}
                      isVisible={isSectionInView}
                      type={activeTab}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </Section>
    </motion.div>
  );
};

export default Objectif;
