import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function DocumentCard({ doc }) {
  return (
    <>
      <Link href={doc.url} target="_blank">
        <div className="bg-blue-50 text-blue-600 font-medium px-5 py-3 rounded-md text-sm flex items-center">
          <span className="text-blue-600 h-fit mt-[4px]">
            {doc.type.includes("image") ? (
              <iconify-icon icon="bi:image-fill"></iconify-icon>
            ) : doc.type.includes("pdf") ? (
              <iconify-icon icon="dashicons:pdf"></iconify-icon>
            ) : (
              <iconify-icon icon="mdi:file"></iconify-icon>
            )}
          </span>
          <span className="ml-2">
            {doc.name.length > 20
              ? doc.name.substring(0, 20) + "..." + doc.name.split(".").pop()
              : doc.name}
          </span>
          <span className="text-blue-600 h-fit mt-[4px] ml-auto">
            <iconify-icon icon="ion:open-outline"></iconify-icon>
          </span>
        </div>
      </Link>
    </>
  );
}

export default DocumentCard;
