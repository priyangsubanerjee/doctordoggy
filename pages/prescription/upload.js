/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPersonalPet } from "@/prisma/pet";
import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import GlobalStates from "@/context/GlobalState";
import toast from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "@/helper/image";
import { useSession } from "next-auth/react";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let pets = [];
//   let vaccines = [];
//   if (session) {
//     pets = await getPersonalPet(session?.user?.email);
//     pets = (await JSON.parse(JSON.stringify(pets))) || [];
//   } else {
//     pets = [];
//   }
//   return {
//     props: { pets, vaccines }, // will be passed to the page component as props
//   };
// }

function UploadPrescription() {
  const fileRef = useRef(null);
  const { updatedModal } = useContext(GlobalStates);
  const session = useSession();

  const [pets, setPets] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [prescriptionProps, setPrescriptionProps] = React.useState({
    reasonOfVisit: "",
    dateOfVisit: new Date().toISOString().split("T")[0],
    doctorName: "",
    bodyWeight: "",
    temperature: "",
    notes: "",
    files: [],
  });

  const performChecks = () => {
    if (!selectedPet) {
      toast.error("Please select a pet");
      return false;
    }
    if (prescriptionProps.files.length === 0) {
      toast.error("Please upload a prescription");
      return false;
    }
    if (!prescriptionProps.reasonOfVisit) {
      toast.error("Please enter the reason for visit");
      return false;
    }
    if (!prescriptionProps.dateOfVisit) {
      toast.error("Please enter the date of visit");
      return false;
    }
    if (!prescriptionProps.doctorName) {
      toast.error("Please enter the doctor's name");
      return false;
    }
    if (!prescriptionProps.bodyWeight) {
      toast.error("Please enter the body weight");
      return false;
    }
    if (!prescriptionProps.temperature) {
      toast.error("Please enter the temperature");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (performChecks()) {
      try {
        let fileUrls = [];
        if (prescriptionProps.files.length > 0) {
          updatedModal(true, "Uploading files");
          for (let i = 0; i < prescriptionProps.files.length; i++) {
            let file = prescriptionProps.files[i];
            let { fileUrl } = await uploadImage(file);
            fileUrls.push(fileUrl);
          }
        }
        console.log(fileUrls);
        updatedModal(true, "Uploading prescription");
        await axios.post("/api/prescription/create", {
          ...prescriptionProps,
          image: selectedPet.image,
          name: selectedPet.name,
          petId: selectedPet.id,
          parentEmail: selectedPet.parentEmail,
          files: fileUrls,
        });
        updatedModal(true, "Uploaded prescription");
        window.location.href = "/prescription";
      } catch (error) {
        toast.error("Error uploading prescription");
      }
    }
  };

  const FileChip = ({ file }) => {
    return (
      <div className="rounded-full bg-neutral-100 flex items-center px-5 py-3">
        <span className="text-sm text-neutral-700">
          {file.name.length > 10
            ? file.name.slice(0, 10) + "..." + file.name.split(".")[1]
            : file.name}
        </span>
        <button
          onClick={() => {
            setPrescriptionProps({
              ...prescriptionProps,
              files: prescriptionProps.files.filter(
                (f) => f.name !== file.name
              ),
            });
          }}
          className="ml-3"
        >
          <Icon height={20} icon="eva:close-outline" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      if (session.status === "authenticated") {
        let pets = [];
        pets = await axios.post(
          "/api/pet/get",
          {
            email: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        pets = pets.data;
        setPets(pets);
        setPageLoaded(true);
      }
    })();
  }, [session.status]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Upload Prescription
      </h1>
      <div className="flex items-center justify-center space-x-2 mt-4 text-sm">
        <p>This record is for your peronal reference</p>
        <a
          href="/vaccination/schedule"
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Learn more</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
      </div>

      {pageLoaded == true ? (
        <>
          <div className="mt-10 flex items-center max-w-4xl ml-5 lg:mx-auto  overflow-auto whitespace-nowrap">
            <Button
              onPress={() => fileRef.current.click()}
              className="rounded-full bg-blue-100"
              radius="full"
            >
              <div className="px-3 flex items-center">
                <span className="text-sm text-neutral-700">Choose file</span>
                <input
                  multiple
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    setPrescriptionProps({
                      ...prescriptionProps,
                      files: [...prescriptionProps.files, ...e.target.files],
                    });
                  }}
                  ref={fileRef}
                  type="file"
                  hidden
                  name=""
                  id=""
                />
              </div>
            </Button>

            {prescriptionProps.files.length == 0 ? (
              <p className="text-xs text-neutral-600 ml-3 ">
                Upload a photo or a PDF file
              </p>
            ) : (
              <div className="flex items-center ml-3">
                {prescriptionProps.files.map((file, i) => {
                  return <FileChip key={i} file={file} />;
                })}
              </div>
            )}
          </div>
          <div className="mt-10 lg:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
            <Select
              onChange={(event) => {
                setSelectedPet(
                  pets.find((pet) => pet.id === event.target.value)
                );
              }}
              radius="none"
              label="Prescription for"
            >
              {pets.map((pet) => {
                return (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name}
                  </SelectItem>
                );
              })}
            </Select>
            <Input
              label="Reason for visit"
              value={prescriptionProps.reasonOfVisit}
              onChange={(e) => {
                setPrescriptionProps({
                  ...prescriptionProps,
                  reasonOfVisit: e.target.value,
                });
              }}
              type="text"
              radius="none"
              className="rounded-none "
            />

            <div className="flex items-center lg:justify-between h-[56px] bg-neutral-100 px-3">
              <span className="text-sm h-full flex items-center text-neutral-500 shrink-0 border-r border-neutral-200 pr-4">
                Visited on
              </span>
              <input
                type="date"
                onChange={(event) => {
                  setPrescriptionProps({
                    ...prescriptionProps,
                    dateOfVisit: event.target.value,
                  });
                }}
                value={prescriptionProps.dateOfVisit}
                className="bg-transparent text-sm w-fit h-full lg:w-full pl-4 appearance-none outline-none"
                id="datPicker"
              />
            </div>

            <Input
              label="Name of the doctor"
              value={prescriptionProps.doctorName}
              onChange={(e) => {
                setPrescriptionProps({
                  ...prescriptionProps,
                  doctorName: e.target.value,
                });
              }}
              type="text"
              radius="none"
              className="rounded-none "
            />
          </div>
          <div className="mt-4 lg:mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
            <Input
              value={prescriptionProps.bodyWeight}
              onChange={(e) => {
                setPrescriptionProps({
                  ...prescriptionProps,
                  bodyWeight: e.target.value,
                });
              }}
              label="Body weight (in kg)"
              type="text"
              radius="none"
              className="rounded-none "
            />

            <Input
              value={prescriptionProps.temperature}
              onChange={(e) => {
                setPrescriptionProps({
                  ...prescriptionProps,
                  temperature: e.target.value,
                });
              }}
              label="Temperature (in °F)"
              type="text"
              radius="none"
              className="rounded-none "
            />

            <Textarea
              value={prescriptionProps.notes}
              onChange={(e) => {
                setPrescriptionProps({
                  ...prescriptionProps,
                  notes: e.target.value,
                });
              }}
              label="Notes"
              radius="none"
              className="rounded-none lg:col-span-2"
            />
          </div>
          <div className="max-w-4xl mx-5 lg:mx-auto mt-10 flex justify-end">
            <Button
              onClick={handleSubmit}
              loading={isLoading}
              className="px-10 h-12 w-full lg:w-fit bg-black text-white rounded-md"
              radius="none"
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center mt-16">
            <Spinner size="lg" color="primary" />
          </div>
        </>
      )}
    </div>
  );
}

export default UploadPrescription;
