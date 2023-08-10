import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import DocumentCard from "@/components/Prescription/DocumentCard";
import account from "@/db/models/account";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const pet_id = context.query.id;
  const vaccination_id = context.query.vid;

  if (!session) {
    return {
      redirect: {
        destination: "/unauthenticated",
        permanent: false,
      },
    };
  } else {
    await connectDatabase();
    let currPet = await pet.findOne({ _id: pet_id });
    let records = await currPet.vaccinationRecords;
    let vaccination = await records.filter((record) => {
      return record._id == vaccination_id;
    });
    return {
      props: {
        session,
        pet: JSON.parse(JSON.stringify(currPet)),
        vaccination: JSON.parse(JSON.stringify(vaccination[0])),
      },
    };
  }
}
function Vaccination({ pet, vaccination }) {
  console.log(vaccination);
  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div className="flex space-x-2 items-center lg:max-w-xl">
        <span className="text-lg lg:text-2xl font-semibold text-neutral-800">
          <iconify-icon height="50" icon="ph:prescription-light"></iconify-icon>{" "}
        </span>
        <span>
          for <span className="font-semibold">{pet.name}</span>
        </span>
      </div>
    </div>
  );
}

export default Vaccination;
