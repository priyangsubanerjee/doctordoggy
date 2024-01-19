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
import axios from "axios";
import toast from "react-hot-toast";
import ScheduleFirstDeworming from "@/components/Cards/ScheduleFirstDeworming";

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

  // fetch dewormings by email
  const FDBES = async () => {
    let dewormingsRequest = await axios.post(
      "/api/deworming/read",
      {
        email: session?.data?.user?.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (dewormingsRequest.data.success) {
      setDewormings(dewormingsRequest.data.dewormings);
    } else {
      toast.error(dewormingsRequest.data.message);
    }
  };

  // update deworming status
  const UDS = async (id, status) => {
    toast.loading("Updating deworming status...");
    let updateRequest = await axios.post(
      "/api/deworming/update",
      { id, status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.remove();
    if (updateRequest.data.success) {
      toast.success(updateRequest.data.message);
      FDBES();
    } else {
      toast.error(updateRequest.data.message);
    }
  };

  useEffect(() => {
    if (session.status === "unauthenticated" || session.status == "loading")
      return;
    FDBES();
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
          href={"/join-waitlist?ref=find-help"}
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
          {dewormings.length === 0 && <ScheduleFirstDeworming />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 max-w-6xl lg:mx-auto px-5">
            {dewormings.map((record, index) => (
              <DewormingCard key={index} deworming={record} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DewormingRepository;
