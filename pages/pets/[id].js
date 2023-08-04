/* eslint-disable @next/next/no-img-element */
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

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
  const [state, setState] = useState("general");

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
            src={pet.image}
            alt=""
          />
        </div>
        <h2 className="mt-4 text-neutral-700 font-semibold">{pet.name}</h2>
        <p className="text-xs text-neutral-500 mt-2">{calculateAge()}</p>
      </div>
      <div className="flex items-center border border-neutral-200 rounded-full text-sm px-1 justify-between mt-7 py-1 max-w-sm mx-auto">
        <button className="px-5 py-1 bg-sky-50 rounded-full">
          <span>General</span>
        </button>
        <button className="px-5 py-1 bg-sky-50/0 rounded-full">
          <span>Vaccination</span>
        </button>
        <button className="px-5 py-1 bg-sky-50/0 rounded-full">
          <span>Prescriptions</span>
        </button>
      </div>
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
    </div>
  );
}

export default PetProfile;
