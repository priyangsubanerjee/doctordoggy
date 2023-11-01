import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function VaccinationHistory() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Vaccination History
      </h1>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          Want to schedule a vaccination?
        </p>
        <Link
          href={"/vaccination/schedule"}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Schedule here</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default VaccinationHistory;
