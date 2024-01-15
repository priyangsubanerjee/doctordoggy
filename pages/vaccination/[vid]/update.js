/* eslint-disable react-hooks/exhaustive-deps */
import GlobalStates from "@/context/GlobalState";
import { uploadImage } from "@/helper/image";
import { Icon } from "@iconify/react";
import { Button, Input, Select, Spinner } from "@nextui-org/react";
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
  const [vaccinatonProp, setVaccinationProp] = React.useState({
    name: "",
    vaccineName: "",
    dueDate: "",
    vaccinatedOn: "",
    doneBy: "",
    filesPresent: [],
    files: [],
    status: "DONE",
  });

  const handleSubmit = async () => {
    if (vaccinatonProp.doneBy == "") {
      toast.error("Please enter the name of the doctor");
      return;
    } else {
      if (vaccinatonProp.vaccinatedOn == "") {
        toast.error("Please enter the date of vaccination");
        return;
      } else {
        setIsLoading(true);
        updatedModal(true, "Updating vaccination record");
        let fileUrls = [];
        if (vaccinatonProp.files.length > 0) {
          updatedModal(true, "Uploading files");
          for (let i = 0; i < vaccinatonProp.files.length; i++) {
            let file = vaccinatonProp.files[i];
            let { fileUrl } = await uploadImage(file);
            fileUrls.push(fileUrl);
          }
        }
        fileUrls = [...vaccinatonProp.filesPresent, ...fileUrls];
        updatedModal(true, "Updating vaccination record");
        try {
          let { data } = await axios.post("/api/vaccine/update", {
            id: router.query.vid,
            doneBy: vaccinatonProp.doneBy,
            doneDate: new Date(vaccinatonProp.vaccinatedOn).toISOString(),
            files: fileUrls,
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
      }
    }
  };

  const FileChip = ({ file, arr, i }) => {
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
            if (arr == "filesPresent") {
              let index = i;
              let files = vaccinatonProp.filesPresent;
              files.splice(index, 1);
              setVaccinationProp({
                ...vaccinatonProp,
                filesPresent: files,
              });
            } else {
              let index = i;
              let files = vaccinatonProp.files;
              files.splice(index, 1);
              setVaccinationProp({
                ...vaccinatonProp,
                files: files,
              });
            }
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
      let { data } = await axios.post(
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

      if (data.vaccination) {
        console.log(data.vaccination);
        setVaccinationProp({
          ...vaccinatonProp,
          name: data.vaccination.name,
          vaccineName: data.vaccination.vaccineName,
          dueDate: data.vaccination.dueDate,
          filesPresent: data.vaccination.files,
          doneBy: data.vaccination.doneBy,
          vaccinatedOn: data.vaccination.doneDate
            ? data.vaccination?.doneDate?.split("T")[0]
            : new Date().toLocaleDateString("en-CA"),
        });
        setPageLoaded(true);
      }
    })();
  }, [router.query.vid]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Update Vaccination Record
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
          href={"/vaccination/schedule"}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Find centres</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
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
                      setVaccinationProp({
                        ...vaccinatonProp,
                        files: [...vaccinatonProp.files, ...e.target.files],
                      });
                    }}
                    type="file"
                    hidden
                    name=""
                    id=""
                  />
                </div>
              </Button>

              {vaccinatonProp?.filesPresent?.length == 0 &&
              vaccinatonProp.files.length == 0 ? (
                <p className="text-xs text-neutral-600 ml-3 ">
                  Upload a photo or a PDF file
                </p>
              ) : (
                <div className="flex items-center ml-3 space-x-3">
                  {vaccinatonProp?.files?.map((file, i) => {
                    return <FileChip i={i} arr="files" key={i} file={file} />;
                  })}
                  {vaccinatonProp?.filesPresent?.map((file, i) => {
                    return (
                      <FileChip i={i} arr="filesPresent" key={i} file={file} />
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mt-8 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
              <Input
                radius="none"
                label="Vaccination for"
                isReadOnly
                value={vaccinatonProp.name}
              />
              <Input
                radius="none"
                label="Vaccine name"
                isReadOnly
                value={vaccinatonProp.vaccineName}
              />
              <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
                <span className="text-sm h-full flex items-center text-neutral-600 shrink-0 border-r border-neutral-200 pr-4">
                  Due date
                </span>
                <input
                  className="bg-transparent text-sm w-full h-full pl-4 outline-none"
                  value={new Date(vaccinatonProp.dueDate).toLocaleDateString()}
                  readOnly
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
                  className="bg-transparent text-sm w-full h-full pl-4 outline-none"
                  name=""
                  id="datPicker"
                  value={vaccinatonProp.vaccinatedOn}
                  onChange={(event) => {
                    setVaccinationProp({
                      ...vaccinatonProp,
                      vaccinatedOn: event.target.value,
                    });
                  }}
                />
              </div>
              <Input
                radius="none"
                label="Vaccinated by (Dr.)"
                value={vaccinatonProp.doneBy}
                onChange={(event) => {
                  setVaccinationProp({
                    ...vaccinatonProp,
                    doneBy: event.target.value,
                  });
                }}
              />
            </div>
            <div className="mt-10 max-w-4xl mx-5 lg:mx-auto flex items-center justify-between space-x-2">
              <p className="text-sm text-neutral-700 hidden lg:block">
                Having trouble?{" "}
                <Link className="text-blue-600 ml-1" href="/join-waitlist">
                  Contact us
                </Link>
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
            <p className="text-sm text-neutral-700 text-center mt-16 lg:hidden">
              Already vaccinated?{" "}
              <Link className="text-blue-600 ml-1" href="/join-waitlist">
                Upload certificate
              </Link>
            </p>
          </>
        )}
      </>
    </div>
  );
}

export default Update;
