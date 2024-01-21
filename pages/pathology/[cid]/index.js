/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPrescriptionById } from "@/prisma/prescription";
import calculateAge from "@/helper/age";
import { getPetById } from "@/prisma/pet";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Router, { useRouter } from "next/router";
import { getPathologyReportById } from "@/prisma/pathology";
import toast from "react-hot-toast";
import axios from "axios";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pet = null;
  let record = null;
  let isParent = false;
  let statusCode = 100;
  if (session) {
    record = await getPathologyReportById(context.params.cid);
    record = await JSON.parse(JSON.stringify(record));
    if (record) {
      pet = await getPetById(record.petId);
      pet = await JSON.parse(JSON.stringify(pet));
      if (session?.user?.email == record.parentEmail) {
        isParent = true;
        statusCode == 100;
      } else {
        if (pet.isPublic) {
          isParent = false;
          statusCode = 100;
        } else {
          isParent = false;
          statusCode = 101;
        }
      }
    } else {
      statusCode = 102;
    }
  }
  return {
    props: { session, record, isParent, pet, statusCode }, // will be passed to the page component as props
  };
}
export default function Prescription({ record, pet, statusCode, isParent }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [confirmDelete, setconfirmDelete] = React.useState(false);
  const Capitalize = (str) => {
    if (str == null) return "--";
    return str.charAt(0).toUpperCase() + str.slice(1);
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
                Delete this pathology ?
              </h1>
              <p className="text-xs text-neutral-500 text-center leading-6 mt-2">
                Are you sure you want to delete this pathology pathology? This
                is an irreversible action and will delete this record
                permanently.
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
      toast.loading("Deleting pathology...");
      let deleteRequest = await axios.post(
        "/api/pathology/delete",
        {
          id: record.id,
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
        router.push(`/pathology`);
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

  return (
    <>
      {statusCode == 100 ? (
        <div>
          <p className="text-center mt-20 text-sm lg:mt-16 text-neutral-500">
            Pathology uploaded for
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3">
              <div className="border h-16 rounded-md relative flex items-center px-4">
                <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                  Name of test
                </span>
                <p>{record?.testName}</p>
              </div>
              <div className="border h-16 rounded-md relative flex items-center px-4">
                <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                  Date of test
                </span>
                <p>
                  {new Date(record?.date).toDateString({
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="border h-16 rounded-md relative flex items-center px-4">
                <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
                  Refered by
                </span>
                <p>Dr. {Capitalize(record?.refererredBy)}</p>
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
                  Age on the day of test
                </span>
                <p>{calculateAge(pet?.dateOfBirth, record.date)}</p>
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
            </div>
            {isParent && (
              <div className="p-5 rounded-md mt-24 border">
                <h1>Danger zone</h1>
                <p className="text-xs text-neutral-500 mt-2">
                  This action is irreversible & will delete this record
                  completely.
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
            )}
          </div>
        </div>
      ) : statusCode == 101 ? (
        <p className="text-center text-sm mx-5 leading-6 mt-16">
          This record is private and can only be viewed by the parent. Ask
          parent to make their pet&apos;s profile public.
        </p>
      ) : statusCode == 102 ? (
        <p>Record not found</p>
      ) : (
        <p>Not authorized</p>
      )}
    </>
  );
}
