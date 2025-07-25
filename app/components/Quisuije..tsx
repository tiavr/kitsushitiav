"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";

const images = [
  {
    src: "/img/Qui-suis-je/Ancien_RP.png",
    alt: "Ancien RP",
  },
  {
    src: "/img/Qui-suis-je/Presentaiton_RP.png",
    alt: "Présentation RP",
  },
];

const Quisuije = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    threshold: 0.1,
    once: false,
    rootMargin: "-50px 0px -10% 0px",
  });

  // Gestion des transitions d'index d'image
  const handleIndexChange = (direction: "next" | "prev") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "next") {
        return (prevIndex + 1) % images.length;
      } else {
        return (prevIndex - 1 + images.length) % images.length;
      }
    });
  };

  // Variantes d'animation avec des transitions plus douces
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const controlsVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut", delay: 0.15 },
    },
  };

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen bg-[#000000] py-10 sm:py-16 md:py-20 overflow-hidden"
      id="quisuije"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />

      <motion.div
        className="container mx-auto px-4 sm:px-6 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={titleVariants}
          className="text-3xl sm:text-4xl md:text-5xl text-rougePerso font-bold text-center mb-8 sm:mb-10 md:mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          Qui suis-je ?
        </motion.h2>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            variants={imageVariants}
            className="relative aspect-video rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg "
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
            />
          </motion.div>

          <motion.div
            variants={controlsVariants}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <button
              onClick={() => handleIndexChange("prev")}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-sm
                       transition-all duration-300 shadow-lg border border-rougePerso/15
                       flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-rougePerso group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <span className="text-rougePerso  group-hover:text-white transition-colors font-medium text-sm sm:text-base">
                Précédent
              </span>
            </button>

            <div className="flex justify-center gap-2 sm:gap-3 order-first sm:order-none">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-rougePerso scale-125"
                      : "bg-rougePerso/30 hover:bg-rougePerso/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleIndexChange("next")}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-sm
                       transition-all duration-300 shadow-lg border border-rougePerso/15
                       flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <span className="text-rougePerso group-hover:text-white transition-colors font-medium text-sm sm:text-base">
                Suivant
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-rougePerso group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Quisuije;
