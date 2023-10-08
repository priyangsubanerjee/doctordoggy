/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import HeroSection from "@/components/Fragments/HeroSection";
import Services from "@/components/Fragments/Services";
import StepsToEnjoy from "@/components/Fragments/StepsToEnjoy";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <nav className="h-12 z-10 px-44 lg:h-14 flex items-center justify-between fixed top-0 inset-x-0 bg-white/50 backdrop-blur-xl">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/676/676291.png"
            className="h-7"
            alt=""
          />
        </div>
        <ul className="flex items-center space-x-14 text-sm">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Parenting</li>
          <li>Vaccination</li>
          <li>Appointments</li>
        </ul>
        <div className="flex items-center">
          <Icon height={25} icon="codicon:account" />
        </div>
      </nav>
      <HeroSection />
      <Services />
      <StepsToEnjoy />
    </main>
  );
}
