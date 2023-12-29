/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function StepsToEnjoy() {
  const stepsList = [
    {
      title: "Choose a service you want to avail.",
      description:
        "Select a service from our diverse array of offerings, ranging from grooming and spa to boarding and veterinary care.",
      image: "https://wallpaperaccess.com/full/340588.png",
    },
    {
      title: "Book your day",
      description:
        "Choose a date and time that is convenient for you and your pet. We will take care of the rest.",
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Have Relax",
      description: "Sit back and relax while we take care of your pet's needs.",
      image:
        "https://images.pexels.com/photos/6985132/pexels-photo-6985132.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985132.jpg&fm=jpg",
    },
  ];

  const StepCard = ({ title, description, image, index }) => {
    return (
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="w-full h-full overflow-hidden rounded-2xl bg-cover bg-no-repeat transform transition-all duration-300 lg:hover:scale-105 z-0"
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent to-black/50 p-8 flex flex-col lg:min-h-[300px] z-0">
          <h1 className="border border-white text-white tracking-wider text-xs w-fit px-3 py-1 rounded-full font-medium">
            STEP {index + 1}
          </h1>
          <p className="text-white text-2xl font-semibold mt-10 lg:mt-16">
            {title}
          </p>
          <p className="text-xs w-full mt-3 lg:mt-4 text-white/70 font-normal leading-5">
            {description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="border-t py-24">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center">
        3 Steps to enjoy your day.
      </h1>
      <p className="text-center text-sm text-neutral-600 mt-3 leading-6 mx-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aliquid
      </p>
      <div className="mt-16 lg:mt-24 grid gap-y-5 gap-x-6 lg:gap-x-6 lg:gap-y-6 grid-cols-1 md:grid-cols-3 lg:max-w-5xl place-content-center place-items-center mx-6 lg:mx-auto">
        {stepsList.map((step, i) => (
          <StepCard {...step} key={i} index={i} />
        ))}
        <div className="md:col-span-3 w-full bg-slate-100 rounded-2xl py-10 px-6 flex flex-col items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3249/3249904.png"
            alt=""
            className="h-10"
          />
          <h1 className="text-xl font-semibold mt-4">Still not sure?</h1>
          <p className="text-sm text-neutral-600 text-center mt-2 leading-6">
            Get a free consultation from our experts and get your doubts
            cleared.
          </p>
          <div className="flex items-center justify-center space-x-5 mt-6">
            <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline">
              <span>Choose a service</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
            <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline">
              <span>Schedule a call</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepsToEnjoy;
