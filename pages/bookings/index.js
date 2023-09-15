/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Icon } from "@iconify/react";
import BookingCard from "@/components/Bookings/BookingCard";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import connectDatabase from "@/db/connect";
import booking from "@/db/models/booking";
import Link from "next/link";

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

function Bookings({ bookings }) {
  const session = useSession();

  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      {bookings.length == 0 ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/pet-animal-checking-kids-dog-in-clinic-2496348-2093269.png"
              className="h-44"
              alt=""
            />
            <h1 className="text-3xl font-semibold text-neutral-800 mt-16">
              No bookings found
            </h1>
            <p className="text-sm mt-2">
              You have no bookings yet. Click the button below to scheudle a
              booking for your beloved pet.
            </p>
            <Link href="/bookings/schedule" className="mt-10 block">
              <button className="h-12 px-5 bg-neutral-800 text-white rounded">
                Scheudle a booking now
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="flex items-center space-x-2">
              <Icon height={30} icon="solar:calendar-broken" />
              <h2 className="font-semibold text-neutral-700 text-sm">
                Upcoming Bookings
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
        </>
      )}
    </div>
  );
}

export default Bookings;
