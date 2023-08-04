/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

function Petcard({ pet }) {
  // calculate age from dateOfBirth

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
    <Link href={`/pets/${pet._id}`}>
      <div className="flex flex-col items-center relative">
        {pet.sex.toLowerCase() == "male" ? (
          <div className="absolute top-2 right-1 text-3xl text-blue-500">
            <iconify-icon icon="ic:twotone-male"></iconify-icon>
          </div>
        ) : (
          <div className="absolute rotate-45 top-2 right-1 text-3xl text-pink-500">
            <iconify-icon icon="ic:twotone-female"></iconify-icon>
          </div>
        )}
        <div className="lg:h-32 h-28 lg:w-32 w-28 p-2 border border-dashed border-neutral-300 rounded-full flex items-center justify-center bg-white">
          <img
            src={pet.image}
            className="bg-gray-50 rounded-full p-3 h-full w-full object-center object-cover"
            alt=""
          />
        </div>
        <p className="text-center text-neutral-700 font-semibold mt-3 text-sm">
          {pet.name}
        </p>
        <span className="text-[12px] mt-2 text-neutral-500">
          {calculateAge()}
        </span>
      </div>
    </Link>
  );
}

export default Petcard;
