/* eslint-disable @next/next/no-img-element */
import React from "react";

function Success() {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://png.pngtree.com/png-vector/20221113/ourmid/pngtree-happy-dog-cartoon-character-png-image_6439369.png"
          alt=""
          className="h-44"
        />
        <h2 className="text-2xl font-bold text-slate-800 mt-7">
          Your booking has been successfully created.
        </h2>
        <h3 className="text-sm mt-3">
          We will contact you shortly on your registered number.
        </h3>
        <div className="flex items-center space-x-4 text-sm mt-10">
          <button className="h-12 px-4 bg-neutral-800 text-white rounded">
            View bookings
          </button>
          <button className="h-12 px-4 bg-neutral-200 text-black rounded">
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
