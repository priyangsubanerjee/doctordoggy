import React from "react";
import { Icon } from "@iconify/react";
function BookingCard({ data }) {
  return (
    <div className="border rounded-lg p-5">
      <div className="flex items-center space-x-1 text-[12px] tracking-widest font-medium text-neutral-700">
        <span>{data.status == "due" ? "DUE" : "DONE"}</span>
        <span>|</span>
        <span>{new Date(data.dateTime).toLocaleString()}</span>
      </div>
      <h1 className="mt-4 text-lg font-semibold text-neutral-800">
        {data.serviceType} for {data.petName}
      </h1>
      <div className="mt-4 flex items-center space-x-2">
        <button className="px-4 h-10 font-medium text-sm bg-neutral-100 text-neutral-800 rounded-md">
          <Icon height={16} icon="material-symbols:call" />
        </button>
        <button
          onClick={async () => {
            if (
              !window.confirm("Are you sure you want to cancel this booking?")
            )
              return;
            await fetch("/api/notification/send", {
              method: "POST",
              body: JSON.stringify({
                message: `Booking cancelation request from ${session?.data?.user?.name} for ${bookingProp.serviceType} on ${bookingProp.dateTime}`,
              }),
            });
          }}
          className="px-4 h-10 font-medium text-sm bg-red-50 text-red-800 rounded-md"
        >
          Request cancellation
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
