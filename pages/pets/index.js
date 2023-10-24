import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function Pets() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mt-16">Pets galaxy</h1>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          Your fur babies deserve the utmost care.
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

      <div className="max-w-[75%] mx-auto h-44 mt-16 grid grid-cols-3 place-content-center place-items-center">
        <div className="flex items-center justify-center">
          <div className="h-24 w-24 bg-red-50 rounded-lg"></div>
          <div className="ml-5">
            <h2 className="text-slate-800 font-medium text-base">Laddoo</h2>
            <p className="text-xs mt-1 text-neutral-600">1year & 2months old</p>
            <button className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-3">
              <span>Details</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-24 w-24 bg-teal-50 rounded-lg"></div>
          <div className="ml-5">
            <h2 className="text-slate-800 font-medium text-base">Rocky</h2>
            <p className="text-xs mt-1 text-neutral-600">1year & 2months old</p>
            <button className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-3">
              <span>Details</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-24 w-24 bg-blue-50 rounded-lg"></div>
          <div className="ml-5">
            <h2 className="text-slate-800 font-medium text-base">Max</h2>
            <p className="text-xs mt-1 text-neutral-600">1year & 2months old</p>
            <button className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-3">
              <span>Details</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pets;
