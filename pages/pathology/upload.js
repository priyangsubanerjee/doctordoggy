/* eslint-disable @next/next/no-img-element */
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
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let pets = [];
//   if (session) {
//     pets = await getPersonalPet(session?.user?.email);
//     pets = (await JSON.parse(JSON.stringify(pets))) || [];
//   } else {
//     pets = [];
//   }
//   return {
//     props: { pets }, // will be passed to the page component as props
//   };
// }

function UploadPathology() {
  const router = useRouter();
  const fileRef = useRef(null);

  const session = useSession();
  const { updatedModal } = useContext(GlobalStates);
  const [pets, setPets] = React.useState([]);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [pathProps, setpathProps] = React.useState({
    testName: "",
    referredBy: "",
    testedOn: "",
    bodyWeight: selectedPet?.bodyWeight || "",
    temperature: "",
    notes: "",
    files: [],
  });

  useEffect(() => {
    setpathProps({
      ...pathProps,
      bodyWeight: selectedPet?.bodyWeight || "",
    });
  }, [selectedPet]);

  const performChecks = () => {
    if (!selectedPet) {
      toast.error("Please select a pet");
      return false;
    }
    if (!pathProps.testName) {
      toast.error("Please enter the test name");
      return false;
    }
    if (pathProps.files.length === 0) {
      toast.error("Please upload a prescription");
      return false;
    }
    if (!pathProps.referredBy) {
      toast.error("Please enter the reason for visit");
      return false;
    }
    if (!pathProps.testedOn) {
      toast.error("Please enter the date of visit");
      return false;
    }

    if (!pathProps.bodyWeight) {
      toast.error("Please enter the body weight");
      return false;
    }
    if (!pathProps.temperature) {
      toast.error("Please enter the temperature");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (performChecks()) {
      try {
        let fileUrls = [];
        if (pathProps.files.length > 0) {
          updatedModal(true, "Uploading files");
          for (let i = 0; i < pathProps.files.length; i++) {
            let file = pathProps.files[i];
            let { fileUrl } = await uploadImage(file);
            fileUrls.push(fileUrl);
          }
        }
        updatedModal(true, "Uploading prescription");
        await axios.post("/api/pathology/create", {
          ...pathProps,
          image: selectedPet.image,
          name: selectedPet.name,
          petId: selectedPet.id,
          parentEmail: selectedPet.parentEmail,
          files: fileUrls,
        });
        updatedModal(true, "Uploaded prescription");
        router.push(router.query.redirect || "/pathology");
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
            setpathProps({
              ...pathProps,
              files: pathProps.files.filter((f) => f.name !== file.name),
            });
          }}
          className="ml-3"
        >
          <Icon height={20} icon="eva:close-outline" />
        </button>
      </div>
    );
  };

  const FPBE = async () => {
    let petsRequest = await axios.post(
      "/api/pet/get_rf",
      {
        email: session?.data?.user?.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (petsRequest.data.success) {
      setPets(petsRequest.data.pets);
      setPageLoaded(true);
    } else [toast.error(petsRequest.data.message)];
  };

  useEffect(() => {
    if (session.status === "authenticated") FPBE();
  }, [session.status]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Upload Pathology Record
      </h1>

      <>
        {pageLoaded == false ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <>
            {pets.length == 0 ? (
              <div className="flex flex-col items-center justify-center mt-16">
                <img
                  src="https://i.pinimg.com/736x/4d/56/55/4d5655184db8716367bad5e6009dfc61.jpg"
                  className="h-24"
                  alt=""
                />
                <p className="mt-6 text-sm text-neutral-500">
                  You have not registered any pet yet.{" "}
                </p>

                <Link href="/pets/register" className="mt-8">
                  <Button
                    radius="none"
                    className="bg-black text-white px-4 rounded-md"
                  >
                    Register first pet ⌛️
                  </Button>
                </Link>
              </div>
            ) : (
              <>
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
                <div className="mt-10 flex items-center max-w-4xl ml-5 lg:mx-auto  overflow-auto whitespace-nowrap">
                  <Button
                    onPress={() => fileRef.current.click()}
                    className="rounded-full bg-sky-100"
                    radius="full"
                  >
                    <div className="px-3 flex items-center">
                      <span className="text-sm text-neutral-700">
                        Choose file
                      </span>
                      <input
                        multiple
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          setpathProps({
                            ...pathProps,
                            files: [...pathProps.files, ...e.target.files],
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

                  {pathProps.files.length == 0 ? (
                    <p className="text-xs text-neutral-600 ml-3 ">
                      Upload a photo or a PDF file
                    </p>
                  ) : (
                    <div className="flex items-center ml-3">
                      {pathProps.files.map((file, i) => {
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
                    label="Record for"
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
                    label="Name of the test"
                    value={pathProps.testName}
                    onChange={(e) => {
                      setpathProps({
                        ...pathProps,
                        testName: e.target.value,
                      });
                    }}
                    type="text"
                    radius="none"
                    className="rounded-none "
                  />

                  <Input
                    label="Referred by (Doctor's name)"
                    value={pathProps.referredBy}
                    onChange={(e) => {
                      setpathProps({
                        ...pathProps,
                        referredBy: e.target.value,
                      });
                    }}
                    type="text"
                    radius="none"
                    className="rounded-none "
                  />

                  <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
                    <span className="text-sm h-full flex items-center text-neutral-500 shrink-0 border-r border-neutral-200 pr-4">
                      Tested on
                    </span>
                    <input
                      type="date"
                      onChange={(event) => {
                        setpathProps({
                          ...pathProps,
                          testedOn: event.target.value,
                        });
                      }}
                      value={pathProps.testedOn}
                      className="bg-transparent text-sm w-full pl-4 appearance-none outline-none"
                      name=""
                      id="datPicker"
                    />
                  </div>
                </div>
                <div className="mt-4 lg:mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
                  <Input
                    value={pathProps.bodyWeight}
                    onChange={(e) => {
                      setpathProps({
                        ...pathProps,
                        bodyWeight: e.target.value,
                      });
                    }}
                    label="Body weight (in kg)"
                    type="text"
                    radius="none"
                    className="rounded-none "
                  />

                  <Input
                    value={pathProps.temperature}
                    onChange={(e) => {
                      setpathProps({
                        ...pathProps,
                        temperature: e.target.value,
                      });
                    }}
                    label="Temperature (in °F)"
                    type="text"
                    radius="none"
                    className="rounded-none "
                  />

                  <Textarea
                    value={pathProps.notes}
                    onChange={(e) => {
                      setpathProps({
                        ...pathProps,
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
                    className="px-10 w-full lg:w-fit bg-black text-white rounded-md"
                    radius="none"
                  >
                    Submit
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default UploadPathology;
