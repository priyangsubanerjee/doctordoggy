/* eslint-disable @next/next/no-img-element */
import { getAllPets } from "@/prisma/pet";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export async function getServerSideProps(context) {
  let homeUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://doctordoggy.vet";
  const pets = await fetch(`${homeUrl}/api/pet`);
  pets = await pets.json();

  return {
    props: { pets }, // will be passed to the page component as props
  };
}

function Pets({ pets }) {
  console.log(pets);
  const PetCard = ({ name, age, image }) => {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="h-20 lg:h-24 w-20 shrink-0 lg:w-24 bg-teal-50 rounded-full overflow-hidden">
          <img
            src="https://puppyintraining.com/wp-content/uploads/long-haired-gsd.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="mt-3 lg:mt-0 lg:ml-5 flex flex-col lg:block items-center justify-center">
          <h2 className="text-slate-800 font-medium text-base">Laddoo</h2>
          <p className="text-xs mt-1 text-neutral-600">1year & 2months old</p>
          <button className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-3">
            <span>Details</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mt-20 lg:mt-16">
        Pets galaxy
      </h1>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          Cant find your pet below?
        </p>
        <Link
          href="/pets/register"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Register your pet</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </Link>
      </div>

      <div className="lg:max-w-[75%] mx-6 lg:mx-auto mt-16 grid grid-cols-2 lg:grid-cols-3 place-content-center place-items-center">
        <PetCard />
        <PetCard />
      </div>
    </div>
  );
}

export default Pets;
