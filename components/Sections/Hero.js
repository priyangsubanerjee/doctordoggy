/* eslint-disable @next/next/no-img-element */
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="md:flex pt-10 bg-[#0d1121]">
      <div className="md:w-1/2 flex flex-col px-6 md:pl-16 lg:pl-28 justify-center">
        <div className="border border-dashed flex items-center space-x-2 border-red-500/30 py-2 rounded-full px-3 w-fit text-xs md:text-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/512/726/726476.png"
            className="h-5"
            alt=""
          />
          <span className="font-poppins text-sm text-white/80">
            Flat 70% Off on pet care & grooming.
          </span>
        </div>
        <div className="relative mt-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
            className="absolute -top-12 -right-2 lg:top-7 lg:-right-0 h-12 lg:h-16"
            alt=""
          />
          <img
            src="/arrow.png"
            className="absolute -bottom-[35%] -left-[15%] h-16 rotate-45 hidden md:block"
            alt=""
          />
          <div className="h-44 w-44 bg-pink-300 rounded-full absolute -top-28 -left-20 z-0 blur-3xl opacity-30"></div>
          <div className="h-44 w-44 bg-sky-300 rounded-full absolute -bottom-60 -right-20 z-0 blur-3xl opacity-50"></div>
          <h1 className="text-[40px] z-20 md:text-5xl lg:text-6xl font-bold font-jost leading-[1.3] lg:leading-[1.2] text-white">
            Your one-stop <br /> pet care solution
          </h1>
        </div>
        <p className="mt-6 text-sm text-slate-300 leading-7">
          Treat your pets with dedicated care from our team of specially trained
          and highly experienced professionals. At Doctor Doggy, we guarantee
          top-notch treatment for your beloved non-human family members, even in
          your absence. Choose from a diverse array of services that we offer.
        </p>
        <div className="mt-10 mb-10 space-y-4 space-x-0 lg:space-y-0 lg:flex lg:items-center lg:space-x-5 text-base lg:text-base">
          <Link href="/bookings/schedule">
            <button className="h-14 w-full lg:w-fit px-10 border border-transparent bg-white hover:bg-white/60 text-black rounded-md transition-all">
              Book a service
            </button>
          </Link>
          <button
            onClick={async () => {
              await signIn("google");
            }}
            className="h-14 w-full lg:w-fit px-10 border border-white/70 text-slate-100 rounded-md bg-transparent hover:bg-white/5 transition-all"
          >
            Digitalize pet records
          </button>
        </div>
      </div>
      <div className="md:w-1/2 relative mt-10 lg:mt-0">
        <img
          src="https://www.petpartners.com/media/5taozbtj/ppi-group-hero-1.png"
          alt=""
        />
        <div className="flex py-3 hover:scale-105  w-[85%] lg:w-[50%] px-3 -translate-x-1/2 absolute translate-y-[30%] bottom-0 left-1/2 rounded-md bg-white shadow-2xl shadow-teal-600/20 transition-all hover:shadow-2xl hover:shadow-sky-300/0">
          <div className="h-28 w-24 shrink-0 bg-neutral-200 rounded-md overflow-hidden">
            <img
              src="https://s28489.pcdn.co/wp-content/uploads/2023/02/dog_trainer.jpg.optimal.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="ml-5 mr-4">
            <h3 className="text-[10px] font-bold text-neutral-400 tracking-[1.4px]">
              TOP ARTICLE FOR YOU
            </h3>
            <h2 className="font-medium mt-1 leading-5 text-sm">
              Teach your dog to fetch in 5 easy steps.
            </h2>
            <p className="text-xs mt-1 line-clamp-2 leading-5 text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eum
              et beatae repellendus facilis molestiae, suscipit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
