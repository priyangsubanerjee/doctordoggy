/* eslint-disable @next/next/no-img-element */
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getAllPets, getPersonalPet } from "@/prisma/pet";
import calculateAge from "@/helper/age";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pets = [];
  if (session) {
    pets = await getPersonalPet(session?.user?.email);
    pets = (await JSON.parse(JSON.stringify(pets))) || [];
  } else {
    pets = [];
  }
  return {
    props: { pets }, // will be passed to the page component as props
  };
}

function Pets({ pets = [] }) {
  const PetCard = ({ name, age, image, id }) => {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="h-20 lg:h-24 w-20 shrink-0 lg:w-24 bg-teal-50 rounded-full overflow-hidden">
          <img src={image} className="h-full w-full object-cover" alt="" />
        </div>
        <div className="mt-3 lg:mt-0 lg:ml-5 flex flex-col lg:block items-center justify-center">
          <h2 className="text-slate-800 font-medium text-base">{name}</h2>
          <p className="text-xs mt-1 text-neutral-600">{age}</p>
          <Link href={`/pets/${id}`}>
            <button className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-3">
              <span>Details</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </Link>
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
      <>
        {pets && (
          <div className="lg:max-w-[75%] mx-6 lg:mx-auto mt-16 grid grid-cols-2 gap-8 lg:gap-12 lg:grid-cols-3 place-content-center place-items-center">
            {pets.map((pet) => (
              <PetCard
                id={pet?.id}
                key={pet?.id}
                name={pet?.name}
                age={calculateAge(pet?.dateOfBirth)}
                image={pet?.image}
              />
            ))}
          </div>
        )}
      </>
      <>
        {pets?.length == 0 && (
          <div className="flex flex-col items-center justify-center mt-32">
            <img
              src="https://i.pinimg.com/736x/4d/56/55/4d5655184db8716367bad5e6009dfc61.jpg"
              className="h-32"
              alt=""
            />
            <p className="mt-6 text-sm text-neutral-500">
              You have not registered any pet yet.{" "}
            </p>
          </div>
        )}
      </>
    </div>
  );
}

export default Pets;
