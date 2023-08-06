import GlobalStates from "@/context/GlobalState";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

function RecordsCard({ record, pet }) {
  const router = useRouter();
  const { refreshPets } = useContext(GlobalStates);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    setLoading(true);
    const petId = pet._id;
    const prescriptionId = record._id;
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

  return (
    <>
      <div className="w-full rounded-md border border-neutral-200 p-3 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-700 tracking-wider">
            {record.date}
          </span>
          <span className="text-xs text-neutral-700">{record.doctor}</span>
        </div>
        <h2 className="font-semibold mt-3 text-neutral-800">{record.reason}</h2>
        <p className="text-xs mt-2 leading-5 text-neutral-600">
          {record.notes || "No notes provided"}
        </p>
        <div className="flex mt-4 w-full">
          <Link href={`/pets/${pet._id}/prescription/${record._id}`}>
            <button className="px-4 py-2 font-medium text-sm bg-blue-50 text-blue-900 rounded-md">
              Open file
            </button>
          </Link>

          <button
            onClick={() => handleDelete()}
            className="px-4 py-2 font-medium text-sm bg-red-50 text-red-800 rounded-md ml-auto"
          >
            Delete
          </button>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 z-30 h-full w-full bg-black/50 flex items-center justify-center">
          <div className="px-10 py-8 bg-white rounded-lg">
            <h2 className="text-lg font-semibold text-neutral-700">
              Deleting record
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
    </>
  );
}

export default RecordsCard;
