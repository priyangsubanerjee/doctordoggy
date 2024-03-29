/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import HeroSection from "@/components/Fragments/HeroSection";
import Services from "@/components/Fragments/Services";
import StepsToEnjoy from "@/components/Fragments/StepsToEnjoy";
import Founders from "@/components/Fragments/Founders";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// DONE: redirect url from delete operation
// TODO: redirect url from upload page
// TODO: pet profile from record card
// TODO: remove unused console logs

//

export default function Home() {
  return (
    <main>
      <Head>
        <title>Doctor Doggy | Home</title>
        <meta
          name="description"
          content="Dr. Doggy, your all-in-one pet care app, keeps your furry friend happy and healthy by offering secure digital pet records, convenient online vet consultations, and booking for pet care services like pet sitting and dog walking. Plus, you'll receive timely notifications to ensure you never miss a vaccination or checkup again!"
        />
      </Head>
      <HeroSection />
      <Services />
      <StepsToEnjoy />
      <Founders />
    </main>
  );
}
