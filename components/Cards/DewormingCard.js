/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

function DewormingCard({ deworming, UDS }) {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center">
        <img
          src={deworming.image}
          className="h-6 w-6 rounded-full object-cover"
          alt=""
        />
        <p className="text-xs ml-2 text-neutral-500">{deworming.name}</p>
        <p
          style={{
            background: deworming.status == "DUE" ? "#000" : "rgb(37 99 235)",
          }}
          className="text-white bg-neutral-800 text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2"
        >
          {deworming.status}
        </p>
        <Dropdown>
          <DropdownTrigger>
            <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
              <Icon height={20} icon="pepicons-pencil:dots-y" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={deworming.status == "DUE" ? ["certificate"] : []}
            onAction={(key) => {
              switch (key) {
                case "delete":
                  router.push(
                    `/deworming/${deworming.id}/delete?redirect=${window.location}`
                  );
                  break;
                case "done":
                  UDS(deworming.id, "DONE");
                  break;
                case "due":
                  UDS(deworming.id, "DUE");
                  break;
                default:
                  break;
              }
            }}
            aria-label="Static Actions"
          >
            <DropdownItem key="certificate">Certificate</DropdownItem>
            {deworming.status == "DUE" ? (
              <DropdownItem key="done">Mark as done</DropdownItem>
            ) : (
              <DropdownItem key="due">Mark as due</DropdownItem>
            )}

            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete record
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="mt-3">
        <h1 className="text-base font-semibold text-neutral-700">
          {deworming.medicineName}
        </h1>

        {deworming.status == "DONE" ? (
          <div className="flex items-center mt-3">
            <Icon icon="solar:calendar-line-duotone" />
            <p className="text-sm text-neutral-500 ml-2">
              Done on{" "}
              <span className="text-neutral-700">
                {new Date(deworming.doneDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        ) : (
          <div className="flex items-center mt-3">
            <Icon icon="solar:calendar-line-duotone" />
            <p className="text-sm text-neutral-500 ml-2">
              Due on{" "}
              <span className="text-neutral-700">
                {new Date(deworming.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        )}
        <div className="flex items-center mt-3">
          <Icon icon="icon-park-solid:medicine-bottle-one" />
          <p className="text-sm text-neutral-500 ml-2">{deworming.dosage}</p>
        </div>
      </div>
    </div>
  );
}

export default DewormingCard;
