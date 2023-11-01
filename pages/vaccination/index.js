import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 max-w-6xl lg:mx-auto mx-5">
        <div className="border rounded-md p-4">
          <div className="flex items-center">
            <div className="h-6 w-6 bg-neutral-400 rounded-full"></div>
            <p className="text-xs ml-2 text-neutral-500">Laddoo</p>
            <p className="text-white bg-neutral-800 text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2">
              DUE
            </p>
            <Dropdown>
              <DropdownTrigger>
                <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
                  <Icon height={20} icon="pepicons-pencil:dots-y" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Certificate</DropdownItem>
                <DropdownItem key="copy">Update record</DropdownItem>
                <DropdownItem key="edit">Find vaccination centres</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete record
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="mt-3">
            <h1 className="text-base font-semibold text-neutral-700">
              Anti Rabies Booster
            </h1>
            <div className="flex items-center mt-3">
              <Icon icon="solar:calendar-line-duotone" />
              <p className="text-sm text-neutral-500 ml-2">
                Due on{" "}
                <span className="text-neutral-700">12 December, 2023</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VaccinationHistory;
