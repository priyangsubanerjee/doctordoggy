/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function StepsToEnjoy() {
  return (
    <div className="border-t py-24">
      <h1 className="text-xl lg:text-4xl font-semibold text-center">
        3 Steps to enjoy your day.
      </h1>
      <p className="text-center text-sm text-neutral-600 mt-3 leading-6 mx-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aliquid
      </p>
      <div className="mt-16 lg:mt-24 grid gap-y-5 gap-x-6 lg:gap-x-6 lg:gap-y-16 grid-cols-1 md:grid-cols-3 lg:max-w-5xl place-content-center place-items-center mx-6 lg:mx-auto">
        <div className="w-full overflow-hidden rounded-2xl bg-[url('https://wallpaperaccess.com/full/340588.png')] bg-cover bg-no-repeat">
          <div className="h-full w-full bg-gradient-to-b from-transparent to-black/50 p-8 flex flex-col justify-end">
            <h3 className="border border-white text-white tracking-wider text-xs w-fit px-3 py-1 rounded-full font-medium">
              STEP 1
            </h3>
            <p className="text-white text-2xl font-semibold mt-16">
              Choose a service you want to avail.
            </p>
            <p className="text-xs w-full mt-4 text-white/70 font-normal leading-5">
              Select a service from our diverse array of offerings, ranging from
              grooming and spa to boarding and veterinary care.
            </p>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-2xl bg-[url('https://slidescorner.com/wp-content/uploads/2022/08/01-free-background-image-ppt-google-slides.jpg')]  bg-cover bg-no-repeat">
          <div className="h-full w-full bg-gradient-to-b from-transparent to-black/50 p-8 flex flex-col justify-end">
            <h3 className="border border-white text-white tracking-wider text-xs w-fit px-3 py-1 rounded-full font-medium">
              STEP 1
            </h3>
            <p className="text-white text-2xl font-semibold mt-16">
              Choose a service you want to avail.
            </p>
            <p className="text-xs w-full mt-4 text-white/70 font-normal leading-5">
              Select a service from our diverse array of offerings, ranging from
              grooming and spa to boarding and veterinary care.
            </p>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-2xl bg-[url('https://images.pexels.com/photos/6985132/pexels-photo-6985132.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985132.jpg&fm=jpg')] bg-cover bg-no-repeat">
          <div className="h-full w-full bg-gradient-to-b from-transparent to-black/50 p-8 flex flex-col justify-end">
            <h3 className="border border-white text-white tracking-wider text-xs w-fit px-3 py-1 rounded-full font-medium">
              STEP 1
            </h3>
            <p className="text-white text-2xl font-semibold mt-16">
              Choose a service you want to avail.
            </p>
            <p className="text-xs w-full mt-4 text-white/70 font-normal leading-5">
              Select a service from our diverse array of offerings, ranging from
              grooming and spa to boarding and veterinary care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepsToEnjoy;
