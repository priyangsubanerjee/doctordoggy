import Link from "next/link";
import React from "react";

function DocumentCard({ document }) {
  return (
    <>
      <Link href={document.url} target="_blank">
        <div className="bg-blue-50 text-blue-600 font-medium px-5 py-3 rounded-md text-sm flex items-center">
          <span className="text-blue-600 h-fit mt-[4px]">
            {document.type.includes("image") ? (
              <iconify-icon icon="bi:image-fill"></iconify-icon>
            ) : document.type.includes("pdf") ? (
              <iconify-icon icon="dashicons:pdf"></iconify-icon>
            ) : (
              <iconify-icon icon="mdi:file"></iconify-icon>
            )}
          </span>
          <span className="ml-2">{document.name}</span>
          <span className="text-blue-600 h-fit mt-[4px] ml-auto">
            <iconify-icon icon="ion:open-outline"></iconify-icon>
          </span>
        </div>
      </Link>
    </>
  );
}

export default DocumentCard;
