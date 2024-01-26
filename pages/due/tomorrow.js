/* eslint-disable react-hooks/exhaustive-deps */
import DewormingCard from "@/components/Cards/DewormingCard";
import VaccineCard from "@/components/Cards/VaccineCard";
import { Icon } from "@iconify/react";
import { Card, CardBody, Spinner, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Tomorrow() {
  const router = useRouter();
  const session = useSession();
  const [selected, setSelected] = React.useState("all");
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [vaccinations, setVaccinations] = React.useState([]);
  const [dewormings, setDewormings] = React.useState([]);
  const [arrayGrid, setArrayGrid] = React.useState([]);

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/signin?next=/vaccination");
      return;
    } else if (session.status == "loading") {
      return;
    } else if (session.status == "authenticated") {
      (async () => {
        let dueRquest = await axios.post(
          "/api/due/tomorrow",
          {
            email: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (dueRquest.data.success) {
          setVaccinations(dueRquest.data.vaccines);
          setDewormings(dueRquest.data.dewormings);
          setArrayGrid([
            ...dueRquest.data.vaccines,
            ...dueRquest.data.dewormings,
          ]);
          setPageLoaded(true);
        }
      })();
    }
  }, [session.status]);

  useEffect(() => {
    setArrayGrid([...vaccinations, ...dewormings]);
  }, [vaccinations, dewormings]);

  useEffect(() => {
    switch (selected) {
      case "all":
        setArrayGrid([...vaccinations, ...dewormings]);
        break;
      case "vaccinations":
        setArrayGrid(vaccinations);
        break;
      case "dewormings":
        setArrayGrid(dewormings);
        break;
      default:
        break;
    }
  }, [selected]);

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Scheduled for tomorrow
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Link href="/due/today">
          <div className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
            <span>View due today</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </div>
        </Link>
      </div>

      {pageLoaded ? (
        <>
          <div className="flex items-center justify-center mt-6">
            <Tabs
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="all" title="All"></Tab>
              <Tab key="vaccinations" title="Vaccinations"></Tab>
              <Tab key="dewormings" title="Dewormings"></Tab>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 md:mt-16 max-w-6xl lg:mx-auto mx-5">
            {arrayGrid.map((due, index) => {
              return due.type == "vaccine" ? (
                <div key={index} className="relative h-full">
                  <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs tracking-widest bg-white px-4">
                    {due.type == "vaccine"
                      ? "Vaccination"
                      : due.type == "deworming"
                      ? "Deworming"
                      : due.type}
                  </span>
                  <VaccineCard
                    vaccine={due}
                    vaccinations={vaccinations}
                    setVaccinations={setVaccinations}
                  />
                </div>
              ) : (
                <div key={index} className="relative">
                  <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs tracking-widest bg-white px-4">
                    {due.type == "vaccine"
                      ? "Vaccination"
                      : due.type == "deworming"
                      ? "Deworming"
                      : due.type}
                  </span>
                  <DewormingCard
                    deworming={due}
                    dewormings={dewormings}
                    setDewormings={setDewormings}
                  />
                </div>
              );
            })}
          </div>
          {arrayGrid.length == 0 && (
            <div className="flex items-center justify-center mt-16 space-x-4">
              <Icon height={24} icon="solar:calendar-broken" />
              <p className="text-sm text-neutral-800">
                No scheduled {selected == "all" ? "activities" : selected} for
                tomorrow.{" "}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <Spinner size="lg" color="primary" />
        </div>
      )}
    </div>
  );
}

export default Tomorrow;
