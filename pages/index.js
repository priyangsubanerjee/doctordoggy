/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main>
      <Navbar />

      <div className="px-6 lg:px-[100px] py-16 lg:py-28 lg:flex">
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
            Digitialize Your Pet&apos;s Health Records.
          </h1>
          <div className="mt-3 lg:mt-7 text-neutral-700">
            <p className="leading-7 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              possimus aliquam saepe dolorum placeat consequatur laudantium
              doloremque! Maxime dolorum, neque ipsa, sapiente voluptas tenetur
              voluptatibus ex dolore similique
              <br />
            </p>
            <button className="text-sm bg-neutral-100 px-3 py-4 lg:py-4 lg:px-6 text-black rounded flex items-center justify-center space-x-3 mt-10 lg:w-1/2 w-full">
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
