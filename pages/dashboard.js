/* eslint-disable @next/next/no-img-element */
import React from "react";
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

function Dashboard() {
  return (
    <div className="min-h-screen px-6 py-6 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Registered <span className="text-pink-500">pet&apos;s</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-3">
          All of your pet&apos;s information is stored here.
        </p>
      </div>

      <div className="mt-10 lg:mt-16 grid grid-cols-2 lg:grid-cols-5 gap-5 place-content-center place-items-center">
        <div className="flex flex-col items-center">
          <div className="lg:h-32 h-28 lg:w-32 w-28 p-2 border border-dashed border-neutral-300 rounded-full flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3307/3307591.png"
              className="bg-gray-50 rounded-full p-3 grayscale"
              alt=""
            />
          </div>
          <p className="text-center text-neutral-700f font-medium mt-3 text-sm">
            Register a pet
          </p>
          <button className="text-[10px] tracking-wider font-medium bg-blue-50 text-blue-500 mt-3 px-4 py-1 font-popins rounded-full">
            NEW
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
