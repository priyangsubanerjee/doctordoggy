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
    <div className="min-h-screen px-6 lg:px-[100px]">
      <p className="text-xs tracking-wider font-medium text-neutral-500 border-b w-fit py-2 border-dashed">
        YOUR PETS
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
        <div className="border border-dashed min-h-[150px] flex flex-col items-center justify-center rounded-md space-y-4 hover:bg-neutral-50 cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3662/3662061.png"
            className="grayscale h-16 w-16"
            alt=""
          />

          <p className="text-sm text-neutral-700">
            <span className="font-medium">Add</span> a pet
          </p>
        </div>
      </div>
      <p className="text-xs tracking-wider font-medium text-neutral-500 border-b w-fit py-2 border-dashed mt-20">
        SCHEDULED
      </p>
    </div>
  );
}

export default Dashboard;
