/* eslint-disable @next/next/no-img-element */
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import React, { useContext, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Link from "next/link";
import RecordsCard from "@/components/Pets/RecordsCard";
import { useRouter } from "next/router";
import GlobalStates from "@/context/GlobalState";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const id = context.query.id;
  let currPet = null;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    await connectDatabase();
    currPet = await pet.findById(id);
  }

  return {
    props: {
      session,
      pet: JSON.parse(JSON.stringify(currPet)),
    },
  };
}

function PetProfile({ pet }) {
  const router = useRouter();
  const session = useSession();
  const [state, setState] = useState("general");
  const { refreshPets } = useContext(GlobalStates);

  const calculateAge = () => {
    let dob = new Date(pet.dateOfBirth);
    var dobYear = dob.getYear();
    var dobMonth = dob.getMonth();
    var dobDate = dob.getDate();

    var now = new Date();
    var currentYear = now.getYear();
    var currentMonth = now.getMonth();
    var currentDate = now.getDate();

    var age = {};
    var ageString = "";

    let yearAge = currentYear - dobYear;

    if (currentMonth >= dobMonth) var monthAge = currentMonth - dobMonth;
    else {
      yearAge--;
      var monthAge = 12 + currentMonth - dobMonth;
    }

    if (currentDate >= dobDate) var dateAge = currentDate - dobDate;
    else {
      monthAge--;
      var dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    age = {
      yrs: yearAge,
      mth: monthAge,
      days: dateAge,
    };

    if (age.yrs > 0 && age.mth > 0 && age.days > 0)
      ageString = age.yrs + "." + age.mth + " yrs, and " + age.days + " days";
    else if (age.yrs == 0 && age.mth == 0 && age.days > 0)
      ageString = age.days + " days";
    else if (age.yrs > 0 && age.mth == 0 && age.days == 0)
      ageString = age.yrs + " yrs";
    else if (age.yrs > 0 && age.mth > 0 && age.days == 0)
      ageString = age.yrs + "." + age.mth + " yrs";
    else if (age.yrs == 0 && age.mth > 0 && age.days > 0)
      ageString = age.mth + " month & " + age.days + " days.";
    else if (age.yrs > 0 && age.mth == 0 && age.days > 0)
      ageString = age.yrs + " yrs, &" + age.days + " days old.";
    else if (age.yrs == 0 && age.mth > 0 && age.days == 0)
      ageString = age.mth + " month.";
    else ageString = "It's first day on 🌎";

    //display the calculated age
    return ageString;
  };

  const deletePet = async () => {
    if (confirm("Are you sure you want to delete this pet?")) {
      const publicId = pet.image.publicId;
      const resDeleteImage = await fetch(`/api/cloudinary/delete/`, {
        method: "POST",
        body: JSON.stringify({ publicId: publicId }),
      });
      const dataDleteImage = await resDeleteImage.json();
      if (dataDleteImage.success) {
        const resDeletePet = await fetch(`/api/pets/delete/`, {
          method: "POST",
          body: JSON.stringify({ id: pet._id }),
        });
        const dataDeletePet = await resDeletePet.json();
        if (dataDeletePet.success) {
          await refreshPets();
          router.push("/dashboard");
        } else {
          alert("Something went wrong, please try again later.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Pets <span className="text-pink-500">profile</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          Find all your vaccination records & prescriptions here
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="relative">
          {pet.sex.toLowerCase() == "male" ? (
            <div className="absolute top-2 right-1 text-3xl text-blue-500">
              <iconify-icon icon="ic:twotone-male"></iconify-icon>
            </div>
          ) : (
            <div className="absolute rotate-45 top-2 right-1 text-3xl text-pink-500">
              <iconify-icon icon="ic:twotone-female"></iconify-icon>
            </div>
          )}
          <img
            className="rounded-full h-28 w-28 object-cover"
            src={pet.image.url}
            alt=""
          />
        </div>
        <h2 className="mt-4 text-neutral-700 font-semibold">{pet.name}</h2>
        <p className="text-xs text-neutral-500 mt-2">{calculateAge()}</p>
      </div>
      <div className="flex items-center border border-neutral-200 rounded-full text-sm px-1 justify-between mt-7 py-1 max-w-sm mx-auto">
        <button
          onClick={() => setState("general")}
          className={`px-5 py-1 ${
            state == "general" && "bg-sky-50"
          } rounded-full`}
        >
          <span>General</span>
        </button>
        <button
          onClick={() => setState("vaccination")}
          className={`px-5 py-1 ${
            state == "vaccination" && "bg-green-50"
          } rounded-full`}
        >
          <span>Vaccination</span>
        </button>
        <button
          onClick={() => setState("prescriptions")}
          className={`px-5 py-1 ${
            state == "prescriptions" && "bg-pink-50"
          } rounded-full`}
        >
          <span>Prescriptions</span>
        </button>
      </div>

      {state == "general" ? (
        <div>
          <div className="mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6 mx-auto">
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500">
                Name
              </label>
              <input
                type="text"
                value={pet.name}
                readOnly
                className="px-4 h-12 border w-full mt-2 rounded outline-none"
                placeholder="How would you like to call your pet?"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
                Family
              </label>
              <div className="relative">
                <div className="px-4 flex items-center h-12 border w-full mt-2 appearance-none rounded bg-transparent">
                  {pet.family}
                </div>
              </div>
            </div>
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
                Sex
              </label>
              <div className="relative">
                <div className="px-4 flex items-center h-12 border w-full mt-2 appearance-none rounded bg-transparent">
                  {pet.sex}
                </div>
              </div>
            </div>
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500">
                D.O.B
              </label>
              <div className="relative">
                <div className="px-4 flex items-center h-12 border w-full mt-2 appearance-none rounded bg-transparent">
                  {pet.dateOfBirth}
                </div>
              </div>
            </div>
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500">
                Age
              </label>
              <div className="relative">
                <div className="px-4 flex items-center h-12 border w-full mt-2 appearance-none rounded bg-transparent">
                  {calculateAge()}
                </div>
              </div>
            </div>
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500">
                Breed
              </label>
              <input
                type="text"
                value={pet.breed}
                readOnly
                className="px-4 h-12 border w-full mt-2 rounded outline-none"
                placeholder="Breed of your pet"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500">
                Color specification{" "}
              </label>
              <input
                type="text"
                value={pet.color}
                readOnly
                className="px-4 h-12 border w-full mt-2 rounded outline-none"
                placeholder="Color of your pet"
                name=""
                id=""
              />
            </div>
            <div>
              <label className="font-medium text-xs shrink-0 text-neutral-500">
                Body weight
              </label>
              <input
                type="tel"
                value={pet.weight}
                readOnly
                className="px-4 h-12 border w-full mt-2 rounded outline-none"
                placeholder="Weight of your pet in kg"
                name=""
                id=""
              />
            </div>
            <div className="lg:col-span-2">
              <label className="font-medium text-xs shrink-0 text-neutral-500">
                Previous complications
              </label>
              <textarea
                name=""
                readOnly
                value={pet.historyOfComplications || "No complications"}
                className="resize-none w-full h-full border px-4 py-3 mt-2 outline-none"
                placeholder="Your text here"
                id=""
              ></textarea>
            </div>
          </div>

          {session.data.user.email == pet.parentEmail && (
            <div className="mt-28">
              <div className="border border-neutral-200 rounded-md p-8 lg:max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold">
                  Update your pet&apos;s profile
                </h2>
                <p className="text-xs mt-2 text-neutral-500 leading-5">
                  You can update your pets general information here.
                </p>
                <Link href={`/pets/${pet._id}/update`}>
                  <button className="text-white bg-neutral-800 px-6 py-2 rounded mt-7 text-sm shadow-md">
                    Edit pet details
                  </button>
                </Link>
              </div>
              <div className="border border-red-200 rounded-md p-8 mt-8 lg:max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold">Danger zone</h2>
                <p className="text-xs mt-2 text-neutral-500 leading-5">
                  This action is irreversible. You will be deleted from all your
                  device.
                </p>
                <button
                  onClick={() => deletePet()}
                  className="text-white bg-red-500 px-6 py-2 rounded mt-7 text-sm shadow-md"
                >
                  Delete pet
                </button>
              </div>
            </div>
          )}
        </div>
      ) : state == "vaccination" ? (
        <div className="mt-8 lg:mt-16 lg:max-w-6xl gap-4 mx-auto">
          <div className="">
            <h2 className="font-semibold text-neutral-700 text-sm">Upcoming</h2>
            <div className="mt-5 flex items-center whitespace-nowrap overflow-auto space-x-2">
              <div className="w-full rounded-md border border-neutral-200 p-3 max-w-[300px] shrink-0">
                <p className="text-xs text-neutral-700 tracking-wider">
                  DUE 12-12-2021 | THURSDAY
                </p>
                <h2 className="font-semibold mt-3 text-neutral-800">
                  Anti rabies booster vaccine
                </h2>
                <button className="px-4 py-2 font-medium text-sm bg-green-50 text-green-900 rounded-md mt-4">
                  Get an appointment
                </button>
              </div>
              <div className="w-full rounded-md border border-neutral-200 p-3 max-w-[300px] shrink-0">
                <p className="text-xs text-neutral-700 tracking-wider">
                  DUE 12-12-2021 | THURSDAY
                </p>
                <h2 className="font-semibold mt-3 text-neutral-800">
                  Anti rabies booster vaccine
                </h2>
                <button className="px-4 py-2 font-medium text-sm bg-green-50 text-green-900 rounded-md mt-4">
                  Get an appointment
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="font-semibold text-neutral-700 text-sm">Older</h2>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="w-full rounded-md border border-neutral-200 p-3 shrink-0">
                <p className="text-xs text-neutral-700 tracking-wider">
                  DUE 12-12-2021 | THURSDAY
                </p>
                <h2 className="font-semibold mt-3 text-neutral-800">
                  Anti rabies booster vaccine
                </h2>
                <button className="px-4 py-2 font-medium text-sm bg-blue-50 text-blue-900 rounded-md mt-4">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : state == "prescriptions" ? (
        <div className="mt-8 lg:mt-16 gap-4 mx-auto">
          <div className="">
            <div className="mt-5">
              {pet.medicalRecords.length == 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="flex">
                    <div className="ml-4 text-center">
                      <h2 className="font-semibold text-neutral-700 text-base">
                        No prescriptions & medical records
                      </h2>
                      <p className="text-sm mt-2 text-neutral-500">
                        Click on the upload button below to upload your first.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/pets/${pet._id}/prescription/upload`}
                    className="mt-9"
                  >
                    <button className="h-12 px-6 font-medium bg-neutral-800 hover:bg-black text-white rounded-md text-sm flex items-center space-x-3">
                      <span className="text-white">
                        <iconify-icon
                          height="20"
                          icon="solar:document-medicine-broken"
                        ></iconify-icon>
                      </span>
                      <span>Upload prescription</span>
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <h2 className="font-semibold text-neutral-700 text-sm">
                    All prescriptions & medical records
                  </h2>
                  <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {pet.medicalRecords.map((record, i) => {
                      console.log(record);
                      return (
                        <RecordsCard
                          key={i}
                          record={record}
                          pet={pet}
                        ></RecordsCard>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {state == "prescriptions" &&
        pet.parentEmail == session.data.user.email &&
        pet.medicalRecords.length > 0 && (
          <Link href={`/pets/${pet._id}/prescription/upload`}>
            <button className="h-12 px-6 font-medium shadow-xl shadow-black/20 bg-neutral-800 hover:bg-black text-white rounded-full text-sm fixed bottom-5 lg:bottom-14 right-6 lg:right-8 flex items-center space-x-3">
              <span className="text-white">
                <iconify-icon
                  height="20"
                  icon="solar:document-medicine-broken"
                ></iconify-icon>
              </span>
              <span>Upload</span>
            </button>
          </Link>
        )}
    </div>
  );
}

export default PetProfile;
