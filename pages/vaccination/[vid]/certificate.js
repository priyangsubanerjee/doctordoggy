/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function Certificate() {
  const router = useRouter();
  const session = useSession();
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [vaccine, setVaccine] = React.useState(null);
  const [pet, setPet] = React.useState(null);
  const [isparent, setIsParent] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);
  const [isAllowed, setIsAllowed] = React.useState(false);

  const Capitalize = (str) => {
    if (str == null) return "--";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const ShareCertificate = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Vaccination certificate",
          text: `https://doctordoggy.vercel.app/vaccination/${vaccine?.id}/certificate`,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(
        `https://doctordoggy.vercel.app/vaccination/${vaccine?.id}/certificate`
      );
      toast.success("Link copied to clipboard");
    }
  };

  useEffect(() => {
    if (router.query.vid == null) return;
    if (session.status == "authenticated") {
      (async () => {
        console.log(router.query.vid);
        let vaccineData = await axios.post(
          "/api/vaccine/getbyid",
          {
            id: router.query.vid,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (vaccineData.data.vaccination.vaccine != null) {
          if (vaccineData.data.vaccination.vaccine.status == "DUE") {
            toast.error("This vaccination is due. Please update it.");
            router.back();
          }
          let petRequest = await axios.post(
            "/api/pet/getbyid",
            {
              id: vaccineData.data.vaccination.vaccine.petId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setVaccine(vaccineData.data.vaccination.vaccine);
          setPet(petRequest.data.success ? petRequest.data.pet : null);
          setIsParent(
            session.data.user.email == petRequest.data.pet.parentEmail
          );
          setIsPublic(petRequest.data.pet.isPublic);
          setPageLoaded(true);

          if (session.data.user.email == petRequest.data.pet.parentEmail) {
            setIsAllowed(true);
          } else {
            if (petRequest.data.pet.isPublic) {
              setIsAllowed(true);
            } else {
              setIsAllowed(false);
            }
          }
        } else {
          setPageLoaded(true);
        }
      })();
    }
  }, [router.query.vid, session.status]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Beneficiary Details
      </h1>

      <>
        {pageLoaded == false ? (
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-neutral-500 text-sm">
              Loading vaccination certificate please wait.
            </p>
            <Spinner className="mt-16" size="lg" color="primary" />
          </div>
        ) : (
          <>
            {vaccine != null ? (
              <>
                {isAllowed == false ? (
                  <>
                    <p className="text-center text-sm mx-auto max-w-sm md:max-w-xl leading-7 mt-4">
                      This record is private and can only be viewed by the
                      parent. Ask parent to make their pet&apos;s profile
                      public.
                    </p>
                  </>
                ) : (
                  <>
                    {vaccine.doneAt == null ? (
                      <p className="text-xs md:text-sm text-center text-neutral-800 mt-3 md:mt-4 w-fit max-w-[300px] md:max-w-3xl mx-auto bg-yellow-500/10 px-4 py-1 rounded-md lg:rounded-full leading-5">
                        This vaccination was not administered by @DoctorDoggy or
                        any of its affiliates.
                      </p>
                    ) : (
                      <p className="text-xs md:text-sm text-center text-neutral-800 mt-3 md:mt-4 w-fit max-w-[300px] md:max-w-3xl mx-auto bg-teal-500/10 px-4 py-1 rounded-md lg:rounded-full leading-5">
                        This vaccination was administered by DoctorDoggy
                      </p>
                    )}
                    <div className="mt-10">
                      <img
                        src={pet?.image}
                        className="lg:h-40 lg:w-40 h-32 w-32 mx-auto rounded-full object-cover"
                        alt=""
                      />

                      <div className="flex items-center justify-center mt-6 space-x-2">
                        <Link href={`/pets/${pet.id}`}>
                          <button className="text-xs py-1 px-3 border rounded-full space-x-2 bg-neutral-50 flex items-center">
                            <span>{pet?.name}&apos;s profile</span>
                            <Icon icon="ep:right" />
                          </button>
                        </Link>
                        <button
                          onClick={() => ShareCertificate()}
                          className="text-xs py-1 px-3 border rounded-full space-x-2 bg-neutral-50 flex items-center"
                        >
                          <span>Share</span>
                          <Icon height={13} icon="pajamas:doc-text" />
                        </button>
                      </div>
                    </div>
                    <div className="max-w-2xl mx-3 md:mx-auto pb-16 mt-7 lg:mt-10 ">
                      <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-3">
                        <div className="border h-16 rounded-md relative flex items-center px-3 lg:px-4">
                          <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                            Name
                          </span>
                          <p className="text-sm">{Capitalize(pet?.name)}</p>
                        </div>
                        <div className="border h-16 rounded-md relative flex items-center px-3 lg:px-4">
                          <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                            Date of Birth
                          </span>
                          <p className="text-sm">
                            {new Date(pet?.dateOfBirth).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="border h-16 rounded-md relative flex items-center px-3 lg:px-4">
                          <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                            Due date
                          </span>
                          <p className="text-sm">
                            {new Date(vaccine?.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="border h-16 rounded-md relative flex items-center px-3 lg:px-4">
                          <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                            Done on
                          </span>
                          <p className="text-sm">
                            {new Date(vaccine?.doneDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="border h-16 rounded-md relative flex items-center px-3 lg:px-4">
                          <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                            Vaccine name
                          </span>
                          <p className="text-sm">
                            {Capitalize(vaccine?.vaccineName)}
                          </p>
                        </div>
                        <div className="border h-16 rounded-md relative flex items-center px-3 lg:px-4">
                          <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                            Done by (Dr.)
                          </span>
                          <p className="text-sm">
                            {Capitalize(vaccine?.doneBy)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-20">
                        <h1 className="text-xl font-semibold text-neutral-700">
                          Attached documents
                        </h1>
                        <div className="space-y-3 mt-4">
                          {vaccine?.files?.map((file, index) => {
                            return (
                              <Link
                                key={index}
                                className="text-sm text-blue-600 flex items-center hover:underline"
                                href={file}
                              >
                                <Icon icon="uiw:paper-clip" />{" "}
                                <span className="ml-2">View document</span>
                              </Link>
                            );
                          })}
                          {vaccine?.files?.length == 0 && (
                            <p className="text-sm text-neutral-500">
                              No documents attached
                            </p>
                          )}
                        </div>
                        <div className="space-y-3 mt-4"></div>
                      </div>

                      {isparent && (
                        <>
                          <div className="p-5 rounded-md mt-24 border">
                            <h1>Update zone</h1>
                            <p className="text-xs text-neutral-500 mt-2">
                              Update this record if you&apos;ve made a mistake.
                            </p>
                            <Button
                              radius="full"
                              onPress={() =>
                                router.push(
                                  `/vaccination/${vaccine?.id}/update`
                                )
                              }
                              className="px-6 py-2 bg-neutral-800 text-sm text-white mt-5"
                            >
                              Update
                            </Button>
                          </div>
                          <div className="p-5 rounded-md mt-5 border">
                            <h1>Danger zone</h1>
                            <p className="text-xs text-neutral-500 mt-2">
                              This action is irreversible & will delete this
                              record completely.
                            </p>
                            <Button
                              onPress={() =>
                                router.push(
                                  `/vaccination/${vaccine?.id}/delete`
                                )
                              }
                              radius="full"
                              className="px-6 py-2 bg-red-600 text-sm text-white mt-5"
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <p className="text-center text-sm mx-5 leading-6 mt-3">
                  This vaccination record does not exist. It may have been
                  deleted.
                </p>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Certificate;
