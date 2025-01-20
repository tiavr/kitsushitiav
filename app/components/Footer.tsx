"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Accueil", href: "#" },
    { name: "Qui suis-je", href: "#quisuije" },
    { name: "Histoire", href: "#histoire" },
    { name: "Caractéristiques", href: "#caracteristiques" },
    { name: "Objectifs", href: "#objectifs" },
  ];

  return (
    <footer className="relative bg-[#2A1810] text-sand-200 py-8 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="sand-texture w-full h-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Logo et Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Image
              src="/img/story/symbole.png"
              alt="Logo Suna"
              width={40}
              height={40}
              className="opacity-80"
            />
            <p className="text-sand-300 text-sm">
              Découvrez l&apos;histoire de Ryuma Satsu, ninja de Suna
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ul className="flex flex-wrap justify-center gap-8">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sand-300 hover:text-sand-100 transition-colors text-sm footer-link"
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
            className="text-sand-400 text-sm"
          >
            © {currentYear} Ryuma Satsu
          </motion.div>
        </div>

        {/* Séparateur avec symbole */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-sand-800/30 w-full max-w-[80px]" />
          <Image
            src="/img/story/symbole.png"
            alt="Séparateur"
            width={16}
            height={16}
            className="mx-3 opacity-20"
          />
          <div className="h-px bg-sand-800/30 w-full max-w-[80px]" />
        </div>

        {/* Crédits */}
        <div className="text-center text-sand-400 text-xs relative z-10">
          <p>Un projet fan-made dédié à l&apos;univers de Naruto</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
