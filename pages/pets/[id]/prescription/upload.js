/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import Chip from "@/components/Prescription/Chip";
import { useRouter } from "next/router";

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

function UploadPrescription({ pet }) {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const inputRef = useRef(null);

  const [prescription, setPrescription] = useState({
    for: pet.name,
    doctor: "Dr. Souradeep Adhikary",
    date: "",
    reason: "",
    notes: "",
    weight: pet.weight,
    temperature: "",
    files: [],
  });

  const handleFileChange = (e) => {
    const eFiles = e.target.files;
    setFiles([...files, ...eFiles]);
  };

  const handleSave = async () => {
    if (prescription.date == "" || prescription.reason == "") {
      alert("* fields are required");
      return;
    }
    if (files.length == 0) {
      alert("Please upload atleast one file");
      return;
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
        const { fileUrl } = await res.json();
        fileParamArray.push({
          url: fileUrl,
          name: files[i].name,
          type: files[i].type,
        });
      }
    }

    const recordObj = {
      petId: pet._id,
      date: prescription.date,
      reason: prescription.reason,
      doctor: prescription.doctor,
      notes: prescription.notes,
      files: fileParamArray,
      weight: prescription.weight,
      temperature: prescription.temperature,
      parentEmail: pet.parentEmail,
    };

    const res = await fetch("/api/prescription/upload", {
      method: "POST",
      body: JSON.stringify(recordObj),
    });

    const { success, prescription_id } = await res.json();

    if (success) {
      setLoading(false);
      console.log(prescription_id);
      alert("Prescription uploaded successfully");
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
          Upload <span className="text-pink-500">prescription</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          Upload prescription or medical records for your pet
        </p>
      </div>
      <div className="mt-10 flex items-center overflow-auto whitespace-nowrap space-x-3">
        <input
          multiple
          onChange={(e) => handleFileChange(e)}
          type="file"
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
          <span>Choose file</span>
        </button>
        {files.map((file, index) => {
          return (
            <Chip index={index} setFiles={setFiles} key={index} file={file} />
          );
        })}
      </div>

      <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6">
        <div className="opacity-60">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            For
          </label>
          <input
            type="text"
            value={pet.name}
            readOnly
            className="px-4 h-12 border w-full mt-2 rounded outline-none"
            placeholder="How would you like to call your pet?"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Date of visit <span className="text-red-500 ml-1 text-xl">*</span>
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
              value={prescription.date}
              onChange={(e) =>
                setPrescription({
                  ...prescription,
                  date: e.target.value,
                })
              }
              placeholder="Date of visit to the vet"
              className="appearance-none w-fit lg:w-full h-full bg-transparent outline-none"
              name=""
              id="dobInput"
            />
          </div>
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Reason for visit
          </label>
          <input
            type="text"
            value={prescription.reason}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                reason: e.target.value,
              })
            }
            className="px-4 h-12 border w-full mt-2 rounded "
            placeholder="What's the reason for your visit?"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Body weight
          </label>
          <input
            type="text"
            value={prescription.weight}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                weight: e.target.value,
              })
            }
            className="px-4 h-12 border w-full mt-2 rounded "
            placeholder="What's the reason for your visit?"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Temperature (F)
          </label>
          <input
            type="text"
            value={prescription.temperature}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                temperature: e.target.value,
              })
            }
            className="px-4 h-12 border w-full mt-2 rounded "
            placeholder="Body teemperature in farenheit"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
            Consulting doctor <span className="text-red-500 text-lg">*</span>
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 -translate-y-[30%]">
              <iconify-icon icon="icon-park-outline:down"></iconify-icon>
            </span>
            <select
              value={prescription.doctor}
              onChange={(e) =>
                setPrescription({ ...prescription, doctor: e.target.value })
              }
              className="px-4 h-12 border w-full mt-2 appearance-none rounded bg-transparent"
              name=""
              id=""
            >
              <option value="Dr. Souradeep Adhikary">
                Dr. Souradeep Adhikary
              </option>
              <option value="Dr. Mrinal Kanti Dey">Dr. Mrinal Kanti Dey</option>
            </select>
          </div>
        </div>
        <div className="lg:col-span-2">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Anything else we should note?
          </label>
          <textarea
            name=""
            value={prescription.notes}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                notes: e.target.value,
              })
            }
            className="resize-none w-full h-full border px-4 py-3 mt-2 "
            placeholder="Any other notes?"
            id=""
          ></textarea>
        </div>
      </div>

      <div className="mt-20 flex items-center space-x-3">
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
    </div>
  );
}

export default UploadPrescription;
