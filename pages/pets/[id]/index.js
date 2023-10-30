/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPetById } from "@/prisma/pet";
import { Icon } from "@iconify/react";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pet = null;
  if (session) {
    pet = await getPetById(context.params.id);
    pet = await JSON.parse(JSON.stringify(pet));
    if (pet) {
      if (!pet.isPublic) {
        if (pet.parentEmail !== session.user.email) {
          pet = null;
        }
      }
    }
  }
  return {
    props: { session, pet }, // will be passed to the page component as props
  };
}

function PetDashboard({ pet }) {
  const tabOptions = [
    "General",
    "Prescriptions",
    "Vaccinations",
    "Deworming",
    "Pathology",
  ];

  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);

  const Tabs = ({}) => {
    return (
      <>
        <div className="hidden lg:flex items-center justify-center space-x-8 h-16 border-b mt-8">
          {tabOptions.map((tab, index) => {
            return (
              <button
                onClick={() => setSelectedTab(tab)}
                key={index}
                className={`flex items-center justify-center h-full relative px-4 text-sm ${
                  selectedTab == tab ? "text-slate-800" : "text-slate-800/40"
                }`}
              >
                {tab}
                <div
                  className={`absolute inset-x-0 -bottom-[1px] h-[1px] ${
                    selectedTab == tab ? "bg-black" : "bg-black/0"
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
        <div className="flex lg:hidden items-center justify-between px-10 mt-10">
          <button className="text-neutral-500">
            <Icon height={20} icon="uiw:left" />
          </button>
          <p className="text-sm w-fit bg-neutral-100 px-5 py-1 rounded-full text-neutral-700 cursor-pointer">
            {selectedTab}
          </p>
          <button className="text-neutral-500">
            <Icon height={20} icon="uiw:right" />
          </button>
        </div>
      </>
    );
  };

  if (pet != null) {
    return (
      <div>
        <div className="relative">
          <img
            src={pet.image}
            className="h-48 lg:h-72 w-full object-cover blur-3xl opacity-70"
            alt=""
          />
          <img
            src={pet.image}
            className="absolute -bottom-12 lg:-bottom-8 left-1/2 -translate-x-1/2 h-36 lg:h-56 w-36 lg:w-56 rounded-full object-cover"
            alt=""
          />
        </div>
        <h1 className="text-3xl font-semibold text-center mt-20 lg:mt-16">
          {pet.name.split(" ")[0]}&apos;s{" "}
          <span className="opacity-60">
            {pet.sex == "male" ? "Palace" : "Castle"}
          </span>
        </h1>
        <p className="text-center mt-2 text-sm text-neutral-700">
          Goodest boy in the town !
        </p>
        <Tabs />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-3xl font-semibold text-center mt-20 lg:mt-16">
          Profile not found
        </h1>
      </div>
    );
  }
}

export default PetDashboard;
