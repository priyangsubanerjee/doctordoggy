/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function UploadFirstPathology() {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto rounded-md mt-7">
      <img
        src="https://thumbs.dreamstime.com/b/pathology-icon-laboratory-277168266.jpg"
        className="h-32 mt-4 grayscale"
        alt=""
      />
      <Link className="mt-3" href="/pathology/upload">
        <Button
          className="w-fit rounded-md bg-neutral-100 text-sm text-black"
          radius="none"
        >
          <Icon height={20} icon="solar:upload-bold" />
          Upload first pathology
        </Button>
      </Link>
    </div>
  );
}

export default UploadFirstPathology;
