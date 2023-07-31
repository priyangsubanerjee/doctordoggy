/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Petcard from "@/components/Dashboard/Petcard";

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

function Dashboard() {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Registered <span className="text-pink-500">pet&apos;s</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-2">
          All of your pet&apos;s information is stored here.
        </p>
      </div>

      <button className="h-12 px-6 font-medium shadow-xl shadow-black/20 bg-black text-white rounded-full text-sm fixed bottom-5 lg:bottom-14 right-6 lg:right-8 flex items-center space-x-3">
        <span className="text-white text-xl">
          <iconify-icon icon="cil:dog"></iconify-icon>
        </span>
        <span>Add pet</span>
      </button>

      <div className="mt-10 lg:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 place-content-center place-items-center">
        <Petcard />
      </div>
    </div>
  );
}

export default Dashboard;
