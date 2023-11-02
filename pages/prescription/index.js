/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPrescriptionsByEmail } from "@/prisma/prescription";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let prescriptions = [];

  if (session) {
    prescriptions = await getPrescriptionsByEmail(session?.user?.email);
    prescriptions = JSON.parse(JSON.stringify(prescriptions));
  }

  return {
    props: {
      prescriptions,
    },
  };
}

function Prescriptions({ prescriptions = [] }) {
  const PrescriptionCard = ({ prescription }) => {
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={prescription.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <p className="text-xs ml-2 text-neutral-500">{prescription.name}</p>
          <p className="ml-auto mr-2 flex items-center space-x-1"></p>
          <Dropdown>
            <DropdownTrigger>
              <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
                <Icon height={20} icon="pepicons-pencil:dots-y" />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                switch (key) {
                  case "delete":
                    window.location.href = `/prescription/${prescription.id}/delete`;
                    break;
                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem key="new">Certificate</DropdownItem>
              <DropdownItem key="copy">Update record</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete record
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-3">
          <h1 className="text-base font-semibold text-neutral-700">
            {prescription.reasonOfVisit}
          </h1>
          <div className="flex items-center mt-3">
            <Icon icon="solar:calendar-line-duotone" />
            <p className="text-sm text-neutral-500 ml-2">
              <span className="text-neutral-700">
                {new Date(prescription.dateOfVisit).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Prescription Respository
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <a
          href="/prescription/upload"
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Upload prescription</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
        <a
          href={"/vaccination/schedule"}
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Find more help</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 max-w-6xl lg:mx-auto mx-5">
        {prescriptions.map((prescription, index) => (
          <PrescriptionCard key={index} prescription={prescription} />
        ))}
      </div>
    </div>
  );
}

export default Prescriptions;
