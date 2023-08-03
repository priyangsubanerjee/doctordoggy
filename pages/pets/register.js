/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

function RegisterPet() {
  const [pet, setPet] = useState({
    name: "",
    family: "",
    sex: "",
    dateOfBirth: "",
    breed: "",
    color: "",
    weight: "",
    complications: "",
  });

  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Register new <span className="text-pink-500">pet</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          <span className="text-red-500">*</span> marked fields are required
        </p>
      </div>
      <div className="mt-10 lg:mt-20">
        <div>
          <p className="text-sm text-neutral-600">Avatar image</p>
          <div className="flex justify-center lg:justify-start mt-4">
            <div className="h-32 lg:h-28 w-32 lg:w-28 rounded-full relative">
              <img
                src="https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png"
                className="object-cover mt-2 h-full w-full"
                alt=""
              />
              <button className="h-10 w-10 rounded-full text-black bg-white hover:bg-neutral-100 border shadow-md absolute bottom-0 right-0 z-0">
                <iconify-icon icon="solar:camera-bold"></iconify-icon>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6">
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Name <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              className="px-4 h-12 border w-full mt-2 rounded"
              placeholder="How would you like to call your pet?"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
              Family <span className="text-red-500 text-lg">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-[30%]">
                <iconify-icon icon="icon-park-outline:down"></iconify-icon>
              </span>
              <select
                className="px-4 h-12 border w-full mt-2 appearance-none rounded bg-transparent"
                name=""
                id=""
              >
                <option value="">Canine</option>
                <option value="">Feline</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
              Sex <span className="text-red-500 text-lg">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-[30%]">
                <iconify-icon icon="icon-park-outline:down"></iconify-icon>
              </span>
              <select
                className="px-4 h-12 border w-full mt-2 appearance-none rounded bg-transparent"
                name=""
                id=""
              >
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              D.O.B <span className="text-red-500 ml-1 text-xl">*</span>
            </label>
            <div
              onClick={() => document.getElementById("dobInput").focus()}
              className="h-12 border w-full mt-2 rounded bg-transparent relative px-4"
            >
              <span
                onClick={() => document.getElementById("dobInput").focus()}
                className="absolute right-3 top-1/2 -translate-y-[30%] lg:hidden"
              >
                <iconify-icon icon="solar:calendar-outline"></iconify-icon>
              </span>
              <input
                type="date"
                placeholder="Date of birth"
                className="appearance-none w-fit lg:w-full h-full bg-transparent  outline-none"
                name=""
                id="dobInput"
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Breed <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              className="px-4 h-12 border w-full mt-2 rounded"
              placeholder="Breed of your pet"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Color specification{" "}
              <span className="text-red-500/0 text-lg">*</span>
            </label>
            <input
              type="text"
              className="px-4 h-12 border w-full mt-2 rounded"
              placeholder="Color of your pet"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Body weight
              <span className="text-red-500/0 text-lg">*</span>
            </label>
            <input
              type="tel"
              className="px-4 h-12 border w-full mt-2 rounded"
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
              className="resize-none w-full h-full border px-4 py-3 mt-2"
              placeholder="Your text here"
              id=""
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPet;
