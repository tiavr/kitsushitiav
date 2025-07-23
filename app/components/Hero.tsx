"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import { useInView } from "../hooks/useInView";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const titleX = useSpring(mouseX, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xOffset = (e.clientX - window.innerWidth / 2) * 0.02;
      const yOffset = (e.clientY - window.innerHeight / 2) * 0.02;
      mouseX.set(xOffset);
      mouseY.set(yOffset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const isInView = useInView(ref, {
    threshold: 0.2,
    once: true,
    rootMargin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Suppression de l'effet d'opacité au scroll
  const opacity = 1;
  const scrollTitleY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const characterX = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const characterOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const seed = i + 1;
      return {
        id: i,
        x: `${(seed * 7) % 100}`,
        y: `${(seed * 13) % 100}`,
        size: `${2 + (seed % 2)}`,
        duration: 10 + (seed % 10),
      };
    });
  }, []);

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

  const characterVariants = {
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

  return (
    <motion.div
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ opacity }}
    >
      {/* Background Image */}
      <motion.div
        variants={backgroundVariants}
        style={{ y: parallaxY }}
        className="absolute inset-0"
      >
        <Image
          src="/img/test-inu.png"
          alt="Village de Kusa"
          fill
          priority
          className="object-cover blur-sm"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none bg-hero">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Effet de lumière ambiante */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aucune transition visible entre les sections */}

      {/* Title avec effet de suivi de souris */}
      <motion.div
        variants={titleVariants}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          x: titleX,
          y: scrollTitleY,
        }}
        whileHover={{
          scale: 1.02,
          filter: "brightness(1.1)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="relative"
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
            className="z-10 transition-all duration-300"
            sizes="(max-width: 768px) 90vw, 1000px"
            quality={90}
          />
        </motion.div>
      </motion.div>

      {/* Character */}
      <motion.div
        variants={characterVariants}
        className="absolute -bottom-20 left-0 w-[750px] h-[950px] z-20"
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
            alt="Koten Kitsushi Character"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 100vw, 850px"
            quality={90}
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,0,0,0.3))",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.7) 15%, rgba(0,0,0,0))",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.7) 20%, rgba(0,0,0,0))",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
