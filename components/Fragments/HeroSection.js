/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React from "react";

function HeroSection() {
  const featuresList = [
    {
      title: "Pet's profile",
      icon: "https://cdn-icons-png.flaticon.com/512/2437/2437791.png",
      link: "Register pet",
    },
    {
      title: "Vaccination",
      icon: "https://cdn-icons-png.flaticon.com/512/6064/6064468.png",
      link: "Schedule now",
    },
    {
      title: "Prescriptions",
      icon: "https://cdn-icons-png.flaticon.com/512/843/843435.png",
      link: "Upload now",
    },
    {
      title: "Appointments",
      icon: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
      link: "Schedule now",
    },
    {
      title: "Deworming",
      icon: "https://cdn-icons-png.flaticon.com/512/1984/1984420.png",
      link: "Schedule now",
    },
    {
      title: "Pathology",
      icon: "https://cdn-icons-png.flaticon.com/512/4468/4468662.png",
      link: "Upload now",
    },
  ];

  const FeatureCard = ({ title, icon, link, index }) => {
    return (
      <div className={`flex w-full flex-col items-center justify-center p-3`}>
        <img src={icon} alt="" className="h-12" />
        <p className="text-xl font-semibold mt-5">{title}</p>
        <button className="flex items-center text-blue-600 space-x-2 text-sm mt-2">
          <span>{link}</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="h-[400px] md:h-[500px] lg:h-[600px]">
        <img
          src="https://images7.alphacoders.com/126/1269810.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="py-20">
        <h1 className="text-4xl lg:text-5xl font-semibold text-center">
          One Stop Solution
        </h1>
        <p className="text-center mt-6 text-lg lg:text-xl font-light">
          For all your parenting needs
        </p>
        <div className="mt-16 lg:mt-20 grid gap-y-9 lg:gap-y-16 grid-cols-2 md:grid-cols-3 lg:max-w-3xl place-content-center place-items-center mx-6 lg:mx-auto">
          {featuresList.map((feature, i) => (
            <FeatureCard {...feature} key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
