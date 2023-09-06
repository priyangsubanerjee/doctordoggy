/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Marquee from "react-fast-marquee";
import { Icon } from "@iconify/react";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import Hero from "@/components/Sections/Hero";
import ChooseUs from "@/components/Sections/ChooseUs";
import ThreeSteps from "@/components/Sections/ThreeSteps";
import Brands from "@/components/Sections/Brands";
import Founders from "@/components/Sections/Founders";
import Footer from "@/components/Footer";
import Services from "@/components/Sections/Services";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // if redirect is false, then the user is not logged in

  if (context.query.redirect === "false") {
    return {
      props: {
        session,
      },
    };
  }

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <ChooseUs />
      <Services />
      <ThreeSteps />
      <Brands />
      <Founders />
    </main>
  );
}
