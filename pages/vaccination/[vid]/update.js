/* eslint-disable react-hooks/exhaustive-deps */
import GlobalStates from "@/context/GlobalState";
import { uploadImage } from "@/helper/image";
import { Icon } from "@iconify/react";
import { Button, Input, Select, Slider, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

function Update() {
  const session = useSession();
  const router = useRouter();
  const fileRef = useRef(null);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cropppedImage, setCroppedImage] = React.useState(null);
  const [tempFile, setTempfile] = React.useState({
    data: null,
    name: null,
    type: null,
  });
  const [isCroppperOn, setIsCropperOn] = React.useState(false);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
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
        let fileUrls = [];
        if (vaccinatonProp.files.length > 0) {
          toast.loading("Uploading vaccination files");
          for (let i = 0; i < vaccinatonProp.files.length; i++) {
            let file = vaccinatonProp.files[i];
            let { fileUrl } = await uploadImage(file);
            fileUrls.push(fileUrl);
          }
        }
        toast.remove();
        toast.loading("Updating vaccination record");
        fileUrls = [...vaccinatonProp.filesPresent, ...fileUrls];
        try {
          let updateRequest = await axios.post("/api/vaccine/update", {
            id: router.query.vid,
            doneBy: vaccinatonProp.doneBy,
            doneDate: new Date(vaccinatonProp.vaccinatedOn).toISOString(),
            files: fileUrls,
          });

          toast.remove();
          if (updateRequest.data.success) {
            toast.success(updateRequest.data.message);
            setIsLoading(false);
            router.push(
              router.query.redirect ? router.query.redirect : "/vaccination"
            );
          } else {
            toast.error(updateRequest.data.message);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
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

  const dataURLtoFile = (dataurl, filename, type) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    let random4Alphabets = Math.floor(1000 + Math.random() * 9000);
    let extension = filename.split(".")[1];
    return new File([u8arr], random4Alphabets + "." + extension, {
      type,
    });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // convert to base64 image and set to state to preview in UI

    console.log(croppedArea, croppedAreaPixels);

    let canvas = document.createElement("canvas");

    // height 720 , width 1280px

    canvas.width = 1280;
    canvas.height = 720;
    let ctx = canvas.getContext("2d");
    let image = new Image();
    image.src = tempFile.data;
    image.onload = () => {
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        1280,
        720
      );
      let base64Image = canvas.toDataURL("image/jpeg");
      setCroppedImage(base64Image);
    };
  };

  useEffect(() => {
    (async () => {
      if (session.status == "authenticated") {
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
        if (data.vaccination.success) {
          if (data.vaccination.vaccine.parentEmail != session.data.user.email) {
            router.push("/vaccination");
          } else {
            setVaccinationProp({
              ...vaccinatonProp,
              name: data.vaccination.vaccine.name,
              vaccineName: data.vaccination.vaccine.vaccineName,
              dueDate: data.vaccination.vaccine.dueDate,
              filesPresent: data.vaccination.vaccine.files,
              doneBy: data.vaccination.vaccine.doneBy,
              vaccinatedOn: data.vaccination.vaccine.doneDate
                ? data.vaccination?.vaccine.doneDate?.split("T")[0]
                : new Date().toLocaleDateString("en-CA"),
            });
            setPageLoaded(true);
          }
        }
      }
    })();
  }, [router.query.vid, session.status]);

  useEffect(() => {
    if (tempFile.data != null) {
      setIsCropperOn(true);
    }
  }, [tempFile]);

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
                    accept="image/*"
                    ref={fileRef}
                    onChange={(e) => {
                      setTempfile({
                        data: URL.createObjectURL(e.target.files[0]),
                        name: e.target.files[0].name,
                        type: e.target.files[0].type,
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
                className="cursor-not-allowed"
                isDisabled
                isReadOnly
                value={vaccinatonProp.name}
              />
              <Input
                radius="none"
                isDisabled
                label="Vaccine name"
                className="cursor-not-allowed"
                isReadOnly
                value={vaccinatonProp.vaccineName}
              />
              <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
                <span className="text-sm h-full flex items-center text-neutral-400 shrink-0 border-r border-neutral-200 pr-4">
                  Due date
                </span>
                <input
                  className="bg-transparent text-sm w-full h-full pl-4 outline-none opacity-40"
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
            {isCroppperOn && (
              <div className="fixed inset-0 h-full w-full bg-black/50 z-50 flex items-end md:items-center justify-center">
                <div className="px-2 pt-6 pb-4 bg-white md:rounded-md w-full max-w-[350px] md:w-fit">
                  <h1 className="text-xl font-semibold text-center">
                    Crop label
                  </h1>
                  <p className="text-xs mt-1 text-neutral-500 text-center">
                    Crop the label to remove any unwanted information
                  </p>

                  <div className="relative h-[250px] w-[300px] mx-auto bg-slate-50 mt-6">
                    <Cropper
                      style={{
                        containerStyle: {
                          width: "300px",
                          height: "250px",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                        },
                      }}
                      image={tempFile.data}
                      crop={crop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <Slider
                      minValue={1}
                      step={0.01}
                      maxValue={6}
                      size="sm"
                      value={zoom}
                      className="w-1/2"
                      onChange={setZoom}
                    />
                    <Button
                      radius="none"
                      onClick={() => {
                        let file = dataURLtoFile(
                          cropppedImage,
                          tempFile.name,
                          tempFile.type
                        );

                        setVaccinationProp({
                          ...vaccinatonProp,
                          files: [file],
                          filesPresent: [],
                        });

                        setTempfile({
                          data: null,
                          name: null,
                          type: null,
                        });
                        setIsCropperOn(false);
                      }}
                      className="rounded-md bg-black text-white"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Update;
