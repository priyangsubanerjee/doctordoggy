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
        "https://slidescorner.com/wp-content/uploads/2022/08/01-free-background-image-ppt-google-slides.jpg",
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
        className="w-full overflow-hidden rounded-2xl bg-cover bg-no-repeat transform transition-all duration-300 lg:hover:scale-105 z-0"
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent to-black/50 p-8 flex flex-col lg:min-h-[300px] z-0">
          <h3 className="border border-white text-white tracking-wider text-xs w-fit px-3 py-1 rounded-full font-medium">
            STEP {index + 1}
          </h3>
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
      <div className="mt-16 lg:mt-24 grid gap-y-5 gap-x-6 lg:gap-x-6 lg:gap-y-16 grid-cols-1 md:grid-cols-3 lg:max-w-5xl place-content-center place-items-center mx-6 lg:mx-auto">
        {stepsList.map((step, i) => (
          <StepCard {...step} key={i} index={i} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-16 lg:mt-24">
        <span>Still not sure?</span>
        <button className="flex items-center space-x-2 justify-center ml-2 text-blue-600">
          <span>Get a free consultation</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default StepsToEnjoy;
