/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
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
import { getVaccinesByEmail } from "@/prisma/vaccine";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FetchVaccinations } from "@/hooks/fetch";
import ScheduleFirstVaccination from "@/components/FirstAction/ScheduleFirstVaccination";
import toast from "react-hot-toast";
import VaccineCard from "@/components/Cards/VaccineCard";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin?next=/vaccination",
        permanent: false,
      },
    };
  }

  return {
    props: {
      auth: true,
    },
  };
}

function VaccinationHistory({}) {
  const router = useRouter();
  const session = useSession();
  const [mappedVaccinations, setMappedVaccinations] = React.useState([]);
  const [selected, setSelected] = React.useState("all");
  const [vaccinations, setVaccinations] = React.useState(null);

  useEffect(() => {
    if (session.status == "loading" || session.status == "unauthenticated")
      return;
    FetchVaccinations(session.data.user.email).then((data) => {
      if (data == null) {
        toast.error("Something went wrong");
        return;
      }
      setVaccinations(data);
      setMappedVaccinations(data);
    });
  }, [session.status]);

  useEffect(() => {
    if (vaccinations == null) return;

    switch (selected) {
      case "all":
        setMappedVaccinations(vaccinations);
        break;
      case "done":
        setMappedVaccinations(vaccinations.filter((v) => v.status == "DONE"));
        break;
      case "due":
        setMappedVaccinations(vaccinations.filter((v) => v.status == "DUE"));
        break;
    }
  }, [selected]);

  useEffect(() => {
    if (vaccinations == null) return;
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
            setMappedVaccinations(vaccinations);
            break;
          case "done":
            setMappedVaccinations(
              vaccinations.filter((v) => v.status == "DONE")
            );
            break;
          case "due":
            setMappedVaccinations(
              vaccinations.filter((v) => v.status == "DUE")
            );
            break;
        }
      }
    }
  }, [vaccinations]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Vaccination History
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Link href="/vaccination/schedule">
          <div className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
            <span>Schedule vaccination</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </div>
        </Link>
        <Link
          href={"/vaccination/uploadOld"}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Upload old records</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 md:t-16 lg:max-w-6xl lg:mx-auto px-5">
                {mappedVaccinations.map((vaccine, index) => (
                  <VaccineCard
                    key={index}
                    vaccine={vaccine}
                    vaccinations={vaccinations}
                    setVaccinations={setVaccinations}
                  />
                ))}
              </div>

              {mappedVaccinations.length == 0 && (
                <div className="flex items-center justify-center mt-16">
                  <span className="text-gray-500">No vaccinations found.</span>
                </div>
              )}
            </>
          )}
          {vaccinations.length == 0 && <ScheduleFirstVaccination />}
        </>
      )}
    </div>
  );
}

export default VaccinationHistory;
