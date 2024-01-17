/* eslint-disable react-hooks/exhaustive-deps */
import GlobalStates from "@/context/GlobalState";
import { uploadImage } from "@/helper/image";
import { Icon } from "@iconify/react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

function Update() {
  const session = useSession();
  const router = useRouter();
  const fileRef = useRef(null);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { updatedModal } = useContext(GlobalStates);
  const [pets, setPets] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [selectedVaccine, setSelectedVaccine] = React.useState(null);
  const [doneDate, setDoneDate] = React.useState();
  const [dueDate, setDueDate] = React.useState();
  const [doneBy, setDoneBy] = React.useState("");
  const [vaccines, setVaccines] = React.useState([]);

  const handleSubmit = async () => {
    if (selectedPet == null) {
      toast.error("Please select a pet");
      return;
    } else if (selectedVaccine == null) {
      toast.error("Please select a vaccine");
      return;
    } else if (doneDate == null) {
      toast.error("Please select a date");
      return;
    } else if (dueDate == null) {
      toast.error("Please select a date");
      return;
    } else if (doneBy == "") {
      toast.error("Please enter the name of the doctor");
      return;
    }

    setIsLoading(true);
    updatedModal(true, "Updating vaccination record");
    let fileUrls = [];
    if (files.length > 0) {
      updatedModal(true, "Uploading files");
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let { fileUrl } = await uploadImage(file);
        fileUrls.push(fileUrl);
      }
    }
    updatedModal(true, "Updating vaccination record");
    try {
      let { data } = await axios.post("/api/vaccine/uploadold", {
        doneBy: doneBy,
        doneDate: new Date(doneDate).toISOString(),
        dueDate: new Date(dueDate).toISOString(),
        files: fileUrls,
        petId: selectedPet.id,
        name: selectedPet.name,
        image: selectedPet.image,
        parent: selectedPet.parentEmail,
        vaccineName: selectedVaccine,
      });

      if (data.vaccine) {
        setIsLoading(false);
        updatedModal(false, "Vaccination record updated");
        router.push("/vaccination");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      updatedModal(false, "Error updating vaccination record");
      toast.error("Error updating vaccination record");
    }
  };

  const FileChip = ({ file, i }) => {
    return (
      <div className="rounded-full bg-neutral-100 flex items-center px-5 py-3">
        <span className="text-sm text-neutral-700">
          {file.name
            ? file.name?.length > 10
              ? file.name?.slice(0, 10) + "..." + file.name.split(".")[1]
              : file?.name
            : file.substring(8, 16) + "..." + file.split(".")[3]}
        </span>

        <button
          onClick={() => {
            let newFiles = files.filter((f) => f != file);
            setFiles(newFiles);
          }}
          className="ml-3"
        >
          <Icon height={20} icon="eva:close-outline" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      (async () => {
        let petRequest = await axios.post(
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
        var vaccineRequest = await axios.get("/api/booster/get");
        if (petRequest.data.success) {
          setPets(petRequest.data.pets);
          setVaccines(
            vaccineRequest.data.success ? vaccineRequest.data.boosters : []
          );
          setPageLoaded(true);
        }
      })();
    }
  }, [session.status]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Upload Old Vaccination Record
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
      </div>
      <>
        {pageLoaded == false ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
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
                    ref={fileRef}
                    onChange={(e) => {
                      setFiles([...files, ...e.target.files]);
                    }}
                    type="file"
                    hidden
                    name=""
                    id=""
                  />
                </div>
              </Button>

              {files.length == 0 ? (
                <p className="text-xs text-neutral-600 ml-3 ">
                  Upload a photo or a PDF file
                </p>
              ) : (
                <div className="flex items-center ml-3 space-x-3">
                  {files?.map((file, i) => {
                    return <FileChip i={i} key={i} file={file} />;
                  })}
                </div>
              )}
            </div>
            <div className="mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
              <Select
                onChange={(event) => {
                  setSelectedPet(
                    pets.find((pet) => pet.id === event.target.value)
                  );
                }}
                radius="none"
                label="Whom do you want to vaccinate?"
              >
                {pets.map((pet) => {
                  return (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </SelectItem>
                  );
                })}
              </Select>
              <Autocomplete
                onSelectionChange={(value) => {
                  setSelectedVaccine(value);
                }}
                radius="none"
                label="Select vaccine"
              >
                {vaccines.map((vaccine) => (
                  <AutocompleteItem key={vaccine.name} value={vaccine.name}>
                    {vaccine.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
                <span className="text-sm h-full flex items-center text-neutral-600 shrink-0 border-r border-neutral-200 pr-4">
                  Due on
                </span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => {
                    setDueDate(event.target.value);
                  }}
                  className="bg-transparent text-sm w-full h-full pl-4 outline-none"
                  name=""
                  id="datPicker"
                />
              </div>
              <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
                <span className="text-sm h-full flex items-center text-neutral-600 shrink-0 border-r border-neutral-200 pr-4">
                  Vaccinated on
                </span>
                <input
                  type="date"
                  value={doneDate}
                  onChange={(event) => {
                    setDoneDate(event.target.value);
                  }}
                  className="bg-transparent text-sm w-full h-full pl-4 outline-none"
                  name=""
                  id="datPicker"
                />
              </div>
              <Input
                radius="none"
                label="Vaccinated by (Dr.)"
                value={doneBy}
                onChange={(event) => {
                  setDoneBy(event.target.value);
                }}
              />
            </div>
            <div className="mt-10 max-w-4xl mx-5 lg:mx-auto flex items-center justify-between space-x-2">
              <p className="text-sm text-neutral-700 hidden lg:block">
                Authenticity unclaimed
              </p>
              <Button
                loading={isLoading}
                onClick={handleSubmit}
                className="px-10 w-full lg:w-fit bg-black text-white rounded-md"
                radius="none"
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default Update;
