/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import { getVaccinesByEmail } from "@/prisma/vaccine";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FetchVaccinations } from "@/hooks/fetch";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let vaccinations = [];
//   if (session) {
//     vaccinations = await getVaccinesByEmail(session?.user?.email);
//     vaccinations = JSON.parse(JSON.stringify(vaccinations));
//   }

//   return {
//     props: {
//       vaccinations,
//     },
//   };
// }

function VaccinationHistory({}) {
  const session = useSession();
  const [vaccinations, setVaccinations] = React.useState(null);

  useEffect(() => {
    if (session.status == "loading" || session.status == "unauthenticated")
      return;

    FetchVaccinations(session.data.user.email).then((data) => {
      setVaccinations(data);
    });
  }, [session.status]);

  const VaccineCard = ({ vaccine }) => {
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={vaccine.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <p className="text-xs ml-2 text-neutral-500">{vaccine.name}</p>
          <p className="text-white bg-neutral-800 text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2">
            {vaccine.status}
          </p>
          <Dropdown>
            <DropdownTrigger>
              <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
                <Icon height={20} icon="pepicons-pencil:dots-y" />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={vaccine.status == "DUE" ? ["certificate"] : []}
              onAction={(key) => {
                switch (key) {
                  case "delete":
                    window.location.href = `/vaccination/${vaccine.id}/delete`;
                    break;
                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem key="certificate">Certificate</DropdownItem>
              <DropdownItem key="copy">Update record</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete record
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-3">
          <h1 className="text-base font-semibold text-neutral-700">
            {vaccine.vaccineName}
          </h1>
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
  };
  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Vaccination History
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <a
          href="/vaccination/schedule"
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Schedule vaccination</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
        <Link
          href={"/vaccination/schedule"}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Find centres</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </Link>
      </div>
      {vaccinations == null && (
        <div className="flex items-center justify-center mt-16">
          <Spinner color="primary" size="lg" className="" />
        </div>
      )}

      {vaccinations != null && (
        <>
          {vaccinations.length != 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 max-w-6xl lg:mx-auto mx-5">
              {vaccinations.map((vaccine, index) => (
                <VaccineCard key={index} vaccine={vaccine} />
              ))}
            </div>
          )}
          {vaccinations.length == 0 && (
            <div className="flex flex-col items-center justify-center mt-7">
              <img
                src="https://img.freepik.com/premium-vector/dog-vaccination-line-icon-white_116137-6952.jpg?w=2000"
                className="h-44"
                alt=""
              />
              <p className="text-sm -mt-4">No vaccination records found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default VaccinationHistory;
