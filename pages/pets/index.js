/* eslint-disable @next/next/no-img-element */
const { PrismaClient } = require("@prisma/client");
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const prisma = new PrismaClient();
  const pets = await prisma.pet.findMany({
    where: {
      parentEmail: session.user.email,
    },
  });

  return {
    props: {
      pets: JSON.parse(JSON.stringify(pets)) || [],
    },
  };
}

function Pets({ pets }) {
  const calculateAge = (dateOfBirth) => {
    let dob = new Date(dateOfBirth);
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

  const PetCard = ({ name, age, image, id }) => {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="h-20 lg:h-24 w-20 shrink-0 lg:w-24 bg-teal-50 rounded-full overflow-hidden">
          <img src={image[0]} className="h-full w-full object-cover" alt="" />
        </div>
        <div className="mt-3 lg:mt-0 lg:ml-5 flex flex-col lg:block items-center justify-center">
          <h2 className="text-slate-800 font-medium text-base">{name}</h2>
          <p className="text-xs mt-1 text-neutral-600">{age}</p>
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
        {pets.map((pet, i) => (
          <PetCard
            key={i}
            id={pet.id}
            name={pet.name}
            age={calculateAge(pet.dateOfBirth)}
            image={pet.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Pets;
