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
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { getDewormingsByEmail } from "@/prisma/deworming";
import { useSession } from "next-auth/react";
import { FetchDewormings } from "@/hooks/fetch";
import axios from "axios";
import toast from "react-hot-toast";
import ScheduleFirstDeworming from "@/components/FirstAction/ScheduleFirstDeworming";
import DewormingCard from "@/components/Cards/DewormingCard";

function DewormingRepository() {
  const router = useRouter();
  const session = useSession();
  const [dewormings, setDewormings] = React.useState(null);
  const [selected, setSelected] = React.useState("all");
  const [mappedDewormings, setmappedDewormings] = React.useState([]);

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

  useEffect(() => {
    if (session.status === "unauthenticated" || session.status == "loading")
      return;
    FDBES();
  }, [session.status]);

  useEffect(() => {
    if (dewormings == null) return;
    switch (selected) {
      case "all":
        setmappedDewormings(dewormings);
        break;
      case "done":
        setmappedDewormings(dewormings.filter((v) => v.status == "DONE"));
        break;
      case "due":
        setmappedDewormings(dewormings.filter((v) => v.status == "DUE"));
        break;
    }
  }, [selected]);

  useEffect(() => {
    if (dewormings == null) return;
    else {
      if (router.query.filter) {
        switch (router.query.filter) {
          case "all":
            setSelected("all");
            break;
          case "done":
            setSelected("done");
            break;
          case "due":
            setSelected("due");
            break;
          default:
            setSelected("all");
        }
      } else {
        switch (selected) {
          case "all":
            setmappedDewormings(dewormings);
            break;
          case "done":
            setmappedDewormings(dewormings.filter((v) => v.status == "DONE"));
            break;
          case "due":
            setmappedDewormings(dewormings.filter((v) => v.status == "DUE"));
            break;
        }
      }
    }
  }, [dewormings]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
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
          <>
            <div className="flex items-center justify-center mt-6 md:mt-10">
              <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="all" title="All"></Tab>
                <Tab key="done" title="Done"></Tab>
                <Tab key="due" title="Due"></Tab>
              </Tabs>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 md:mt-16 max-w-6xl lg:mx-auto px-5">
              {mappedDewormings.map((record, index) => (
                <DewormingCard
                  key={index}
                  deworming={record}
                  dewormings={dewormings}
                  setDewormings={setDewormings}
                />
              ))}
            </div>
          </>
        </>
      )}
    </div>
  );
}

export default DewormingRepository;
