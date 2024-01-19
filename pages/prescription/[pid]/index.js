/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPrescriptionById } from "@/prisma/prescription";
import calculateAge from "@/helper/age";
import { getPetById } from "@/prisma/pet";
import { Icon } from "@iconify/react";
import { Button, Spinner } from "@nextui-org/react";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Prescription() {
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const session = useSession();
  const [pet, setPet] = React.useState(null);
  const [record, setRecord] = React.useState(null);
  const [isParent, setIsParent] = React.useState(false);
  const [isAllowed, setIsAllowed] = React.useState(false);
  const router = useRouter();

  const Capitalize = (str) => {
    if (str == null) return "--";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      (async () => {
        let prescriptionRequest = await axios.post(
          "/api/prescription/getbyid",
          { id: router.query.pid },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.data?.accessToken}`,
            },
          }
        );
        if (prescriptionRequest.data.success) {
          let petRequest = await axios.post(
            "/api/pet/getbyid",
            { id: prescriptionRequest.data.prescription.petId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.data?.accessToken}`,
              },
            }
          );
          if (petRequest.data.success) {
            if (session?.data?.user?.email == petRequest.data.pet.parentEmail) {
              setIsParent(true);
              setIsAllowed(true);
            } else {
              if (petRequest.data.pet.isPublic) {
                setIsParent(false);
                setIsAllowed(true);
              } else {
                setIsParent(false);
                setIsAllowed(false);
              }
            }
            setPet(petRequest.data.pet);
            setRecord(prescriptionRequest.data.prescription);
            setPageLoaded(true);
          } else {
            toast.error(petRequest.data.message);
          }
        } else {
          setPageLoaded(true);
        }
      })();
    }
  }, [router.query.pid, session.status]);

  return (
    <>
      {pageLoaded ? (
        <>
          {record ? (
            <>
              {isAllowed ? (
                <div>
                  <p className="text-center mt-20 text-sm lg:mt-16 text-neutral-500">
                    Prescription uploaded for
                  </p>

                  <div className="w-fit mx-auto relative">
                    <img
                      src={record.image}
                      className="h-32 w-32 rounded-full object-cover mx-auto mt-10"
                      alt=""
                    />
                    <button
                      onClick={() => router.push(`/pets/${pet?.id}`)}
                      className="absolute bottom-4 -right-1 h-8 w-8 bg-white hover:bg-neutral-200 rounded-full flex items-center justify-center"
                    >
                      <Icon icon="material-symbols:pets" />
                    </button>
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-4">
                    {record.name}
                  </h1>
                  <div className="flex items-center justify-center mt-3">
                    <button className="text-sm text-neutral-500">
                      Something&apos;s wrong with this record?{" "}
                      <span className="text-blue-600">Report</span>
                    </button>
                  </div>
                  <div className="max-w-3xl mx-3 lg:mx-auto pb-16 mt-10 lg:mt-16 ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Reason for visit
                        </span>
                        <p>{record?.reasonOfVisit}</p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Date of visit
                        </span>
                        <p>
                          {new Date(record?.dateOfVisit).toDateString({
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Doctor
                        </span>
                        <p>{Capitalize(record?.doctorName)}</p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Species
                        </span>
                        <p>{Capitalize(pet?.species)}</p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Breed
                        </span>
                        <p>{Capitalize(pet?.breed)}</p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Age on visit
                        </span>
                        <p>
                          {calculateAge(pet?.dateOfBirth, record.dateOfVisit)}
                        </p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Colour
                        </span>
                        <p>{Capitalize(pet?.color)}</p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Sex
                        </span>
                        <p>{Capitalize(pet?.sex)}</p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Temperature
                        </span>
                        <p>{Capitalize(record.temperature)} ℉</p>
                      </div>
                      <div className="border h-16 rounded-md relative flex items-center px-4">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Body weight
                        </span>
                        <p>{Capitalize(record?.bodyWeight)} Kg</p>
                      </div>
                      <div className="border h-24 rounded-md relative flex py-4 px-4 col-span-2">
                        <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                          Notes
                        </span>
                        <p>{Capitalize(record?.notes)}</p>
                      </div>
                    </div>
                    <div className=" my-16"></div>
                    <div>
                      <h1 className="text-xl font-semibold text-neutral-700">
                        Attached documents
                      </h1>
                      <div className="space-y-3 mt-4">
                        {record?.files?.map((file, index) => {
                          return (
                            <a
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 flex items-center hover:underline"
                              href={file}
                            >
                              <Icon icon="uiw:paper-clip" />{" "}
                              <span className="ml-2">View document</span>
                            </a>
                          );
                        })}
                      </div>
                      <div className="space-y-3 mt-4"></div>
                    </div>
                    {isParent && (
                      <div className="p-5 rounded-md mt-24 border">
                        <h1>Danger zone</h1>
                        <p className="text-xs text-neutral-500 mt-2">
                          This action is irreversible & will delete this record
                          completely.
                        </p>
                        <Button
                          onPress={() =>
                            Router.push(`/prescription/${record?.id}/delete`)
                          }
                          radius="full"
                          className="px-6 py-2 bg-red-600 text-sm text-white mt-5"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-center text-sm mx-5 leading-6 mt-16">
                  This record is private and can only be viewed by the parent.
                  Ask parent to make their pet&apos;s profile public.
                </p>
              )}
            </>
          ) : (
            <div>
              <p>This record does not exist or has been deleted.</p>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center mt-16">
            <h2 className="text-2xl font-semibold">Loading prescription</h2>
            <p className="text-sm text-neutral-500 mt-4">
              Please wait while we load additional data for your pet
            </p>
            <Spinner color="primary" size="lg" className="mt-10" />
          </div>
        </div>
      )}
    </>
  );
}
