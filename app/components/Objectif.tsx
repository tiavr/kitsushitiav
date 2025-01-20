"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Section } from "../components/Section";
import { useInView } from "../hooks/useInView";

// Types
interface ObjectifData {
  title: string;
  content: string;
}

// Constants
const objectifsClan: ObjectifData[] = [
  {
    title: "Eveiller ses Yomegan",
    content:
      "Par peur d'être abandonné une seconde fois, Ryuma fera tout ce qui est en son pouvoir afin d'eveiller ses Yomegan. Il réalisera le rite autant de fois qu'il le peut si nécessaire. Il souhaite réellement prouver à son père qu'il sera utile au clan en tant que guerrier.",
  },
  {
    title: "Corpus secret",
    content:
      "Ryuma souhaitera garder des traces écrites de l'histoire du clan Satsu tel qu'il le connait. Suite à cette amnésie et cette perte d'identité temporaire que ses ancêtres ont subit, il juge nécessaire d'archiver dans un document secret l'histoire de son clan. En réalité, il s'agit d'un prétexte pour référencer tout ce qu'il connait du clan et avoir un moyen de pression supplémentaire si jamais le clan venait à le trahir une seconde fois.",
  },
  {
    title: "Dojo Satsu",
    content:
      "Le dojo Satsu accueillera les ninjas souhaitant apprendre l'art du forgeron ou l'art de l'assassinat. Ils pourront se spécialiser dans ces deux disciplines et les meilleurs peuvent espérer intégrer la forge, ou une garde spéciale d'assassins. Il s'agit également un moyen pour Ryuma de repérer des potentiels pions pour son échiquier.",
  },
  {
    title: "Assurer la perennité de la forge",
    content:
      "La forge est une institution importante pour le clan mais également pour le village. Ryuma essaiera de populariser la forge et faire tourner l'économie du village grâce à elle. De plus, il souhaite placer la forge comme étant une institution dont le village en sera énormément dépendant au niveau de l'armement. Ce qui rendra le village redevable au clan Satsu, et ce dernier gagnera de la reconnaissance et de l'importance au sein de Suna.",
  },
  {
    title: "Asseoir son autorité",
    content:
      "Ryuma utilisera la désinformation et la manipulation de l'opinion publique pour ternir la réputation du clan Fûma et donc éteindre toute rivalité entre les deux clans.  Il organisera des missions de traques et d'assassinat en compétition avec le clan Fûma, afin d'entrainer les membres du clan Satsu à garder leurs sens aiguisés. Cette domination sur les Fûma pourra assouvir, en partie, la haine de Ryuma envers ce clan.",
  },
  {
    title: "Système de missions",
    content:
      "Mise en place d'un système pour contacter le clan afin de réaliser des missions de type tueur à gage.",
  },
  {
    title: "Relations Sabaku",
    content:
      "Ryuma souhaite entretenir une relation étroite avec les Sabaku en les soutenant dans leurs projets. Ce comportement montre la gratitude qu'il a envers ce clan au vu de la main salvatrice que les Sabaku ont tendu au ancetres de Ryuma. Ce soutien pourrait apporter des bienfaits aux Satsu à l'avenir. Par exemple, il pourrait utiliser la régence du clan afin de promouvoir la forge.",
  },

  {
    title: "Relations entre les clans",
    content:
      "Ryuma fera en sorte d'étudier les relations entre les clans. Le but final est de faire prospérer le clan, en protégeant les intérêts du clan, en réunissant les membres de son clan, en essayant de rendre le clan soudé et fort et en affirmant sa position au sein du village. Cela se fera en étudiant les liens entre les différents clans car ils sont les piliers du village. En organisant des réunions, en débattant, en exposant nos points de vue. En réalité, il s’agit également d’un plan qui utilise la neutralité du clan Satsu afin de gagner de la reconnaissance auprès des autres clans, et se servir de cette notoriété pour la mettre au profit des Sabaku en échange d'un soutien de leur part au sein du village.",
  },
];

