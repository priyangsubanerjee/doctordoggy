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
  const [loading, setLoading] = React.useState(false);
  const [confirmDelete, setconfirmDelete] = React.useState(false);

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

  const ConfirmDeleteModal = () => {
    return (
      <>
        {confirmDelete && (
          <div className="fixed inset-0 h-full :w-full z-50 bg-slate-200/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white -translate-y-20 md:translate-y-0 rounded-md shadow-md px-5 md:px-10 py-7 h-fit w-full max-w-[95%] md:max-w-[450px]">
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 text-red-700 bg-red-50 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="font-semibold text-xl text-center mt-4">
                Delete this vaccination ?
              </h1>
              <p className="text-xs text-neutral-500 text-center leading-6 mt-2">
                Are you sure you want to delete this vaccination record? This is
                an irreversible action and will delete this record permanently.
              </p>
              <div className="grid grid-cols-2 mt-7 gap-2">
                <Button
                  onPress={() => setconfirmDelete(false)}
                  radius="none"
                  className="rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  radius="none"
                  className="rounded-md bg-red-600"
                  color="danger"
                  onPress={() => handleConfirmDelete()}
                  isLoading={loading}
                  isDisabled={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      toast.loading("Deleting vaccination record...");
      let deleteRequest = await axios.post(
        "/api/vaccine/delete",
        {
          id: vaccine.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.remove();
      if (deleteRequest.data.success) {
        toast.success(deleteRequest.data.message);
        setLoading(false);
        setconfirmDelete(false);
        router.push("/vaccination");
      } else {
        toast.error(deleteRequest.data.message);
        setLoading(false);
        setconfirmDelete(false);
      }
    } catch (error) {
      toast.remove();
      toast.error(error.message);
      setLoading(false);
      setconfirmDelete(false);
    }
  };

  useEffect(() => {
    if (router.query.vid == null) return;
    if (session.status == "authenticated") {
      (async () => {
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
                        <h1 className="text-lg font-semibold text-neutral-700">
                          Vaccination label
                        </h1>
                        <p className="text-xs mt-1 text-neutral-500">
                          Scanned from the original vaccination label.
                        </p>
                        <div className="space-y-3 mt-7">
                          {vaccine?.files?.map((file, index) => {
                            return (
                              <Link
                                key={index}
                                className="text-sm text-blue-600 flex items-center hover:underline"
                                href={file}
                              >
                                <img
                                  src={file}
                                  className="h-[100px] w-[200px] object-cover rounded-md overflow-hidden"
                                  alt=""
                                />
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
                              onPress={() => setconfirmDelete(true)}
                              radius="full"
                              className="px-6 py-2 bg-red-600 text-sm text-white mt-5"
                            >
                              Delete
                            </Button>
                            <ConfirmDeleteModal />
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
