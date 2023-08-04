import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
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
  const [loading, setLoading] = useState(false);
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
      <div className="mt-10">
        <button className="flex items-center space-x-2 bg-pink-50 px-4 py-2 rounded-full text-sm">
          <iconify-icon
            height="20"
            icon="clarity:attachment-line"
          ></iconify-icon>
          <span>Choose file</span>
        </button>
      </div>
      <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6">
        <div>
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
            Reason for visit
          </label>
          <input
            type="text"
            className="px-4 h-12 border w-full mt-2 rounded outline-none"
            placeholder="What's the reason for your visit?"
            name=""
            id=""
          />
        </div>
        <div className="lg:col-span-2">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Anything else we should note?
          </label>
          <textarea
            name=""
            className="resize-none w-full h-full border px-4 py-3 mt-2 outline-none"
            placeholder="Any other notes?"
            id=""
          ></textarea>
        </div>
      </div>
      <div className="mt-20 flex items-center space-x-3">
        <button
          disabled={loading}
          className="flex disabled:opacity-50 items-center justify-center space-x-2 w-fit lg:px-5 px-5 py-3 rounded bg-pink-500 text-white text-sm"
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
