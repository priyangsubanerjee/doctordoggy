/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React from "react";

// TODO: Make the search bar functional
// TODO: Migrate all the static data to static.js file
// TODO: Migrate all the images to Cloudinary

function HeroSection() {
  const featuresList = [
    {
      title: "Pet's profile",
      icon: "https://cdn-icons-png.flaticon.com/512/2437/2437791.png",
      buttonText: "Register pet",
    },
    {
      title: "Vaccination",
      icon: "https://cdn-icons-png.flaticon.com/512/6064/6064468.png",
      buttonText: "Schedule now",
    },
    {
      title: "Prescriptions",
      icon: "https://cdn-icons-png.flaticon.com/512/843/843435.png",
      buttonText: "Upload now",
    },
    {
      title: "Appointments",
      icon: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
      buttonText: "Schedule now",
    },
    {
      title: "Deworming",
      icon: "https://cdn-icons-png.flaticon.com/512/1984/1984420.png",
      buttonText: "Schedule now",
    },
    {
      title: "Pathology",
      icon: "https://cdn-icons-png.flaticon.com/512/4468/4468662.png",
      buttonText: "Upload now",
    },
  ];

  const FeatureCard = ({ title, icon, buttonText, index }) => {
    return (
      <div className={`flex w-full flex-col items-center justify-center p-3`}>
        <img src={icon} alt="" className="h-12" />
        <p className="text-base lg:text-xl font-semibold mt-5">{title}</p>
        <button className="flex items-center text-blue-600 space-x-2 text-sm mt-2 hover:underline">
          <span>{buttonText}</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="h-[250px] md:h-[500px] lg:h-[500px] relative">
        <img
          src="https://images7.alphacoders.com/126/1269810.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 z-10 lg:pb-20 flex items-center lg:items-end justify-center bg-gradient-to-b from-transparent to-black/50">
          <div className="h-12 lg:h-16 bg-white border w-[93%] lg:w-[60%] rounded-md flex items-center overflow-hidden">
            <input
              type="text"
              className="h-full px-6 lg:px-12 lg:text-lg w-full outline-none"
              placeholder="Search for a service or a product"
              name=""
              id=""
            />
            <button className="shrink-0 px-5 lg:px-10 bg-slate-100 h-full">
              <Icon icon="iconoir:search" className="text-2xl text-gray-900" />
            </button>
          </div>
        </div>
      </div>
      <div className="py-10 lg:py-20">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center">
          One Stop Solution
        </h1>
        <p className="text-center mt-4 lg:mt-6 text-base lg:text-xl font-light">
          For all your parenting needs
        </p>
        <div className="mt-16 lg:mt-20 grid gap-y-9 lg:gap-y-16 grid-cols-2 md:grid-cols-3 lg:max-w-3xl place-content-center place-items-center mx-0 lg:mx-auto">
          {featuresList.map((feature, i) => (
            <FeatureCard {...feature} key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
