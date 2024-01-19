/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function RegisterFirstPet() {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto rounded-md mt-7">
      <img
        src="https://t3.ftcdn.net/jpg/03/81/37/32/360_F_381373275_aeamXNskwwa6pwL25OTb6IhGENPXRHAs.jpg"
        className="h-32 mt-10"
        alt=""
      />
      <Link className="mt-8" href="/pets/register">
        <Button
          className="w-fit rounded-md bg-black text-sm text-white"
          radius="none"
        >
          <Icon height={20} icon="basil:add-outline" />
          Register your first pet
        </Button>
      </Link>
    </div>
  );
}

export default RegisterFirstPet;
