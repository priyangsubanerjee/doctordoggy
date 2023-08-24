/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";

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
  const [currentCard, setCurrentCard] = useState(0);
  useEffect(() => {
    let i = 0;
    const carouselCards = document.querySelectorAll(".carouselCard");
    setInterval(() => {
      if (i == 0) {
        carouselCards[0].style.transform = "translateX(-100%)";
        carouselCards[1].style.transform = "translateX(-100%)";
        i = 1;
      } else {
        carouselCards[0].style.transform = "translateX(0%)";
        carouselCards[1].style.transform = "translateX(0%)";
        i = 0;
      }
    }, 7000);
  }, []);
  return (
    <main>
      <div className="w-full h-[500px] lg:h-[670px] lg:p-12">
        <div className="flex h-full w-full bg-red-50 items-center overflow-auto lg:rounded-lg transition-all relative pointer-events-none">
          <div className="carouselCard h-full shrink-0 w-full relative overflow-hidden transition-all duration-700">
            <img
              src="https://images.alphacoders.com/110/1106886.jpg"
              className="h-full w-full object-cover absolute inset-0"
              alt=""
            />
            <div className="h-full w-full bg-gradient-to-r from-black to-transparent absolute inset-0 flex flex-col justify-center px-8 lg:px-20">
              <span className="text-white/70 w-fit rounded-full px-5 py-1 border border-white/50 text-xs tracking-widest font-semibold">
                FEATURED
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white lg:w-1/2 font-popins leading-[1.2] lg:leading-[1.2] mt-8">
                Book a service for your pet now.
              </h1>
              <p className="text-white lg:w-1/2 mt-6 leading-6 lg:leading-[2] text-xs lg:text-sm font-popins">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex items-center mt-10 space-x-4 text-sm">
                <button className="bg-[#F15958] px-6 h-12 text-white rounded-md">
                  Make a reservation
                </button>
                <button className="bg-neutral-800 px-6 h-12 text-white rounded-md">
                  Learn more
                </button>
              </div>
            </div>
          </div>
          <div className="carouselCard h-full shrink-0 w-full relative overflow-hidden transition-all duration-700">
            <img
              src="https://media.istockphoto.com/id/1357774532/photo/dog-at-the-veterinarian.jpg?s=170667a&w=0&k=20&c=0Gxpkd99YeG-FWfM8xDOHOB6_8wiX5AscnfmiCNz-Lo="
              className="h-full w-full object-cover absolute inset-0"
              alt=""
            />
            <div className="h-full w-full bg-gradient-to-r from-black to-transparent absolute inset-0 flex flex-col justify-center px-8 lg:px-20">
              <span className="text-white/70 w-fit rounded-full px-5 py-1 border border-white/50 text-xs tracking-widest font-semibold">
                FEATURED
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white lg:w-1/2 font-popins leading-[1.2] lg:leading-[1.2] mt-8">
                Digitalize your pets medical records.
              </h1>
              <p className="text-white lg:w-1/2 mt-6 leading-6 lg:leading-[2] text-xs lg:text-sm font-popins">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex items-center mt-10 space-x-4 text-sm">
                <button className="bg-[#F15958] px-6 h-12 text-white rounded-md">
                  Get Started For Free
                </button>
                <button className="bg-neutral-800 px-6 h-12 text-white rounded-md">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[100px] py-12 lg:py-28 lg:flex">
        <div className="lg:w-1/2 flex items-center justify-center lg:hidden mb-10">
          <div className="h-fit w-[90%]">
            <img
              src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1690706013/Personal/Frame_2_yfmzoc.png"
              alt=""
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl lg:text-6xl lg:leading-[1.4] leading-[1.7] font-semibold mt-6 font-popins text-neutral-900">
            Digitialize your pet&apos;s health records.
          </h1>
          <div className="mt-3 lg:mt-7 text-neutral-700">
            <p className="leading-7 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              possimus aliquam saepe dolorum placeat consequatur laudantium
              doloremque! Maxime dolorum, neque ipsa, sapiente voluptas tenetur
              voluptatibus ex dolore similique
              <br />
            </p>
            <button
              onClick={() => signIn("google")}
              className="text-sm bg-neutral-100 px-3 py-4 lg:py-4 lg:px-6 text-black rounded flex items-center justify-center space-x-3 mt-10 lg:w-1/2 w-full"
            >
              <iconify-icon height="20" icon="devicon:google"></iconify-icon>
              <span>Get Started</span>
            </button>
          </div>
        </div>
        <div className="hidden lg:w-1/2 lg:flex items-center justify-center">
          <div className="relative h-fit w-[70%]">
            <img
              src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1690698833/Personal/Frame_1_z1zucl.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[100px] py-10 lg:py-28 bg-neutral-50 relative">
        <p className="font-medium tracking-wider text-xs">WHY CHOOSE US?</p>
        <h2 className="text-2xl font-medium font-popins mt-10 leading-[1.6]">
          We are the best in the business. Lorem ipsum dolor sit amet
        </h2>
        <p className="mt-4 text-sm leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          alias similique laboriosam fugiat odit vero nemo libero fugit, unde
          aliquid suscipit cupiditate laborum ipsa perspiciatis ex corporis, a
          minima corrupti eligendi illum ipsum omnis deleniti porro accusantium?
          Quis earum, culpa cum quaerat rem omnis inventore fugiat, beatae hic
          dignissimos eius?
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9784/9784121.png"
          className="absolute top-10 left-0 -translate-x-[45%] h-32 hidden lg:block"
          alt=""
        />

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10711/10711322.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Secure and Reliable
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10061/10061171.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Cloud Storage
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9769/9769561.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Handsfree Visits
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9769/9769705.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Many more
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[100px] py-10 lg:py-28">
        <div className="flex items-center justify-between">
          <p className="font-medium tracking-wider text-xs">WHAT PEOPLE SAY</p>
          <button className="font-semibold tracking-wide88 text-xs text-blue-900">
            WRITE A REVIEW
          </button>
        </div>
        <div className="flex mt-10">
          <div className="lg:w-[500px] bg-neutral-50 rounded p-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
              <div className="ml-4">
                <p className="font-medium">Jane Doe</p>
                <span className="text-[10px]">12 July, 2023</span>
              </div>
            </div>
            <p className="text-xs leading-6 font-light mt-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
              vitae deserunt tenetur qui! Nulla impedit error suscipit harum,
              dolore soluta deserunt atque repudiandae placeat ratione
              reprehenderit velit ipsa tempore expedita.
            </p>
            <div className="mt-4 text-yellow-500 space-x-2">
              {[...Array(5)].map((_, i) => {
                return (
                  <iconify-icon
                    key={i}
                    icon="solar:star-bold-duotone"
                  ></iconify-icon>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
