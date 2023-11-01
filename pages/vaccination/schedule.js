import { Icon } from "@iconify/react";
import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPersonalPet } from "@/prisma/pet";
import calculateAge from "@/helper/age";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pets = [];
  let vaccines = [];
  if (session) {
    vaccines = await fetch(
      "https://script.google.com/macros/s/AKfycbxDz0sZbWBDZhhvBTrmbF6kTs64RwNEB9tIb9ZqZEcCpJivsw9OmYkmSxP4Qn7d90OT_A/exec"
    );
    vaccines = await vaccines.json();
    vaccines = vaccines?.vaccinenames;
    pets = await getPersonalPet(session?.user?.email);
    pets = (await JSON.parse(JSON.stringify(pets))) || [];
  } else {
    pets = [];
  }
  return {
    props: { pets, vaccines }, // will be passed to the page component as props
  };
}

function Vaccination({ pets = [], vaccines = [] }) {
  console.log(vaccines);
  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Schedule Vaccination
      </h1>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          Join the vaccination drive
        </p>
        <Link
          href={
            "https://www.bergencountyveterinarycenter.com/importance-of-pet-vaccinations.html"
          }
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Read here</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </Link>
      </div>
      <div className="mt-10 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
        <Select radius="none" label="Whom do you want to vaccinate?">
          {pets.map((pet) => {
            return (
              <SelectItem key={pet.id} value={pet.id}>
                {pet.name}
              </SelectItem>
            );
          })}
        </Select>
        <Input
          label="Name of the vaccine"
          type="text"
          radius="none"
          className="rounded-none "
          list="vaccines"
        />
        <datalist id="vaccines">
          {vaccines.map((vaccine) => {
            return <option key={vaccine} value={vaccine} />;
          })}
        </datalist>

        <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
          <span className="text-sm h-full flex items-center text-neutral-600 shrink-0 border-r border-neutral-200 pr-4">
            Due date
          </span>
          <input
            type="date"
            className="bg-transparent text-sm w-full pl-4 appearance-none outline-none"
            name=""
            id="datPicker"
          />
        </div>
      </div>
      <div className="mt-10 max-w-4xl mx-5 lg:mx-auto flex items-center justify-between space-x-2">
        <p className="text-sm text-neutral-700 hidden lg:block">
          Already vaccinated?{" "}
          <Link className="text-blue-600 ml-1" href="/vaccination/certificate">
            Upload certificate
          </Link>
        </p>
        <Button
          className="px-10 w-full lg:w-fit bg-black text-white rounded-md"
          radius="none"
        >
          Submit
        </Button>
      </div>
      <p className="text-sm text-neutral-700 text-center mt-16 lg:hidden">
        Already vaccinated?{" "}
        <Link className="text-blue-600 ml-1" href="/vaccination/certificate">
          Upload certificate
        </Link>
      </p>
    </div>
  );
}

export default Vaccination;
