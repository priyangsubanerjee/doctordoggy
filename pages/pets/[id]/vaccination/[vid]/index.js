/* eslint-disable @next/next/no-img-element */
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
      <div>
        {vaccination.vaccineStatus == "done" && (
          <div>
            <div className="flex items-center">
              <div className="flex items-center space-x-2 py-2 px-3 bg-green-50 text-green-700 font-medium text-sm rounded-lg">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21 11c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4l9 4v6m-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21Z"
                    />
                  </svg>
                </span>
                <span>Vaccinated</span>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-3xl lg:text-4xl text-neutral-700 font-bold">
                {vaccination.vaccineName}
              </h2>
              <div className="mt-4">
                {vaccination.doctor == null && (
                  <div className="text-xs lg:text-sm leading-6">
                    We are sorry, but we could not find the doctor who
                    administered this vaccine. Thus we do not claim any
                    responsibility for the data.
                  </div>
                )}
              </div>
              <div className="mt-16">
                <p className="tracking-wide text-xs text-neutral-500">
                  Vaccine labels
                </p>
                <div className="flex items-center space-x-4 mt-5">
                  {vaccination.files.map((file, i) => {
                    return (
                      <img
                        className="w-32 object-contain"
                        key={i}
                        src={file.fileUrl}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-7 mt-10 lg:max-w-4xl">
                <div className="">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Vaccine for
                  </span>
                  <p className="mt-2">{pet.name}</p>
                </div>
                <div>
                  <span className="tracking-wide text-xs text-neutral-500">
                    Species
                  </span>
                  <p className="mt-2">{pet.family}</p>
                </div>
                <div>
                  <span className="tracking-wide text-xs text-neutral-500">
                    Colour
                  </span>
                  <p className="mt-2">{pet.color}</p>
                </div>
                <div>
                  <span className="tracking-wide text-xs text-neutral-500">
                    Date of birth
                  </span>
                  <p className="mt-2">{pet.dateOfBirth}</p>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Breed
                  </span>
                  <p className="mt-2">{pet.breed}</p>
                </div>
                <div className="col-span-1 lg:col-span-1">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Sex
                  </span>
                  <p className="mt-2">{pet.sex}</p>
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Complication history
                  </span>
                  <p className="mt-2">{pet.historyOfComplications || "--"}</p>
                </div>
                <div className="">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Due date
                  </span>
                  <p className="mt-2">{vaccination.dueDate || "--"}</p>
                </div>
                <div className="">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Vaccinated on
                  </span>
                  <p className="mt-2">{vaccination.vaccinatedOn || "--"}</p>
                </div>
                <div className="col-span-3 lg:col-span-1">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Vaccinated by
                  </span>
                  <p className="mt-2">{vaccination.doctor?.name || "--"}</p>
                </div>
                <div className="lg:col-span-3">
                  <span className="tracking-wide text-xs text-neutral-500">
                    Additional notes
                  </span>
                  <p className="mt-2">{vaccination.notes || "--"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vaccination;
