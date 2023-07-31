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
        <div className="space-y-2">
          <label
            htmlFor=""
            className="flex items-center space-x-2 text-neutral-700"
          >
            <span className="text-xs">Pincode</span>
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
                  d="M19.183 7.805L16.22 4.838c-2.027-2.03-3.04-3.043-4.129-2.803c-1.088.24-1.581 1.587-2.568 4.28l-.668 1.823c-.263.718-.395 1.077-.632 1.355a2.035 2.035 0 0 1-.36.332c-.296.213-.664.314-1.4.517c-1.66.458-2.491.687-2.804 1.23a1.528 1.528 0 0 0-.204.773c.004.627.613 1.236 1.83 2.455L6.7 16.216l-4.476 4.48a.764.764 0 0 0 1.08 1.08l4.475-4.48l1.466 1.468c1.226 1.226 1.839 1.84 2.47 1.84c.265 0 .526-.068.757-.2c.548-.313.778-1.149 1.239-2.822c.202-.735.303-1.102.515-1.399c.093-.129.201-.247.322-.352c.275-.238.632-.372 1.345-.64l1.844-.693c2.664-1 3.996-1.501 4.23-2.586c.235-1.086-.77-2.093-2.783-4.107Z"
                />
              </svg>
            </span>
            <p>713216</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-8 max-w-sm">
        <button className="flex items-center text-sm space-x-2 text-white bg-neutral-800 px-5 py-3 rounded-md">
          <iconify-icon
            height="16"
            icon="fluent:edit-20-regular"
          ></iconify-icon>
          <span>Edit account</span>
        </button>
      </div>
    </div>
  );
}

export default Profile;
