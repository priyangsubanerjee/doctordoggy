/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function ScheduleFirstAppointment() {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto rounded-md mt-7">
      <img
        src="https://thumbs.dreamstime.com/b/deworming-tablets-animals-black-line-icon-deworming-tablets-animals-black-line-icon-pictogram-web-page-mobile-app-279381456.jpg"
        className="h-32 mt-4"
        alt=""
      />
      <Button
        onClick={() => {
          document.getElementById("scheduleTrigger").click();
        }}
        className="w-fit rounded-md bg-neutral-100 text-sm text-black"
        radius="none"
      >
        <Icon height={20} icon="solar:calendar-outline" />
        Schedule first appointment
      </Button>
    </div>
  );
}

export default ScheduleFirstAppointment;
