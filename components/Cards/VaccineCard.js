/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function VaccineCard({ vaccine }) {
  const session = useSession();
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center">
        <img
          src={vaccine.image}
          className="h-6 w-6 rounded-full object-cover"
          alt=""
        />
        <p className="text-xs ml-2 text-neutral-800">{vaccine.name}</p>
        <p
          style={{
            background: vaccine.status == "DUE" ? "#000" : "rgb(37 99 235)",
          }}
          className="text-white text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2"
        >
          {vaccine.status}
        </p>
        <Dropdown>
          <DropdownTrigger>
            <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
              <Icon height={20} icon="pepicons-pencil:dots-y" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={
              vaccine.parentEmail != session.data.user.email
                ? ["delete", "update"]
                : []
            }
            onAction={(key) => {
              switch (key) {
                case "certificate":
                  router.push(`/vaccination/${vaccine.id}/certificate`);
                  break;
                case "delete":
                  setconfirmDeleteVaccination(vaccine.id);
                  break;
                case "update":
                  router.push(`/vaccination/${vaccine.id}/update`);
                  break;

                default:
                  break;
              }
            }}
            aria-label="Static Actions"
          >
            {vaccine.status == "DONE" && (
              <DropdownItem key="certificate">Certificate</DropdownItem>
            )}
            <DropdownItem key="update">Update record</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete record
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="mt-3">
        <Link href={`/vaccination/${vaccine.id}/certificate`}>
          <h1 className="text-base hover:text-blue-600 font-semibold text-neutral-700">
            {vaccine.vaccineName}
          </h1>
        </Link>
        <div className="flex items-center mt-3">
          <Icon icon="solar:calendar-line-duotone" />
          <p className="text-sm text-neutral-500 ml-2">
            Due on{" "}
            <span className="text-neutral-700">
              {new Date(vaccine.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default VaccineCard;
