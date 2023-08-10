/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import Chip from "@/components/Prescription/Chip";
import { useRouter } from "next/router";
import GlobalStates from "@/context/GlobalState";
import Switch from "react-switch";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const id = context.query.id;
  let currPet = null;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    await connectDatabase();
    currPet = await pet.findById(id);
  }

  return {
    props: {
      session,
      pet: JSON.parse(JSON.stringify(currPet)),
    },
  };
}

function Upload({ pet }) {
  const { refreshPets } = useContext(GlobalStates);
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [vaccineStatus, setVaccineStatus] = useState("due");

  const inputRef = useRef(null);

  const [vRecord, setVRecord] = useState({
    for: pet.name,
    due: "",
    vaccineName: "",
    doctor: "",
    files: [],
  });

  //   const decideVaccineStatus = (dueDate) => {
  //     const today = new Date().toLocaleDateString();
  //     const due = new Date(dueDate).toLocaleDateString();
  //     console.log(due, today);
  //     if (due < today) {
  //       console.log("older");
  //       return "older";
  //     } else if (due > today) {
  //       console.log("upcoming");
  //       return "upcoming";
  //     } else {
  //       console.log("today");
  //       return "today";
  //     }
  //   };

  const handleFileChange = (e) => {
    const eFiles = e.target.files;
    setFiles([...files, ...eFiles]);
  };

  const handleSave = async () => {
    if (vRecord.vaccineName == "") {
      alert("Please enter a vaccine name");
      return;
    }
    if (vRecord.due == "") {
      alert("Please enter a due date");
      return;
    }
    if (files.length == 0) {
      if (
        window.confirm("Are you sure you want to upload without any files?")
      ) {
        // do nothing
      } else {
        return;
      }
    }
    setLoading(true);

    let fileParamArray = [];
    if (files.length != 0) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        const res = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: formData,
        });
        const { fileUrl, publicId } = await res.json();

        fileParamArray.push({
          url: fileUrl,
          name: files[i].name,
          type: files[i].type,
          public_id: publicId,
        });
      }
    }

    const recordObj = {
      petId: pet._id,
      dueDate: vRecord.due,
      vaccineName: vRecord.vaccineName,
      vaccineStatus: vaccineStatus,
      notes: vRecord.notes,
      files: fileParamArray,
      createdBy: session.data.user.email,
    };

    const res = await fetch("/api/vaccination/create", {
      method: "POST",
      body: JSON.stringify(recordObj),
    });

    const { success, id } = await res.json();

    if (success) {
      refreshPets();
      setLoading(false);
      router.push(`/dashboard`);
    }
  };

  useEffect(() => {
    if (pet.parentEmail !== session.data.user.email) {
      router.push("/dashboard");
    }
  }, [pet]);

  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Schedule <span className="text-pink-500">vaccination</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          Upload vRecord or medical records for your pet
        </p>
      </div>

      <div className="mt-10 flex items-center overflow-auto whitespace-nowrap space-x-3">
        <input
          multiple
          onChange={(e) => handleFileChange(e)}
          type="file"
          accept="image/*,application/pdf"
          hidden
          ref={inputRef}
          name=""
          id=""
        />
        <button
          onClick={() => {
            inputRef.current.click();
          }}
          className="flex items-center space-x-2 bg-pink-50 hover:bg-pink-100 px-6 h-10 rounded-full text-sm shrink-0"
        >
          <iconify-icon
            height="20"
            icon="clarity:attachment-line"
          ></iconify-icon>
          <span>Choose label photo</span>
        </button>
        {files.map((file, index) => {
          return (
            <Chip index={index} setFiles={setFiles} key={index} file={file} />
          );
        })}
      </div>

      <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6">
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            For •{" "}
            <span className="text-blue-400 font-normal">
              You can&apos;t change this
            </span>
          </label>
          <input
            type="text"
            value={pet.name}
            readOnly
            className="px-4 h-12 border w-full mt-2 rounded outline-none opacity-60"
            placeholder="How would you like to call your pet?"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Due date <span className="text-red-500 ml-1 text-xl">*</span>
          </label>
          <div
            onClick={() => document.getElementById("dobInput").focus()}
            className="h-12 border w-full mt-2 rounded bg-transparent relative px-4"
          >
            <span
              onClick={() => document.getElementById("dobInput").focus()}
              className="absolute right-3 top-1/2 -translate-y-[30%] lg:hidden"
            >
              <iconify-icon icon="solar:calendar-outline"></iconify-icon>
            </span>
            <input
              type="date"
              value={vRecord.due}
              onChange={(e) => {
                setVRecord({
                  ...vRecord,
                  due: e.target.value,
                });
              }}
              placeholder="Date of visit to the vet"
              className="appearance-none w-fit lg:w-full h-full bg-transparent outline-none"
              name=""
              id="dobInput"
            />
          </div>
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Vaccine name
            <span className="text-red-500 ml-1 text-xl">*</span>
          </label>
          <input
            type="text"
            value={vRecord.vaccineName}
            onChange={(e) =>
              setVRecord({
                ...vRecord,
                vaccineName: e.target.value,
              })
            }
            className="px-4 h-12 border w-full mt-2 rounded "
            placeholder="Name of vaccine"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Vaccine status
            <span className="text-red-500 ml-1 text-xl">*</span>
          </label>
          <div className="px-4 h-12 border w-full mt-2 rounded outline-none flex items-center space-x-2 text-sm">
            <span
              style={{
                opacity: vaccineStatus === "due" ? 1 : 0.5,
              }}
            >
              Due
            </span>
            <Switch
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#10B981"
              onChange={() => {
                setVaccineStatus(vaccineStatus === "due" ? "done" : "due");
              }}
              checked={vaccineStatus === "done" ? true : false}
            />
            <span
              style={{
                opacity: vaccineStatus === "done" ? 1 : 0.5,
              }}
            >
              Done
            </span>
          </div>
        </div>
        <div className="lg:col-span-2">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Anything else we should note?
          </label>
          <textarea
            name=""
            value={vRecord.notes}
            onChange={(e) =>
              setVRecord({
                ...vRecord,
                notes: e.target.value,
              })
            }
            className="resize-none w-full h-full border px-4 py-3 mt-2 "
            placeholder="Any other notes?"
            id=""
          ></textarea>
        </div>
      </div>

      <div className="mt-20 bg-blue-50  lg:max-w-4xl p-3 rounded-md text-sm text-blue-600">
        <svg
          className="inline-block mr-2 -mt-[1px]"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M18 10a8 8 0 1 0-16 0a8 8 0 0 0 16 0ZM9.508 8.91a.5.5 0 0 1 .984 0L10.5 9v4.502l-.008.09a.5.5 0 0 1-.984 0l-.008-.09V9l.008-.09ZM9.25 6.75a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0Z"
          />
        </svg>
        <p className="inline-block">
          We do not claim the authenticity of this vaccine record. Please
          contact us for more information.
        </p>
      </div>

      <div className="mt-16 flex items-center space-x-3">
        <button
          onClick={() => handleSave()}
          disabled={loading}
          className="flex disabled:opacity-50 items-center justify-center space-x-2 w-fit lg:px-5 px-5 py-3 rounded bg-blue-500 text-white text-sm"
        >
          {loading ? (
            <iconify-icon height="24" icon="eos-icons:loading"></iconify-icon>
          ) : (
            <iconify-icon
              height="20"
              icon="icon-park-solid:check-one"
            ></iconify-icon>
          )}
          <span>Upload & proceed</span>
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 z-30 h-full w-full bg-black/50 flex items-center justify-center">
          <div className="px-10 py-8 bg-white rounded-lg">
            <h2 className="text-lg font-semibold text-neutral-700">
              Uploading vRecord
            </h2>
            <p className="text-[11px] lg:text-xs text-neutral-500 mt-3">
              This might take a few seconds
            </p>
            <div className="mt-8 w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full w-[40%] rounded-full bg-neutral-800 animate-indeterminate"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
