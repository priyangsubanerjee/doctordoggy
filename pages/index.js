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

// DONE: redirect url from delete operation
// TODO: redirect url from upload page
// TODO: pet profile from record card
// TODO: remove unused console logs

//

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
