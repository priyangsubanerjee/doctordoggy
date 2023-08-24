import React from "react";
import { Icon } from "@iconify/react";
import BookingCard from "@/components/Bookings/BookingCard";

function Services() {
  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <div className="flex items-center space-x-2">
          <Icon height={30} icon="solar:calendar-broken" />
          <h2 className="font-semibold text-neutral-700 text-sm">
            Upcoming Bookings
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BookingCard />
        </div>
      </div>
      <div className="mt-20">
        <div className="flex items-center space-x-2">
          <Icon height={30} icon="solar:history-bold-duotone" />
          <h2 className="font-semibold text-neutral-700 text-sm">
            Past Bookings
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BookingCard />
        </div>
      </div>
    </div>
  );
}

export default Services;
