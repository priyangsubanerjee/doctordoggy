import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

function Appointments() {
  const router = useRouter();
  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Appointments
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button
          onClick={() => router.push("/appointments/schedule/online")}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Schedule online</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
        <button
          onClick={() => toast("Feature coming soon!")}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Schedule offline</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Appointments;
