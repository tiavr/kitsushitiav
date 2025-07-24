"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface CloudPosition {
  x: string; // Utiliser des pourcentages pour rester relatif
  y: string;
  scale: number;
  rotation: number;
  opacity: number;
}

interface SectionCloudProps {
  cloudCount?: number; // Nombre de nuages dans cette section (défaut: 1-2)
}

const SectionCloud: React.FC<SectionCloudProps> = ({ cloudCount }) => {
  const [clouds, setClouds] = useState<CloudPosition[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Générer une position aléatoire en pourcentage
  const generateRandomPosition = useCallback((): CloudPosition => {
    return {
      x: `${10 + Math.random() * 80}%`, // Entre 10% et 90%
      y: `${10 + Math.random() * 80}%`, // Entre 10% et 90%
      scale: 0.4 + Math.random() * 0.6,
      rotation: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.6,
    };
  }, []);

  // Initialiser les nuages
  useEffect(() => {
    const numClouds = cloudCount || (Math.random() > 0.5 ? 2 : 1);
    const initialClouds = Array.from({ length: numClouds }, () => generateRandomPosition());
    setClouds(initialClouds);
  }, [cloudCount, generateRandomPosition]);

  // Animation de glitch aléatoire
  const glitchAnimation = useCallback(async () => {
    while (true) {
      // Attendre un délai aléatoire entre 4 et 12 secondes
      await new Promise(resolve => setTimeout(resolve, 4000 + Math.random() * 8000));
      
      // Effet de glitch : disparition rapide
      setIsVisible(false);
      
      // Attendre un court moment
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
      
      // Générer de nouvelles positions
      setClouds(prevClouds => 
        prevClouds.map(() => generateRandomPosition())
      );
      
      // Réapparaître
      setIsVisible(true);
      
      // Attendre avant le prochain glitch
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    }
  }, [generateRandomPosition]);

  // Démarrer l'animation de glitch
  useEffect(() => {
    glitchAnimation();
  }, [glitchAnimation]);

  // Animation continue de déplacement
  const floatingAnimation = {
    x: [0, 15, -10, 8, 0],
    y: [0, -8, 12, -4, 0],
    rotate: [0, 3, -2, 1, 0],
    transition: {
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
    }
  };

  // Variants pour l'effet de glitch
  const glitchVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hidden: {
      opacity: 0,
      scale: [1, 1.3, 0.7, 1],
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {clouds.map((cloud, index) => (
          <motion.div
            key={`section-cloud-${index}`}
            className="absolute"
            initial={{ 
              opacity: 0,
              scale: cloud.scale,
              rotate: cloud.rotation,
            }}
            animate={isVisible ? "visible" : "hidden"}
            variants={glitchVariants}
            style={{
              left: cloud.x,
              top: cloud.y,
              transform: `scale(${cloud.scale}) rotate(${cloud.rotation}deg)`,
            }}
          >
            <motion.div
              animate={floatingAnimation}
              className="relative"
            >
              <Image
                src="/img/animation_nuage.gif"
                alt="Nuage animé"
                width={60}
                height={45}
                className="drop-shadow-sm"
                style={{
                  opacity: cloud.opacity,
                }}
                priority={false}
                unoptimized // Pour permettre l'animation du GIF
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SectionCloud;
