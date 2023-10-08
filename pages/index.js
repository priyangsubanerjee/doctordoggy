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
      <nav className="fixed top-0 inset-x-0 z-20">
        <div className="h-12 px-6 lg:px-44 lg:h-14 flex items-center justify-between bg-white/50 backdrop-blur-xl">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/676/676291.png"
              className="h-7"
              alt=""
            />
          </div>
          <ul className="hidden lg:flex items-center space-x-14 text-sm">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Parenting</li>
            <li>Vaccination</li>
            <li>Appointments</li>
          </ul>
          <div className="flex items-center">
            <button>
              <Icon height={24} icon="codicon:account" />
            </button>
            <button className="ml-5 lg:hidden">
              <Icon height={24} icon="clarity:menu-line" />
            </button>
          </div>
        </div>
        <div className="bg-slate-950 text-sm py-3 text-center text-white font-light">
          Sale starts in 24:00:00
        </div>
      </nav>
      <HeroSection />
      <Services />
      <StepsToEnjoy />
    </main>
  );
}
