"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);

  useEffect(() => {
    const isLowEnd =
      navigator.hardwareConcurrency <= 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    setIsLowPerfDevice(isLowEnd);
  }, []);

  const links = [
    { name: "Accueil", href: "#" },
    { name: "Qui suis-je", href: "#quisuije" },
    { name: "Histoire", href: "#histoire" },
    { name: "Caractéristiques", href: "#caracteristiques" },
    { name: "Objectifs", href: "#objectifs" },
  ];

  return (
    <footer className="relative bg-[#000000] text-sand-200 py-6 sm:py-8 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="sand-texture w-full h-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
          {/* Logo et Description */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 group text-center sm:text-left"
          >
            {/* Logo animé avec effets avancés */}
            <motion.div
              className="relative"
              whileHover={
                prefersReducedMotion || isLowPerfDevice
                  ? {}
                  : {
                      scale: 1.1,
                      rotate: 5,
                    }
              }
              transition={{ duration: 0.3 }}
            >
              {/* Effet de glow derrière le logo */}
              <motion.div
                className="absolute inset-0 rounded-full bg-rougePerso/20 blur-md"
                animate={
                  prefersReducedMotion || isLowPerfDevice
                    ? {}
                    : {
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Logo principal avec rotation continue */}
              <motion.div
                animate={
                  prefersReducedMotion || isLowPerfDevice
                    ? {}
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative z-10"
              >
                <Image
                  src="/img/story/symbole.png"
                  alt="Logo Suna"
                  width={40}
                  height={40}
                  className="drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(11%) sepia(89%) saturate(6391%) hue-rotate(22deg) brightness(85%) contrast(130%)",
                  }}
                />
              </motion.div>

              {/* Particules autour du logo */}
              {!prefersReducedMotion && !isLowPerfDevice && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-rougePerso rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        transformOrigin: "0 0",
                      }}
                      animate={{
                        rotate: [0, 360],
                        x: [0, 30 * Math.cos((i * 60 * Math.PI) / 180)],
                        y: [0, 30 * Math.sin((i * 60 * Math.PI) / 180)],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            <motion.p
              className="text-sand-300 text-xs sm:text-sm group-hover:text-sand-100 transition-colors duration-300 max-w-xs sm:max-w-none"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Découvrez l&apos;histoire de Raiga Inuzuka, ninja de Konoha
            </motion.p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sand-300 hover:text-sand-100 transition-colors text-xs sm:text-sm footer-link"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sand-400 text-xs sm:text-sm"
          >
            © {currentYear} Raiga Inuzuka
          </motion.div>
        </div>

        {/* Séparateur avec symbole animé */}
        <motion.div
          className="flex items-center justify-center my-6 sm:my-8"
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "auto" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-rougePerso/30 to-transparent w-full max-w-[120px]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          />

          <motion.div
            className="mx-2 sm:mx-4 relative"
            animate={
              prefersReducedMotion || isLowPerfDevice
                ? {}
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-rougePerso/20 blur-sm"
              animate={
                prefersReducedMotion || isLowPerfDevice
                  ? {}
                  : {
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <Image
              src="/img/story/symbole.png"
              alt="Séparateur"
              width={16}
              height={16}
              className="relative z-10 drop-shadow-md w-4 h-4 sm:w-5 sm:h-5"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(11%) sepia(89%) saturate(6391%) hue-rotate(22deg) brightness(85%) contrast(130%)",
              }}
            />
          </motion.div>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-rougePerso/30 to-transparent w-full max-w-[120px]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </motion.div>

        {/* Crédits avec animation */}
        <motion.div
          className="text-center text-sand-400 text-xs relative z-10 px-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.p
            className="hover:text-rougePerso/70 transition-colors duration-300 cursor-default"
            whileHover={
              prefersReducedMotion || isLowPerfDevice
                ? {}
                : {
                    scale: 1.05,
                  }
            }
          >
            Un projet fan-made dédié à l&apos;univers de Naruto
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
