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
    title: "Mettre en place un rituel au sein du clan",
    content:
      "Okami cherchera à mettre en place un rituel au sein du clan : La chasse en meute. Le but principal de ce rituel est d'aiguiser leurs talents de chasseur mais également de renforcer la cohésion au sein de la meute. Chaque année, les membres du clan Inuzuka devront se rassembler afin de partir en chasse, les proies peuvent être du gibier mais également des ninjas, ce rituel peut également s'instaurer dans le cadre d'un mercenariat.",
  },
  {
    title: "Un clan de chasseurs et d'éclaireurs",
    content:
      "Okami aspire à élever le prestige du clan Inuzuka dans les domaines de la traque et de la chasse. Il souhaite que le clan Inuzuka se fasse une réputation dans ce domaine, dans l'entièreté du monde ninja. Il souhaite que le clan mette en avant leur flair incroyable et leur instinct bestial en prenant part aux opérations secrètes du village.",
  },
  {
    title: "Rallier un clan mineur ou une famille au service du clan",
    content:
      "Okami est conscient de l’importance de la politique au sein du village. Pour affirmer sa position, il sait qu’il lui faut des alliés loyaux. Il cherchera donc à rallier un clan mineur partageant des intérêts communs. L’objectif sera de placer progressivement les membres de ce clan à des postes plus ou moins influents dans le village, afin de garder un certain contrôle et d’orienter l’opinion publique en sa faveur.",
  },

  {
    title: "Relations entre les clans",
    content:
      "Okami fera en sorte d'étudier les relations entre les clans suite au sein de Konoha. Le but final est d'unifier les clans du village et de garantir une cohésion entre ceux-ci. Cela se fera en étudiant les liens entre les différents clans car ils sont les piliers du village. En organisant des réunions, en débattant, en exposant nos points de vue. Pour Okami, un village se doit d'être uni s'il veut être fort.",
  },
  {
    title: "Affirmer sa position",
    content:
      "Suite à la mise en surface du clan au sein de Konoha, Okami à pour but de rendre le clan attrayant et indispensable au sein du village. Il souhaite faire prospérer le clan et protéger les intérets de ce dernier. Il souhaite affirmer la position du clan et le placer comme étant un pilier non seulement militaire mais également politique. Il motivera les membres du clan à l'accompagner dans cette quête d'occuper des postes à fortes responsabilités.",
  },
];

const objectifsPersonnels: ObjectifData[] = [
  {
    title: "Evenement de traque et Stage de survie",
    content:
      "Okami mettra en place des stages de survie, afin d'enseigner la survie en milieu hostile. Ces stages découleront sur un évenement au sein du village de Konoha consistant à rassembler quelques membre du clan Inuzuka ainsi que tous les ninjas de Konoha afin de participer à un jeu de chasse à l'homme. Les Inuzuka devront utiliser leur flair et leur talent d'éclaireur et de chasseur afin de traquer les différents ninjas de Konoha dans une zone précise. Les survivants seront récompensés. Cela mettra à l'épreuve les capacités de survie des ninjas de Konoha, et entrainera le flair des Inuzuka.",
  },
  {
    title: "Renforcer son lien avec son compagnon canin",
    content:
      "Okami souhaite réellement entretenir un lien fort avec son chien. Il souhaite que sa relation avec lui ne soit pas uniquément lié à ce statut de maitre/chien, il voit ça plutôt comme une amitié, une fraternité. Il a besoin d'un second pouvant l'épauler et le soutenir dans sa vie de ninja.",
  },
  {
    title: "Rejoindre la Stratégie militaire",
    content:
      "Okami fera en sorte de rejoindre la stratégie militaire le plus rapidement possible. Cela lui permet d'être au coeur de nombreux évenements militaire au sein du village ce qui lui permettra de mettre en avant son art oratoire et ses capacités à diriger les ninjas sur le terrain, comme s'il dirigeait une meute. Le but secondaire est de prendre la tête de cette section et montrer que les Inuzuka peuvent hériter de grandes responsabilités.",
  },
  {
    title: "Devenir une figure de KONOHAGAKURE",
    content:
      "Pour devenir un figure de Konoha, Okami sait qu'il doit réaliser des exploits qui vont au-delà des frontières de son clan. En prenant part à des missions importantes pour le village, il démontre sa valeur en tant que combattant, stratège et diplomate. Okami collaborera avec d'autres clans et créera des ponts et des alliances. Des événements culturels, tel qu'une démonstration de capacités par son clan (également les autres clans) sous forme d'art, démontrant que sa richesse culturelle est également présente. Sa sérénité, sa sagesse et sa persévérance rendront les ninjas admiratifs de sa personne, renforçant sa position de personnage emblématique de Konoha.",
  },
  {
    title: "Protecteur de la forêt",
    content:
      "Okami est bien décidé a rendre à la Mère nature se qu’elle lui a donné. De ce fait, Okami veut à tout prix préserver la Forêt, lui donnant droit et respect. Pour cela, Okami compte porter la voix de la forêt au sein du Commandement de Konoha, le but étant de contrôler et superviser tout ce qui se trame dans la forêt (excursion, chasse etc) en veillant à ce que la forêt soit préservée.",
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

// Styles avec animations spectaculaires
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
    base: "w-full text-left p-5 rounded-xl transition-all duration-500 backdrop-blur-sm focus:outline-none relative overflow-hidden group cursor-pointer",
    selected: {
      container:
        "bg-gradient-to-br from-rougePerso via-red-800 to-black relative",
      overlay:
        "absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700",
      glow: "shadow-[0_0_30px_rgba(146,0,0,0.6),0_0_60px_rgba(146,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_40px_rgba(146,0,0,0.8),0_0_80px_rgba(146,0,0,0.4),inset_0_2px_0_rgba(255,255,255,0.4)]",
      text: "text-white font-semibold relative z-10 drop-shadow-lg",
      particles:
        "absolute inset-0 opacity-100 transition-opacity duration-1000",
      morphing: "", // Pas utilisé pour les boutons sélectionnés
    },
    default: {
      container:
        "bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-red-900/30 relative",
      overlay:
        "absolute inset-0 bg-gradient-to-r from-transparent via-rougePerso/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500",
      glow: "shadow-[0_4px_20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_8px_30px_rgba(146,0,0,0.4),0_0_20px_rgba(146,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]",
      text: "text-rougePerso group-hover:text-red-300 font-medium relative z-10 transition-colors duration-300",
      morphing:
        "absolute inset-0 bg-gradient-to-r from-rougePerso/0 via-rougePerso/5 to-rougePerso/0 opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-x-0 group-hover:scale-x-100",
      particles: "", // Pas utilisé pour les boutons par défaut
    },
  },
};

