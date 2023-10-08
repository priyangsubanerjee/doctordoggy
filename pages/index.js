/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import HeroSection from "@/components/Fragments/HeroSection";
import Services from "@/components/Fragments/Services";
import StepsToEnjoy from "@/components/Fragments/StepsToEnjoy";
import Founders from "@/components/Fragments/Founders";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Services />
      <StepsToEnjoy />
      <Founders />
    </main>
  );
}
