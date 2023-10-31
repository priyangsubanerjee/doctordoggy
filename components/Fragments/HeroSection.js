/* eslint-disable @next/next/no-img-element */
import quickNavOptions from "@/static/quick-navigaion";
import { Icon } from "@iconify/react";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

// TODO: Make the search bar functional
// TODO: Migrate all the static data to static.js file
// TODO: Migrate all the images to Cloudinary

function HeroSection() {
  const session = useSession();
  const [pets, setPets] = React.useState([]);

  useEffect(() => {
    if (session?.data?.user?.email) {
      axios
        .post(
          `/api/pet/get`,
          {
            email: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setPets(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session.status]);

  const FeatureCard = ({ title, icon, buttonText, index, href }) => {
    return (
      <Link href={href || "/"}>
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
      </Link>
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
      {pets.length > 0 && (
        <div className="w-fit mx-auto rounded-full border relative px-3 mt-8">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-white">
            ❤️
          </span>
          <div className="py-3 flex items-center justify-center space-x-2">
            {pets.length > 0 &&
              pets.map((pet, i) => (
                <Avatar key={i} src={pet.image} size="lg" />
              ))}
          </div>
        </div>
      )}
      <div className="py-10 lg:py-20 lg:-mt-8">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center">
          One Stop Solution
        </h1>
        <p className="text-center mt-4 lg:mt-6 text-base lg:text-xl font-light">
          For all your parenting needs
        </p>
        <div className="mt-16 lg:mt-20 grid gap-y-9 lg:gap-y-16 grid-cols-2 md:grid-cols-3 lg:max-w-3xl place-content-center place-items-center mx-0 lg:mx-auto">
          {quickNavOptions.map((feature, i) => (
            <FeatureCard {...feature} key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
