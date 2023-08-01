import { signOut } from "next-auth/react";
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

function Profile() {
  return (
    <div className="min-h-screen h-fit px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
            Your <span className="text-pink-500">account</span>
          </h2>
        </div>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          Manage your account preferences.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-6">
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Name
          </label>
          <input
            type="text"
            className="px-4 py-3 border w-full mt-2 rounded-none"
            value={"Jane doe"}
            placeholder="Your name"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Email
          </label>
          <input
            type="text"
            className="px-4 py-3 border w-full mt-2 rounded-none"
            value={"Jane doe"}
            placeholder="Your name"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Phone
          </label>
          <input
            type="text"
            className="px-4 py-3 border w-full mt-2"
            value={"Jane doe"}
            placeholder="Your name"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Pincode
          </label>
          <input
            type="text"
            className="px-4 py-3 border w-full mt-2"
            value={"Jane doe"}
            placeholder="Your name"
            name=""
            id=""
          />
        </div>
        <div className="lg:col-span-2">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Pincode
          </label>
          <textarea
            name=""
            className="resize-none w-full h-full border px-4 py-3 mt-2"
            placeholder="11/6 Saradapally, 54 Foot"
            id=""
          ></textarea>
        </div>
      </div>

      <div className="mt-20 flex items-center space-x-5">
        <button className="px-5 py-4 rounded bg-neutral-800 text-white text-sm">
          Edit profile
        </button>
        <button className="px-5 py-4 rounded bg-neutral-100 text-black text-sm">
          Need assistance? Contact us
        </button>
      </div>
    </div>
  );
}

export default Profile;
