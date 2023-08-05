import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import DocumentCard from "@/components/Prescription/DocumentCard";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const pet_id = context.query.id;
  const prescription_id = context.query.pid;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    await connectDatabase();
    let currPet = await pet.findOne({ _id: pet_id });
    let records = await currPet.medicalRecords;
    let prescription = await records.filter((record) => {
      return record._id == prescription_id;
    });
    return {
      props: {
        session,
        pet: JSON.parse(JSON.stringify(currPet)),
        prescription: JSON.parse(JSON.stringify(prescription[0])),
      },
    };
  }
}

function Prescription({ pet, prescription }) {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div className="flex justify-between items-center lg:max-w-xl">
        <div className="flex text-xs items-center space-x-2 text-neutral-600">
          <span className="mt-[2px] text-neutral-700">
            <iconify-icon
              height="20"
              icon="solar:calendar-broken"
            ></iconify-icon>
          </span>
          <span>{prescription.date}</span>
        </div>
        <div className="flex text-xs items-center space-x-2 text-neutral-600">
          <span className="mt-[2px] text-red-400">
            <iconify-icon height="24" icon="healthicons:doctor"></iconify-icon>
          </span>
          <span>{prescription.doctor}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3 mt-10">
        <span className="text-lg lg:text-2xl font-semibold text-neutral-800">
          <iconify-icon height="50" icon="ph:prescription-light"></iconify-icon>{" "}
        </span>
        <span>
          for <span className="font-semibold">{pet.name}</span>
        </span>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-7 mt-10 lg:max-w-4xl">
        <div className="col-span-3 lg:col-span-1 ">
          <span className="tracking-wide text-xs text-neutral-500">Name</span>
          <p className="mt-2">{pet.name}</p>
        </div>
        <div>
          <span className="tracking-wide text-xs text-neutral-500">
            Species
          </span>
          <p className="mt-2">{pet.family}</p>
        </div>
        <div>
          <span className="tracking-wide text-xs text-neutral-500">Colour</span>
          <p className="mt-2">{pet.color}</p>
        </div>
        <div>
          <span className="tracking-wide text-xs text-neutral-500">
            Temperature
          </span>
          <p className="mt-2">{prescription.temperature || "--"}</p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <span className="tracking-wide text-xs text-neutral-500">Breed</span>
          <p className="mt-2">{pet.breed}</p>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <span className="tracking-wide text-xs text-neutral-500">Sex</span>
          <p className="mt-2">{pet.sex}</p>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <span className="tracking-wide text-xs text-neutral-500">
            Body weight (on the day of visit)
          </span>
          <p className="mt-2">{prescription.weight} Kg</p>
        </div>
        <div className="col-span-3 lg:col-span-4">
          <span className="tracking-wide text-xs text-neutral-500">
            Complication history
          </span>
          <p className="mt-2">{pet.historyOfComplications || "--"}</p>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <span className="tracking-wide text-xs text-neutral-500">
            Reason of visit
          </span>
          <p className="mt-2">{prescription.reason || "--"}</p>
        </div>
        <div className="col-span-3 lg:col-span-4">
          <span className="tracking-wide text-xs text-neutral-500">
            Additional notes
          </span>
          <p className="mt-2">{prescription.notes || "--"}</p>
        </div>
      </div>
      <div className="mt-10 lg:mt-16 lg:max-w-4xl">
        <h2 className="font-semibold text-neutral-800 text-sm">
          Uploaded documents
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-5">
          {prescription.files.map((document, i) => {
            return <DocumentCard document={document} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Prescription;
