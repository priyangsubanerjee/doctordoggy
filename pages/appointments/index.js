/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import AppointmentCard from "@/components/Cards/AppointmentCard";
import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Appointments() {
  const session = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const FetchAppointments = async () => {
    console.log(session.data.user.email);
    let fetchRequest = await axios.post("/api/appointments/get", {
      email: session.data.user.email,
    });
    if (fetchRequest.data.success) {
      console.log(fetchRequest.data.appointments);
      setAppointments(fetchRequest.data.appointments);
      setPageLoaded(true);
    } else {
      toast.error(fetchRequest.data.message);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      console.log("Session authenticated");
      FetchAppointments();
    }
  }, [session.status]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Appointments
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Dropdown className="rounded-xl z-30">
          <DropdownTrigger className="outline-none">
            <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
              <span>Schedule new</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </DropdownTrigger>

          <DropdownMenu
            onAction={async (key) => {
              switch (key) {
                case "online-vet":
                  router.push("/appointments/schedule/online");
                  break;
                default:
                  toast("Feature coming soon!");
                  break;
              }
            }}
            aria-label="Custom item styles"
          >
            <DropdownItem className="rounded-lg" key="online-vet">
              Online vet consultation
            </DropdownItem>

            <DropdownItem className="rounded-lg" key="account">
              In-person vet consultation
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="notifications">
              Grooming & Spa
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="edit">
              Boarding
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="logout">
              Dog Walking
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="logout">
              Training
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button
          onClick={() => toast("Feature coming soon!")}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Find help</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
      <>
        {pageLoaded ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 md:mt-12 max-w-6xl lg:mx-auto px-5">
              {appointments.map((appointment, index) => (
                <AppointmentCard
                  key={index}
                  appointment={appointment}
                  appointments={appointments}
                  setAppointments={setAppointments}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-8">
            <p className="text-gray-500">Loading appointments...</p>
          </div>
        )}
      </>
    </div>
  );
}

export default Appointments;
