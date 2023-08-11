import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import connectDatabase from "@/db/connect";
import pet from "@/db/models/pet";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const id = context.query.id;
  let currPet = null;
  const pid = context.query.pid;

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
    if (!currPet) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    } else {
      if (currPet.parentEmail !== session.user.email) {
        return {
          redirect: {
            destination: `/pets/${id}/prescription/${pid}`,
            permanent: false,
          },
        };
      }
    }
  }

  return {
    props: {
      session,
      pet: JSON.parse(JSON.stringify(currPet)),
    },
  };
}

function Delete() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const petId = router.query.id;
    const prescriptionId = router.query.pid;
    const res = await fetch("/api/prescription/delete", {
      method: "POST",
      body: JSON.stringify({
        pet_id: petId,
        prescription_id: prescriptionId,
      }),
    });
    const data = await res.json();
    if (data.success) {
      refreshPets();
      router.reload();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="w-full flex justify-center lg:py-[90px] bg-neutral-100 min-h-screen">
      <div className="lg:w-[550px] p-4 lg:p-8 h-fit lg:border w-full bg-white text-center">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 rounded-xl">
            <span className="text-red-600">
              <iconify-icon height="32" icon="ic:outline-delete"></iconify-icon>
            </span>
          </div>
        </div>
        <h1 className="text-lg font-semibold text-neutral-800 leading-[1.6] mt-6">
          Are you sure you want to delete this prescription?
        </h1>
        <p className="text-sm mt-3 text-neutral-600 leading-6">
          This change cannot be undone. This will permanently delete the medical
          record.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              handleCancel();
            }}
            className="py-3 bg-neutral-100 font-medium text-neutral-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="py-3 bg-red-600 font-medium text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
