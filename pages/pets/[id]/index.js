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

  const [tabChooserOpen, setTabChooserOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);

  const TabChooser = ({}) => {
    if (tabChooserOpen) {
      return (
        <div className="fixed inset-0 z-20 bg-black/50 h-full w-full flex items-end">
          <div className="pb-6 bg-white w-full">
            <div className="p-7">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-slate-700">
                  Choose destination
                </h1>
                <button
                  onClick={() => setTabChooserOpen(false)}
                  className="h-7 w-7 rounded-full bg-neutral-100 flex items-center justify-center"
                >
                  <Icon icon="ic:round-close" />
                </button>
              </div>
              <p></p>

              <ul className="mt-6">
                {tabOptions.map((tab, index) => {
                  return (
                    <li key={index} className="mt-3">
                      <button
                        onClick={() => {
                          setSelectedTab(tab);
                          setTabChooserOpen(false);
                        }}
                        key={index}
                        className={`flex items-center justify-center h-full relative py-1 text-sm ${
                          selectedTab == tab
                            ? "text-slate-800"
                            : "text-slate-800/40"
                        }`}
                      >
                        {tab}
                        <div
                          className={`absolute inset-x-0 -bottom-[1px] h-[1px] ${
                            selectedTab == tab ? "bg-black" : "bg-black/0"
                          }`}
                        ></div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  };

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
          <button
            onClick={() => {
              let index = tabOptions.indexOf(selectedTab);
              if (index == 0) {
                index = tabOptions.length - 1;
              } else {
                index--;
              }
              setSelectedTab(tabOptions[index]);
            }}
            className="text-neutral-500"
          >
            <Icon height={20} icon="uiw:left" />
          </button>
          <p
            onClick={() => setTabChooserOpen(true)}
            className="text-sm w-fit bg-neutral-100 px-5 py-1 rounded-full text-neutral-700 cursor-pointer"
          >
            {selectedTab}
          </p>
          <button
            onClick={() => {
              let index = tabOptions.indexOf(selectedTab);
              if (index == tabOptions.length - 1) {
                index = 0;
              } else {
                index++;
              }
              setSelectedTab(tabOptions[index]);
            }}
            className="text-neutral-500"
          >
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
          Goodest {pet.sex == "male" ? "boy" : "girl"} in the town !
        </p>
        <Tabs />
        <TabChooser />
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
