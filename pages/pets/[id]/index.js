/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPetById } from "@/prisma/pet";
import { Icon } from "@iconify/react";
import { Button, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import calculateAge from "@/helper/age";
import Link from "next/link";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pet = null;
  let isParent = false;
  if (session) {
    pet = await getPetById(context.params.id);
    pet = await JSON.parse(JSON.stringify(pet));
    if (pet) {
      if (session?.user?.email == pet.parentEmail) {
        isParent = true;
      }
      if (!pet.isPublic) {
        if (pet.parentEmail !== session?.user?.email) {
          pet = null;
        }
      }
    }
  }
  return {
    props: { session, pet, isParent }, // will be passed to the page component as props
  };
}

function PetDashboard({ pet, isParent }) {
  const [isEditable, setIsEditable] = useState(false);
  const [registerProp, setRegisterProp] = useState({
    parentEmail: pet?.parentEmail || "",
    name: pet?.name || "",
    species: pet?.species || "",
    breed: pet?.breed || "",
    sex: pet?.sex || "",
    dateOfBirth: pet?.dateOfBirth || "",
    bodyWeight: pet?.bodyWeight || "",
    isPublic: pet?.isPublic || true,
    color: pet?.color || "",
  });
  const tabOptions = [
    "General",
    "Prescriptions",
    "Vaccinations",
    "Deworming",
    "Pathology",
  ];

  const [tabChooserOpen, setTabChooserOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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

  const ActiveTab = ({}) => {};

  const GeneralTab = ({}) => {
    return (
      <div className="max-w-3xl mx-3 lg:mx-auto pb-16 mt-10 lg:mt-7 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3">
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Name
            </span>
            <p>{pet?.name}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Species
            </span>
            <p>{Capitalize(pet?.species)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Breed
            </span>
            <p>{Capitalize(pet?.breed)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Age
            </span>
            <p>{calculateAge(pet?.dateOfBirth)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Colour
            </span>
            <p>{Capitalize(pet?.color)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Sex
            </span>
            <p>{Capitalize(pet?.sex)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10 border rounded-md p-5">
          <div>
            <p className="text-neutral-800 text-base">Public profile?</p>
            <Link
              href="/pets/register"
              className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-1"
            >
              <span>Learn about public profiles</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </Link>
          </div>
          <Switch isSelected={pet?.isPublic} />
        </div>

        {isParent && (
          <>
            <div className="p-5 rounded-md mt-24 border">
              <h1>Edit zone</h1>
              <p className="text-sm text-neutral-500 mt-2">
                Edit pet information
              </p>
              <Button
                radius="full"
                className="px-6 py-2 bg-neutral-800 text-sm text-white mt-5"
              >
                Edit
              </Button>
            </div>
            <div className="p-5 rounded-md mt-5 border">
              <h1>Danger zone</h1>
              <p className="text-sm text-neutral-500 mt-2">
                This action is irreversible & will delete this pet completely.
              </p>
              <Button
                radius="full"
                className="px-6 py-2 bg-red-600 text-sm text-white mt-5"
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  if (pet != null) {
    return (
      <div>
        <div className="relative">
          <img
            src={pet.image}
            className="h-48 lg:h-72 w-full object-cover blur-3xl opacity-50"
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
        <GeneralTab />
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
