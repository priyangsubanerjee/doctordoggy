/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function UploadFirstPrescription() {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto rounded-md mt-7">
      <img
        src="https://www.shutterstock.com/image-vector/prescription-veterinary-medicine-pet-healthcare-600nw-2283028855.jpg"
        className="h-32 mt-4 grayscale"
        alt=""
      />
      <Link className="mt-3" href="/prescription/upload">
        <Button
          className="w-fit rounded-md bg-neutral-100 text-sm text-black"
          radius="none"
        >
          <Icon height={20} icon="solar:upload-bold" />
          Upload first prescription
        </Button>
      </Link>
    </div>
  );
}

export default UploadFirstPrescription;
