import React from "react";
import { Icon } from "@iconify/react";
import BookingCard from "@/components/Bookings/BookingCard";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import connectDatabase from "@/db/connect";
import booking from "@/db/models/booking";

export async function getServerSideProps(context) {
  await connectDatabase();
  let session = await getServerSession(context.req, context.res, authOptions);

  let email = session.user.email;
  let bookings_ = await booking.find({ email: email });
  bookings_ = JSON.parse(JSON.stringify(bookings_));

  return {
    props: {
      bookings: JSON.parse(JSON.stringify(bookings_)),
    },
  };
}

function Services({ bookings }) {
  const session = useSession();

  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <div className="flex items-center space-x-2">
          <Icon height={30} icon="solar:calendar-broken" />
          <h2 className="font-semibold text-neutral-700 text-sm">
            Due Bookings
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((data, i) => {
            if (data.status == "due") {
              return <BookingCard data={data} key={i} />;
            }
          })}
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
          {bookings.map((data, i) => {
            if (data.status == "done") {
              return <BookingCard data={data} key={i} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;
