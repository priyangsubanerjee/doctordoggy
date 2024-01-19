/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function ScheduleFirstVaccination() {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto rounded-md mt-7">
      <img
        src="https://media.istockphoto.com/id/1270369073/vector/pet-vaccination-icon-logo-of-animal-chipping.jpg?s=612x612&w=0&k=20&c=FfAQ1vht8FiI3DH9hZ1LDRz7qVfBvg8oM4f3-dh_W7k="
        className="h-32 mt-10"
        alt=""
      />
      <Link className="mt-8" href="/vaccination/schedule">
        <Button
          className="w-fit rounded-md bg-black text-sm text-white"
          radius="none"
        >
          <Icon height={20} icon="solar:calendar-outline" />
          Schedule first vaccination
        </Button>
      </Link>
    </div>
  );
}

export default ScheduleFirstVaccination;
