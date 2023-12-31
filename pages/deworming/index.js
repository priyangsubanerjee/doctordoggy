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
import { useRouter } from "next/router";
import { getDewormingsByEmail } from "@/prisma/deworming";
import { useSession } from "next-auth/react";
import { FetchDewormings } from "@/hooks/fetch";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let dewormings = [];
//   if (session) {
//     dewormings = await getDewormingsByEmail(session?.user?.email);
//     dewormings = JSON.parse(JSON.stringify(dewormings));
//   }

//   return {
//     props: {
//       dewormings,
//     },
//   };
// }

function DewormingRepository() {
  const router = useRouter();
  const session = useSession();

  const [dewormings, setDewormings] = React.useState(null);

  useEffect(() => {
    if (session.status === "unauthenticated" || session.status == "loading")
      return;
    FetchDewormings(session?.data?.user?.email).then((res) => {
      setDewormings(res);
    });
  }, [session.status]);

  const DewormingCard = ({ deworming }) => {
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={deworming.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <p className="text-xs ml-2 text-neutral-500">{deworming.name}</p>
          <p className="text-white bg-neutral-800 text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2">
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
                    window.location.href = `/deworming/${deworming.id}/delete?redirect=${window.location}`;
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
            {deworming.medicineName}
          </h1>
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
          <div className="flex items-center mt-3">
            <Icon icon="icon-park-solid:medicine-bottle-one" />
            <p className="text-sm text-neutral-500 ml-2">{deworming.dosage}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Deworming Repository
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button
          onClick={() => router.push("/deworming/schedule")}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Schedule deworming</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
        <Link
          href={"/vaccination/schedule"}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Find help</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </Link>
      </div>

      {dewormings == null && (
        <div className="flex items-center justify-center mt-16">
          <Spinner color="primary" size="lg" />
        </div>
      )}
      {dewormings != null && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 max-w-6xl lg:mx-auto px-5">
            {dewormings.map((record, index) => (
              <DewormingCard key={index} deworming={record} />
            ))}
          </div>
          {dewormings.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-7">
              <img
                src="https://img.freepik.com/premium-vector/dog-vaccination-line-icon-white_116137-6952.jpg?w=2000"
                className="h-44"
                alt=""
              />
              <p className="text-sm -mt-4">No deworming records found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DewormingRepository;
