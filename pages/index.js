/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import HeroSection from "@/components/Fragments/HeroSection";
import Services from "@/components/Fragments/Services";
import StepsToEnjoy from "@/components/Fragments/StepsToEnjoy";
import Founders from "@/components/Fragments/Founders";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    // ask for notification permission on page load
    // check if browser supports notification

    if ("Notification" in window) {
      console.log("This browser does not support notifications.");
      Notification.requestPermission().then(function (result) {
        console.log(result);
      });
    }

    // if granted then send notification to user

    // if (Notification.permission === "granted") {
    //   navigator.serviceWorker.getRegistration().then(function (reg) {
    //     reg.showNotification("Sheduled vaccination on 10th");
    //   });
    // }
  }, []);
  return (
    <main>
      <HeroSection />
      <Services />
      <StepsToEnjoy />
      <Founders />
    </main>
  );
}
