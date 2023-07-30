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
          <div className="relative h-fit w-[60%]">
            <img
              src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1690698833/Personal/Frame_1_z1zucl.png"
              alt=""
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl lg:text-6xl lg:leading-[1.4] leading-[1.7] font-semibold mt-6 font-popins">
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

      <div className="px-6 lg:px-[100px] py-10 lg:py-28 bg-neutral-100">
        <p className="font-medium tracking-wider text-xs">WHY CHOOSE US?</p>
        <h2 className="text-2xl font-medium font-popins mt-10">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 w-full gap-4">
          <div className="h-32 bg-white flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2171/2171990.png"
              alt=""
              className="h-16"
            />
          </div>
          <div className="h-32 bg-white flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2171/2171990.png"
              alt=""
              className="h-16"
            />
          </div>{" "}
          <div className="h-32 bg-white flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2171/2171990.png"
              alt=""
              className="h-16"
            />
          </div>{" "}
          <div className="h-32 bg-white flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2171/2171990.png"
              alt=""
              className="h-16"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
