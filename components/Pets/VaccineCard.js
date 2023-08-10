import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function VaccineCard({ record, pet }) {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this record?") == false)
      return;
    else {
      setLoading(true);
      const petId = pet._id;
      const vaccinationId = record._id;
      const res = await fetch("/api/vaccination/delete", {
        method: "POST",
        body: JSON.stringify({
          petId: petId,
          vaccinationId: vaccinationId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.reload();
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md border border-neutral-200 p-3 max-w-sm shrink-0">
      <p className="text-xs text-neutral-700 tracking-wider">
        {record.vaccineStatus == "due"
          ? "DUE " +
            record.dueDate.split("-")[2] +
            "-" +
            record.dueDate.split("-")[1] +
            "-" +
            record.dueDate.split("-")[0] +
            " | " +
            new Date(record.dueDate)
              .toLocaleDateString("en-US", {
                weekday: "long",
              })
              .toUpperCase()
          : record.dueDate.split("-")[2] +
            "-" +
            record.dueDate.split("-")[1] +
            "-" +
            record.dueDate.split("-")[0] +
            " | " +
            new Date(record.dueDate)
              .toLocaleDateString("en-US", {
                weekday: "long",
              })
              .toUpperCase()}
      </p>
      <h2 className="font-semibold mt-3 text-neutral-800">
        {record.vaccineName}
      </h2>
      <div className="flex items-center mt-4">
        {record.vaccineStatus == "due" ? (
          <button className="px-4 py-2 font-medium text-sm bg-green-50 text-green-900 rounded-md mr-5">
            Get an appointment
          </button>
        ) : (
          <Link href={`/pets/${pet._id}/vaccination/${record._id}`}>
            <button className="px-4 py-2 font-medium text-sm bg-blue-50 text-blue-900 rounded-md mr-5">
              View certificate
            </button>
          </Link>
        )}

        {pet.parentEmail == session.data.user.email && (
          <button
            onClick={() => alert("Delete")}
            style={{
              opacity: pet.parentEmail !== record.createdBy ? 0.5 : 1,
            }}
            className="px-4 py-2 font-medium text-sm bg-red-50 text-red-800 rounded-md ml-auto"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default VaccineCard;
