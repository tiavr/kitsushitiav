"use client";

import Hero from "./components/Hero";
import Header from "./components/Header";
import Story from "./components/Story";
import Cara from "./components/Caracteristique";
import Footer from "./components/Footer";
import Objectif from "./components/Objectif";
import Quisuije from "./components/Quisuije.";
import { Analytics } from "@vercel/analytics/react";
export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Story />
      <Cara />
      <Objectif />
      <Quisuije />
      <Footer />
      <Analytics />
    </div>
  );
}