// Hook pour optimiser les animations
const useOptimizedAnimations = () => {
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);

  useEffect(() => {
    const isLowEnd =
      navigator.hardwareConcurrency <= 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

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
const BackgroundImage = memo(
  ({ side, isVisible }: { side: "left" | "right"; isVisible: boolean }) => {
    const prefersReducedMotion = useReducedMotion();
    const isLowPerfDevice = useOptimizedAnimations();

    return (
      <div
        className={`absolute ${side}-0 top-0 h-full w-[25vw] overflow-hidden pointer-events-none`}
      >
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
                  transform:
                    side === "left" ? "scaleX(-1) scale(0.7)" : "scale(0.7)",
                  objectPosition: "center 30%",
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
                transform:
                  side === "left" ? "scaleX(-1) scale(0.7)" : "scale(0.7)",
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
  }
);

BackgroundImage.displayName = "BackgroundImage";

const ObjectifDescription = memo(
  ({
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

    const iconSrc = useMemo(
      () =>
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
          whileHover={
            prefersReducedMotion || isLowPerfDevice
              ? {}
              : {
                  scale: 1.1,
                  rotate: 5,
                }
          }
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
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
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
  }
);

ObjectifDescription.displayName = "ObjectifDescription";

const ObjectifTitle = ({ title }: { title: string }) => (
  <h3
    className="text-3xl font-bold text-rougeTitle mb-8"
    style={{ fontFamily: "Edo" }}
  >
    {title}
  </h3>
);

const ObjectifButton = memo(
  ({
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

    const buttonStyle = isSelected
      ? styles.button.selected
      : styles.button.default;

    return (
      <motion.button
        onClick={onClick}
        className={`${styles.button.base} ${buttonStyle.container} ${buttonStyle.glow}`}
        variants={animations.button}
        custom={index}
        whileHover={
          prefersReducedMotion || isLowPerfDevice
            ? {}
            : {
                scale: 1.03,
                y: -2,
                transition: { duration: 0.3, ease: "easeOut" },
              }
        }
        whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        {/* Effet de morphing pour les boutons non-sélectionnés */}
        {!isSelected && (
          <motion.div
            className={buttonStyle.morphing}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        )}

        {/* Overlay lumineux */}
        <motion.div
          className={buttonStyle.overlay}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Particules flottantes pour les boutons sélectionnés */}
        {isSelected && !prefersReducedMotion && !isLowPerfDevice && (
          <motion.div
            className={buttonStyle.particles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-red-400 rounded-full shadow-[0_0_4px_rgba(239,68,68,0.8)]"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${25 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-8, -20, -8],
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.4, 0.8],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
            {/* Particules supplémentaires avec mouvement horizontal */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`horizontal-${i}`}
                className="absolute w-1 h-1 bg-red-300 rounded-full shadow-[0_0_3px_rgba(252,165,165,0.6)]"
                style={{
                  left: `${25 + i * 20}%`,
                  top: `${50 + (i % 2) * 20}%`,
                }}
                animate={{
                  x: [-3, 3, -3],
                  y: [-5, -12, -5],
                  opacity: [0.4, 0.9, 0.4],
                  scale: [0.6, 1.1, 0.6],
                }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4 + 1,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Effet de scan lumineux */}
        {!prefersReducedMotion && !isLowPerfDevice && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
            whileHover={{
              opacity: [0, 1, 0],
              x: ["-100%", "100%"],
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}

        {/* Bordure animée pour les boutons sélectionnés */}

        {/* Texte avec effet de glow */}
        <motion.span
          className={`${buttonStyle.text} relative z-20`}
          style={{ fontFamily: "Edo" }}
          whileHover={{
            textShadow: isSelected
              ? "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)"
              : "0 0 10px rgba(146,0,0,0.8), 0 0 20px rgba(146,0,0,0.4)",
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.span>

        {/* Effet de pulsation de fond pour les boutons sélectionnés */}
        {isSelected && !prefersReducedMotion && !isLowPerfDevice && (
          <motion.div
            className="absolute inset-0 bg-rougePerso/20 rounded-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>
    );
  }
);

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
        className="relative min-h-screen bg-gradient-to-b from-[#C5C4C4] via-[#C5C4C4] to-black py-10 sm:py-16 md:py-20 overflow-hidden geist-font"
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
          className="container mx-auto px-4 sm:px-6 relative z-20"
          variants={animations.container}
        >
          <motion.h2
            variants={animations.title}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-rougePerso/70 text-center mb-8 sm:mb-10 md:mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            style={{ fontFamily: "Edo" }}
          >
            Objectifs
          </motion.h2>

          <div className="flex flex-col sm:flex-row justify-center mb-10 sm:mb-12 md:mb-16 gap-4 sm:gap-8">
            {["clan", "personnels"].map((tab, index) => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab as "clan" | "personnels")}
                className={`relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg md:text-xl font-bold transition-all duration-500 focus:outline-none overflow-hidden group
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-br from-rougePerso via-red-800 to-black text-white shadow-[0_0_30px_rgba(146,0,0,0.6),0_0_60px_rgba(146,0,0,0.3)]"
                      : "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-rougePerso border border-red-900/30 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                  }`}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow:
                    activeTab === tab
                      ? "0 0 40px rgba(146,0,0,0.8), 0 0 80px rgba(146,0,0,0.4)"
                      : "0 8px 30px rgba(146,0,0,0.4), 0 0 20px rgba(146,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ fontFamily: "Edo" }}
              >
                {/* Effet de scan lumineux */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                  whileHover={{
                    opacity: [0, 1, 0],
                    x: ["-100%", "100%"],
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Bordure animée pour le tab actif */}

                {/* Particules pour le tab actif */}
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-red-400 rounded-full shadow-[0_0_4px_rgba(239,68,68,0.8)]"
                        style={{
                          left: `${20 + i * 12}%`,
                          top: `${35 + (i % 2) * 30}%`,
                        }}
                        animate={{
                          y: [-5, -12, -5],
                          opacity: [0.6, 1, 0.6],
                          scale: [0.8, 1.3, 0.8],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2.5 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.4,
                        }}
                      />
                    ))}
                    {/* Particules secondaires avec mouvement orbital */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`orbital-${i}`}
                        className="absolute w-1 h-1 bg-red-300 rounded-full shadow-[0_0_3px_rgba(252,165,165,0.6)]"
                        style={{
                          left: `${30 + i * 20}%`,
                          top: `${50}%`,
                        }}
                        animate={{
                          x: [0, 8, 0, -8, 0],
                          y: [-4, -10, -4],
                          opacity: [0.5, 0.9, 0.5],
                          scale: [0.6, 1.1, 0.6],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.5 + 0.8,
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Texte avec glow */}
                <motion.span
                  className="relative z-10"
                  whileHover={{
                    textShadow:
                      activeTab === tab
                        ? "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)"
                        : "0 0 10px rgba(146,0,0,0.8), 0 0 20px rgba(146,0,0,0.4)",
                  }}
                >
                  Objectifs {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.span>
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3 sm:space-y-4 relative"
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

            <div className="lg:w-2/3 mt-6 lg:mt-0">
              <AnimatePresence mode="wait">
                {selectedObjectif && (
                  <motion.div
                    key={selectedObjectif.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      scale: { duration: 0.3 },
                    }}
                    className="relative bg-black/100 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 overflow-hidden group"
                    whileHover={{ y: -2 }}
                  >
                    {/* Contenu */}
                    <div className="relative z-10">
                      <ObjectifTitle title={selectedObjectif.title} />
                      <ObjectifDescription
                        content={selectedObjectif.content}
                        isVisible={isSectionInView}
                        type={activeTab}
                      />
                    </div>

                    {/* Effet de glow au hover */}
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-rougePerso/10 via-transparent to-black/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