const objectifsPersonnels: ObjectifData[] = [
  {
    title: "Aiguiser sa lame",
    content:
      "Ryuma continuera de s'entrainer sans relâche afin d'aiguiser sa lame d'assassin et de guerrier. De plus, il développera ses compétences en kenjutsu qui lui serviront pour affiner son apprentissage dans l'art de l'assassinat. Il fera en sorte de se démarquer des autres dans ces domaines afin de graver son nom dans l'histoire comme étant un grand manieur de sabre, et un assassin redouté du monde ninja.",
  },
  {
    title: "Forgeron hors pair",
    content:
      "Ryuma poursuivra son entrainement auprès de son père en tant que Forgeron. Etre un guerrier ne suffit pas, il doit également prouver sa valeur et contribuer à la forge du clan.",
  },
  {
    title: "Maîtriser le Fuinjutsu",
    content:
      "Ryuma tâchera de trouver un maitre afin d'apprendre le fuinjutsu. Cette technique lui permettra de sceller les secrets du clan, ou bien les multitudes d'armes qui seront forgées par le clan afin d'éviter qu'ils tombent entre de mauvaises mains.",
  },
  {
    title: "Rejoindre la Keisatsu",
    content:
      "Ryuma fera en sorte d'être stagiaire au sein de la Keisatsu le plus rapidement possible. La Keisatsu lui permet d'être au coeur de nombreux évenements au sein du village ce qui lui permettra de récolter beaucoup d'informations qui lui serviront à l'avenir, des informations qu'il pourrait manipuler.",
  },
  {
    title: "Créer un réel lien familial",
    content:
      "Bien que Ryuma soit encore confus de la raison de son abandon. Il cherchera à comprendre et assimiler la mentalité de son père afin de mieux cerner les raisons de son abandon. Le côté soucieux de Ryuma l'oblige à parfois se remettre en question. De par l'éducation du père et du lien qu'ils vont créer, il aimerait retrouver les valeurs de Suna et mettre de côté les mauvaises habitudes qu'il a commencé a developper lors de son enfance au pays du Son. Au fond de de lui, il possède l'envie d'appartenir au village et oublier les événements du passé. En plus de cela, il souhaiterait renouer avec les autres membres du clan qu'il n'a pas vu depuis plusieurs années, son caractère actuel lui fera parfois défaut, mais il essaiera de faire des efforts.",
  },
  {
    title: "Révolutionner les lois et sanctions de la Keisatsu",
    content:
      "Le système et les lois d'un village peuvent changer au fur et à mesure de l'évolution de ses habitants. Ryuma souhaite donc effectuer de la recherche, et partir en reconnaissance dans les autres pays afin d'étudier leur section policière et leur système de loi. Il pense qu'il pourrait potentiellement s'inspirer afin d'améliorer le système de Suna et garantir la sécurité et la perennité du village. L'une des raisons principales de l'apprentissage du Fuinjutsu pour Ryuma, est d'intégrer cette pratique dans les sanctions du village. Pour Ryuma, ce genre de sanctions peut-être bénéfique pour empecher le recidivisme et montrer le bon exemple. Bien evidemment, ces sanctions seront adaptés aux infractions commises. Comme vous pouvez le comprendre, le fuinjutsu permettra de placer différents types de sceaux sur l'individu en fonction de la nature de sa sanction.",
  },
  {
    title: "Rallier un clan mineur à sa cause",
    content:
      "Ryuma est conscient que les sans clans sont également des piliers au sein du village et que leur voix compte étant donné qu'ils constituent la majorité des ninjas du village. La politique est très importante. Afin d'affirmer sa position il est nécessaire d'avoir des alliés fidèles. Il essaiera de rallier à sa cause un clan mineur ayant des intérêt communs avec lui, et les contrôler. Sur le long terme, il essaiera de placer des membres de ce clan sur des postes intéressants au sein village et manipuler l'opinion publique en sa faveur et en faveur du clan.",
  },
  {
    title: "Composer son échiquier",
    content:
      "Ryuma est calculateur. Pour lui le monde n'est qu'un géant échiquier ayant besoin d'un joueur sachant bouger les bonnes pièces. Il tâchera de trouver ses pièces au sein du village, ou hors du village. Des pièces qu'il pourrait contrôler, influencer, ou guider. Un roi respecté du peuple qu'il utilisera pour mettre en avant ses idées et son clan. Une reine possédant des passe-droits pouvant trancher sur des décisions importantes et inverser la balance. Une tour et un fou pouvant naviguer librement et partir en reconnaissance apportant des informations cruciales. Un cavalier loyal mais libre comme un éléctron qui pourrait jouer double-jeu en faveur de Ryuma. Et des pions qui serviront à exécuter des tâches ingrates mais nécessaires pour que Ryuma, son clan et le village prospèrent, les pions seront les pièces les plus importantes pour mettre en place la base de l'échiquier.",
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
      left: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
      right:
        "linear-gradient(to left, transparent, black 30%, black 70%, transparent)",
    },
  },
  button: {
    base: "w-full text-left p-4 rounded-xl transition-all backdrop-blur-sm",
    selected:
      "bg-sand-200/90 text-[#1a0f0a] shadow-[0_0_15px_rgba(224,189,127,0.3)]",
    default:
      "bg-[#1a0f0a]/80 text-sand-200 hover:bg-[#1a0f0a]/90 hover:shadow-[0_0_10px_rgba(224,189,127,0.1)]",
  },
};

