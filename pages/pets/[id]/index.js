/* eslint-disable @next/next/no-img-element */
import React from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPetById } from "@/prisma/pet";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pet = null;
  if (session) {
    pet = await getPetById(context.params.id);
    pet = await JSON.parse(JSON.stringify(pet));
    if (!pet.isPublic) {
      if (pet.parentEmail !== session.user.email) {
        pet = null;
      }
    }
  }
  return {
    props: { session, pet }, // will be passed to the page component as props
  };
}

function PetDashboard({ pet }) {
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
          <span className="opacity-60">Palace</span>
        </h1>
        <p className="text-center mt-2 text-sm text-neutral-700">
          Goodest boy in the town !
        </p>
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
