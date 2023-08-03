/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Petcard from "@/components/Dashboard/Petcard";
import Link from "next/link";
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";

export async function getServerSideProps(context) {
  let pets = [];
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    let email = session.user.email;
    await connectDatabase();
    pets = await pet.find({ parentEmail: email });
    pets = JSON.parse(JSON.stringify(pets));
    if (pets.length === 0) {
      pets = [];
    }
  }

  return {
    props: {
      session,
      pets: pets || [],
    },
  };
}

function Dashboard({ pets }) {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Registered <span className="text-pink-500">pet&apos;s</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          All of your pet&apos;s information is stored here.
        </p>
      </div>

      {pets.length > 0 && (
        <div className="mt-10 lg:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 place-content-center place-items-center">
          {pets.map((pet, index) => {
            return <Petcard key={index} pet={pet} />;
          })}
        </div>
      )}

      {pets.length == 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-illustration-people-with-pets_23-2148980837.jpg?w=2000"
            className="h-[300px]"
            alt=""
          />
          <h2 className="text-lg font-semibold text-neutral-600">
            You have not yet registered any pet&apos;s
          </h2>
          <p className="text-[11px] lg:text-xs text-neutral-500 mt-2">
            You can add a pet by clicking the button below.
          </p>
          <Link href="/pets/register" className="mt-10">
            <button className=" h-12 px-6 font-medium bg-neutral-800 hover:bg-black text-white rounded-full text-sm flex items-center space-x-3">
              <span className="text-white text-xl">
                <iconify-icon icon="cil:dog"></iconify-icon>
              </span>
              <span>Add pet</span>
            </button>
          </Link>
        </div>
      )}

      {pets.length > 0 && (
        <Link href="/pets/register">
          <button className="h-12 px-6 font-medium shadow-xl shadow-black/20 bg-neutral-800 hover:bg-black text-white rounded-full text-sm fixed bottom-5 lg:bottom-14 right-6 lg:right-8 flex items-center space-x-3">
            <span className="text-white text-xl">
              <iconify-icon icon="cil:dog"></iconify-icon>
            </span>
            <span>Add pet</span>
          </button>
        </Link>
      )}
    </div>
  );
}

export default Dashboard;
