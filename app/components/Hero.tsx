"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useMemo, useState } from "react";
import { useInView } from "../hooks/useInView";

// Hook pour optimiser les animations sur les appareils à faible performance
const useOptimizedAnimations = () => {
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);

  useEffect(() => {
    // Détection simple des appareils à faible performance
    const isLowEnd =
      navigator.hardwareConcurrency <= 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    setIsLowPerfDevice(isLowEnd);
  }, []);

  return isLowPerfDevice;
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const isLowPerfDevice = useOptimizedAnimations();

  // Réduire la complexité des animations si nécessaire
  const shouldReduceMotion = prefersReducedMotion || isLowPerfDevice;

  const springConfig = shouldReduceMotion
    ? { damping: 50, stiffness: 200 } // Configuration plus légère
    : { damping: 25, stiffness: 100 };

  const titleX = useSpring(mouseX, springConfig);

  useEffect(() => {
    // Désactiver le suivi de souris si l'utilisateur préfère réduire les animations
    if (shouldReduceMotion) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle pour limiter les mises à jour
      if (!window.requestAnimationFrame) {
        const xOffset = (e.clientX - window.innerWidth / 2) * 0.02;
        const yOffset = (e.clientY - window.innerHeight / 2) * 0.02;
        mouseX.set(xOffset);
        mouseY.set(yOffset);
        return;
      }

      window.requestAnimationFrame(() => {
        const xOffset = (e.clientX - window.innerWidth / 2) * 0.02;
        const yOffset = (e.clientY - window.innerHeight / 2) * 0.02;
        mouseX.set(xOffset);
        mouseY.set(yOffset);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const isInView = useInView(ref, {
    threshold: 0.2,
    once: true,
    rootMargin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Réduire l'amplitude des animations parallaxes si nécessaire
  const parallaxAmount = shouldReduceMotion ? 0.5 : 1;

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${15 * parallaxAmount}%`]
  );
  const opacity = 1;
  const scrollTitleY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${35 * parallaxAmount}%`]
  );
  const characterX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-25 * parallaxAmount}%`]
  );
  const characterOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, shouldReduceMotion ? 0.5 : 0.3]
  );

  // Particules supprimées

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const backgroundVariants = {
    hidden: { scale: 1.05 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const characterLeftVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const characterRightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Variants pour l'animation du GIF avec optimisation
  const gifVariants = useMemo(
    () => ({
      hidden: { y: shouldReduceMotion ? -20 : -50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0.8 : 1.2,
          ease: "easeOut",
          delay: shouldReduceMotion ? 0.1 : 0.3,
        },
      },
    }),
    [shouldReduceMotion]
  );

  // Création de la transformation pour le personnage de droite
  const rightCharacterTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${25 * parallaxAmount}%`]
  );

  return (
    <motion.div
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ opacity }}
      aria-label="Section d'accueil avec animation Naruto"
    >
      {/* Background Color */}
      <motion.div
        variants={backgroundVariants}
        style={{ y: parallaxY }}
        className="absolute inset-0 bg-[#C5C4C4]"
      ></motion.div>

      {/* GIF centré au-dessus du titre */}
      <motion.div
        variants={gifVariants}
        className="absolute top-[3%] sm:top-[5%] inset-x-0 mx-auto flex justify-center items-center z-30 px-4"
        style={{
          y: useTransform(
            scrollYProgress,
            [0, 1],
            ["0%", `${25 * parallaxAmount}%`]
          ),
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: 1.05,
                filter: "brightness(1.1)",
                transition: { duration: 0.3 },
              }
        }
      >
        <div className="relative w-[250px] h-[125px] sm:w-[350px] sm:h-[175px] md:w-[400px] md:h-[200px]">
          <Image
            src="/img/Hero/glitch-logo.gif"
            alt="Glitch Logo Animation"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 250px, (max-width: 768px) 350px, 400px"
            priority
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </motion.div>

      {/* Particules flottantes supprimées */}

      {/* Effet de lumière ambiante supprimé */}

      {/* Aucune transition visible entre les sections */}

      {/* Title avec effet de suivi de souris */}
      <motion.div
        variants={titleVariants}
        className="absolute inset-0 flex items-center justify-center z-30 px-4" /* Augmentation du z-index à 30 pour être au premier plan */
        style={{
          x: titleX,
          y: scrollTitleY,
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: 1.02,
                filter: "brightness(1.1)",
                transition: { duration: 0.3 },
              }
        }
      >
        <motion.div
          className="relative w-full max-w-[300px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[1000px]"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          <Image
            src="/img/Titre.png"
            alt="Koten Kitsushi"
            width={1000}
            height={600}
            priority
            loading="eager"
            fetchPriority="high"
            className="z-10 transition-all duration-300 w-full h-auto"
            sizes="(max-width: 640px) 300px, (max-width: 768px) 500px, (max-width: 1024px) 700px, 1000px"
            quality={shouldReduceMotion ? 80 : 90}
          />
        </motion.div>
      </motion.div>

      {/* Character Left */}
      <motion.div
        variants={characterLeftVariants}
        className="absolute -bottom-10 sm:-bottom-16 md:-bottom-20 left-0 w-[400px] sm:w-[550px] md:w-[650px] lg:w-[750px] h-[500px] sm:h-[700px] md:h-[850px] lg:h-[950px] z-10" /* z-index reste à 10 pour être en arrière-plan */
        style={{
          x: characterX,
          opacity: characterOpacity,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/img/ninja.png"
            alt="Koten Kitsushi Character Left"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 640px) 400px, (max-width: 768px) 550px, (max-width: 1024px) 650px, 750px"
            quality={90}
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,0,0,0.3))",
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.7) 15%, rgba(0,0,0,0))",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.7) 20%, rgba(0,0,0,0))",
            }}
          />
        </div>
      </motion.div>

      {/* Character Right (Cloned from Left and Mirrored) */}
      <motion.div
        variants={characterRightVariants}
        className="absolute -bottom-10 sm:-bottom-16 md:-bottom-20 right-0 w-[400px] sm:w-[550px] md:w-[650px] lg:w-[750px] h-[500px] sm:h-[700px] md:h-[850px] lg:h-[950px] z-10" /* z-index reste à 10 pour être en arrière-plan */
        style={{
          // Inverser la direction pour le personnage de droite
          x: rightCharacterTransform,
          opacity: characterOpacity,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/img/ninja.png"
            alt="Koten Kitsushi Character Right"
            fill
            className="object-contain object-bottom scale-x-[-1]" // Effet miroir horizontal
            sizes="(max-width: 640px) 400px, (max-width: 768px) 550px, (max-width: 1024px) 650px, 750px"
            quality={90}
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,0,0,0.3))",
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.7) 15%, rgba(0,0,0,0))",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.7) 20%, rgba(0,0,0,0))",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
