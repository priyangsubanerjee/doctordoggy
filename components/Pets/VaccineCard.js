import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function VaccineCard({ record, pet }) {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full rounded-md border border-neutral-200 p-3 max-w-sm shrink-0 z-0">
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
          <Link href={`tel:9996512944`}>
            <button className="px-4 py-2 font-medium text-sm bg-green-50 text-green-900 rounded-md mr-5">
              Contact us
            </button>
          </Link>
        ) : (
          <Link href={`/pets/${pet._id}/vaccination/${record._id}`}>
            <button className="px-4 py-2 font-medium text-sm bg-blue-50 text-blue-900 rounded-md mr-5">
              View certificate
            </button>
          </Link>
        )}

        {pet.parentEmail == session.data.user.email && (
          <Link
            className="ml-auto"
            href={`/pets/${pet._id}/vaccination/${record._id}/delete`}
          >
            <button className="px-4 py-2 font-medium text-sm bg-red-50 text-red-800 rounded-md">
              Delete
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default VaccineCard;
