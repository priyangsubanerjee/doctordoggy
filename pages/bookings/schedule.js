import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import React, { useEffect } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/unauthenticated",
        permanent: false,
      },
    };
  }

  await connectDatabase();
  let pets_ = await pet.find({
    parentEmail: session.user.email,
  });

  return {
    props: {
      pets: JSON.parse(JSON.stringify(pets_)),
    },
  };
}

function Schedule({ pets = [] }) {
  const router = useRouter();
  const session = useSession();
  const [services, setServices] = React.useState([
    {
      name: "Grooming & Spa",
    },
    {
      name: "Boarding",
    },
    {
      name: "Training",
    },
    {
      name: "Dog Walking",
    },
  ]);
  const [bookingProp, setBookingProp] = React.useState({
    petId: pets.length > 0 ? pets[0]._id : "",
    petName: pets.length > 0 ? pets[0].name : "",
    dateTime: "",
    serviceType: services[0].name,
    notes: "",
  });
  const [loading, setLoading] = React.useState(false);

  const createBooking = async () => {
    setLoading(true);
    const response = await fetch("/api/booking/create", {
      method: "POST",
      body: JSON.stringify({
        ...bookingProp,
        email: session.data.user.email,
      }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      window.location.href = "/bookings/success";
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    let serviceTypeValue = document.getElementById("serviceTypeValue");

    const serviceType = router.query.serviceType;
    if (serviceType) {
      if (serviceType == "grooming") {
        setBookingProp({
          ...bookingProp,
          serviceType: "Grooming & Spa",
        });
        serviceTypeValue.value = "Grooming & Spa";
      }
      if (serviceType == "boarding") {
        setBookingProp({
          ...bookingProp,
          serviceType: "Boarding",
        });
        serviceTypeValue.value = "Boarding";
      }
      if (serviceType == "training") {
        setBookingProp({
          ...bookingProp,
          serviceType: "Training",
        });
        serviceTypeValue.value = "Training";
      }

      if (serviceType == "dogWalking") {
        setBookingProp({
          ...bookingProp,
          serviceType: "Dog Walking",
        });
        serviceTypeValue.value = "Dog Walking";
      }
    }
  }, [router.query.serviceType]);
  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Schedule a <span className="text-[#F15958]">service</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-2">
          <span className="text-red-500">*</span> marked fields are required
        </p>
      </div>
      <div className="mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6">
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
            Choose pet <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 -translate-y-[30%]">
              <iconify-icon icon="icon-park-outline:down"></iconify-icon>
            </span>
            <select
              onChange={(e) => {
                setBookingProp({
                  ...bookingProp,
                  petId: e.target.value,
                  petName: pets.find((pet) => {
                    if (pet._id == e.target.value) {
                      return pet.name;
                    }
                  }),
                });
              }}
              className="px-4 h-12 border w-full mt-2 appearance-none rounded bg-transparent"
              name=""
              id=""
            >
              {pets.map((pet, index) => {
                return (
                  <option key={index} value={pet._id}>
                    {pet.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Choose date & time{" "}
            <span className="text-red-500 ml-1 text-xl">*</span>
          </label>
          <div
            onClick={() => document.getElementById("dobInput").focus()}
            className="h-12 border w-full mt-2 rounded bg-transparent relative px-4"
          >
            <span
              onClick={() => document.getElementById("dobInput").focus()}
              className="absolute right-3 top-1/2 -translate-y-[30%] lg:hidden"
            >
              <iconify-icon icon="solar:calendar-outline"></iconify-icon>
            </span>
            <input
              type="datetime-local"
              onChange={(e) => {
                setBookingProp({
                  ...bookingProp,
                  dateTime: e.target.value,
                });
              }}
              placeholder="Date of birth"
              className="appearance-none w-fit lg:w-full h-full bg-transparent  outline-none"
              name=""
              id="dobInput"
            />
          </div>
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
            Choose service type <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 -translate-y-[30%]">
              <iconify-icon icon="icon-park-outline:down"></iconify-icon>
            </span>
            <select
              id="serviceTypeValue"
              onChange={(e) => {
                setBookingProp({
                  ...bookingProp,
                  serviceType: e.target.value,
                });
              }}
              className="px-4 h-12 border w-full mt-2 appearance-none rounded bg-transparent"
              name=""
            >
              {services.map((service, index) => {
                return (
                  <option key={index} value={service.name}>
                    {service.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="lg:col-span-2">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Anything else we should know?
          </label>
          <textarea
            name=""
            onChange={(e) => {
              setBookingProp({
                ...bookingProp,
                notes: e.target.value,
              });
            }}
            value={bookingProp.notes}
            className="resize-none w-full h-full border px-4 py-3 mt-2 rounded"
            placeholder="Your text here"
            id=""
          ></textarea>
        </div>
      </div>
      <div className="mt-20 flex items-center space-x-3">
        <button
          onClick={() => createBooking()}
          disabled={loading}
          className="flex disabled:opacity-50 items-center justify-center space-x-2 w-fit lg:px-5 px-5 py-3 rounded bg-blue-500 text-white text-sm"
        >
          {loading ? (
            <iconify-icon height="24" icon="eos-icons:loading"></iconify-icon>
          ) : (
            <iconify-icon
              height="23"
              icon="icon-park-solid:check-one"
            ></iconify-icon>
          )}
          <span>Save changes & proceed</span>
        </button>
      </div>
    </div>
  );
}

export default Schedule;
