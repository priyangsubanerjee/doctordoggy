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
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div className="max-w-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
            Your <span className="text-pink-500">account</span>
          </h2>
          <button className="flex items-center text-xs space-x-2 font-bold tracking-wider text-pink-600">
            <iconify-icon
              height="16"
              icon="fluent:edit-20-regular"
            ></iconify-icon>
            <span>EDIT</span>
          </button>
        </div>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          Manage your account preferences.
        </p>
      </div>

      <div className="mt-8 space-y-4 max-w-sm">
        <div className="space-y-2">
          <label
            htmlFor=""
            className="flex items-center space-x-2 text-neutral-700"
          >
            <span className="text-xs">Name</span>
          </label>
          <div className="border px-3 space-x-3 py-3 bg-neutral-50 flex items-center text-sm rounded-md">
            <span className="text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
                />
              </svg>
            </span>
            <p>John Doe</p>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor=""
            className="flex items-center space-x-2 text-neutral-700"
          >
            <span className="text-xs">Phone</span>
          </label>
          <div className="border px-3 space-x-3 py-3 bg-neutral-50 flex items-center text-sm rounded-md">
            <span className="text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.95 21q-3.125 0-6.175-1.363t-5.55-3.862q-2.5-2.5-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.338t.712-.062l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3Z"
                />
              </svg>
            </span>
            <p>9647045452</p>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor=""
            className="flex items-center space-x-2 text-neutral-700"
          >
            <span className="text-xs">Email</span>
          </label>
          <div className="border px-3 space-x-3 py-3 bg-neutral-50 flex items-center text-sm rounded-md">
            <span className="text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"
                />
              </svg>
            </span>
            <p>priyangs26@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
