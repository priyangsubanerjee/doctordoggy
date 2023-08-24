import React from "react";
import { Icon } from "@iconify/react";
function BookingCard() {
  return (
    <div className="border rounded-lg p-5">
      <div className="flex items-center space-x-1 text-[12px] tracking-widest font-medium text-neutral-700">
        <span>UPCOMING</span>
        <span>|</span>
        <span>28-08-202</span>
      </div>
      <h1 className="mt-4 text-lg font-semibold text-neutral-800">
        Grooming & Spa for Laddoo
      </h1>
      <div className="mt-4 flex items-center space-x-2">
        <button className="px-4 h-10 font-medium text-sm bg-neutral-100 text-neutral-800 rounded-md">
          <Icon height={16} icon="material-symbols:call" />
        </button>
        <button className="px-4 h-10 font-medium text-sm bg-red-50 text-red-800 rounded-md">
          Request cancellation
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