// Custom Hook
const useObjectifState = () => {
  const [activeTab, setActiveTab] = useState<"clan" | "personnels">("clan");
  const [selectedObjectif, setSelectedObjectif] = useState<ObjectifData>(
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

// Components
const BackgroundImage = ({ side }: { side: "left" | "right" }) => (
  <motion.div
    className={`absolute ${side}-0 top-0 h-full w-[40vw] overflow-hidden`}
    variants={animations.background[side]}
    initial="hidden"
    animate="visible"
    exit="exit"
    key={`background-${side}`}
  >
    <motion.div
      className="absolute inset-0 blur-[100px] opacity-30"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.4, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/img/Objectif/Face.png"
        alt={`Gaara ${side}`}
        fill
        className="object-cover scale-110"
        style={{
          filter: "grayscale(100%) brightness(0.1)",
          transform: side === "left" ? "scaleX(-1)" : "none",
        }}
      />
    </motion.div>
    <div className={styles.backgroundImage.base}>
      <Image
        src="/img/Objectif/Face.png"
        alt={`Gaara ${side}`}
        fill
        className="object-cover"
        style={{
          objectPosition: "50% 50%",
          maskImage: styles.backgroundImage.mask[side],
          WebkitMaskImage: styles.backgroundImage.mask[side],
          transform: side === "left" ? "scaleX(-1)" : "none",
        }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-${
          side === "left" ? "r" : "l"
        } from-[#1a0f0a] via-transparent to-transparent opacity-90`}
      />
    </div>
  </motion.div>
);

const ObjectifDescription = ({
  content,
  isVisible,
  type,
}: {
  content: string;
  isVisible: boolean;
  type: "clan" | "personnels";
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, {
    threshold: 0.1,
    once: false,
    rootMargin: "0px",
  });

  const iconSrc =
    type === "clan" ? "/img/Objectif/icon-clan.png" : "/img/Objectif/icon.png";

  return (
    <motion.div
      ref={contentRef}
      variants={animations.content}
      initial="hidden"
      animate={isVisible && isContentInView ? "visible" : "hidden"}
      className="flex flex-col items-center gap-8"
    >
      <p className="text-sand-300 leading-relaxed text-lg w-full">{content}</p>
      <motion.div
        className="flex-shrink-0 w-40 h-40"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={iconSrc}
          alt="Objectif icon"
          width={160}
          height={160}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

const ObjectifTitle = ({ title }: { title: string }) => (
  <h3
    className="text-3xl font-bold text-sand-200 mb-8"
    style={{ fontFamily: "Edo" }}
  >
    {title}
  </h3>
);

const ObjectifButton = ({
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isButtonInView = useInView(buttonRef, {
    threshold: 0.1,
    once: false,
    rootMargin: "0px",
  });

  return (
    <motion.button
      ref={buttonRef}
      variants={animations.button}
      initial="hidden"
      animate={isButtonInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${styles.button.base} ${
        isSelected ? styles.button.selected : styles.button.default
      }`}
    >
      <span className="font-bold" style={{ fontFamily: "Edo" }}>
        {title}
      </span>
    </motion.button>
  );
};

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
        className="relative min-h-screen bg-[#1a0f0a] py-20 overflow-hidden geist-font"
        id="objectifs"
      >
        <motion.div
          className="absolute inset-0 bg-radial-vignette pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSectionInView ? 1 : 0 }}
          transition={{ duration: 1 }}
        />

        <AnimatePresence mode="wait">
          {isSectionInView && (
            <>
              <BackgroundImage key="background-left" side="left" />
              <BackgroundImage key="background-right" side="right" />
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="container mx-auto px-6 relative z-20"
          variants={animations.container}
        >
          <motion.h2
            variants={animations.title}
            className="text-5xl font-bold text-sand-200 text-center mb-12"
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
                      ? "bg-sand-200 text-[#2A1810] shadow-lg scale-105"
                      : "bg-[#2A1810]/30 text-sand-200 hover:bg-[#2A1810]/50"
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
                    className="bg-[#1a0f0a]/90 backdrop-blur-sm rounded-2xl p-8 h-full
                             shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-sand-200/10"
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
