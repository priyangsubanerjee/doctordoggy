/* eslint-disable @next/next/no-html-link-for-pages */
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPersonalPet } from "@/prisma/pet";
import { Icon } from "@iconify/react";
import React, { useContext, useRef } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import GlobalStates from "@/context/GlobalState";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pets = [];
  let vaccines = [];
  if (session) {
    pets = await getPersonalPet(session?.user?.email);
    pets = (await JSON.parse(JSON.stringify(pets))) || [];
  } else {
    pets = [];
  }
  return {
    props: { pets, vaccines }, // will be passed to the page component as props
  };
}

function UploadPrescription({ pets = [], vaccines = [] }) {
  const { updatedModal } = useContext(GlobalStates);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [selectedVaccine, setSelectedVaccine] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fileRef = useRef(null);

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Upload Prescription
      </h1>
      <div className="flex items-center justify-center space-x-2 mt-4 text-sm">
        <p>This record is for your peronal reference</p>
        <a
          href="/vaccination/schedule"
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Learn more</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
      </div>

      <div className="mt-10 flex items-center max-w-4xl mx-auto">
        <Button
          onPress={() => fileRef.current.click()}
          className="rounded-full bg-blue-100"
          radius="full"
        >
          <div className="px-3 flex items-center">
            <span className="text-sm text-neutral-700">Choose file</span>
            <input ref={fileRef} type="file" hidden name="" id="" />
          </div>
        </Button>

        <p className="text-xs text-neutral-600 ml-3 ">
          You can upload a photo or a PDF file
        </p>
      </div>
      <div className="mt-10 lg:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
        <Select
          onChange={(event) => {
            setSelectedPet(pets.find((pet) => pet.id === event.target.value));
          }}
          radius="none"
          label="Prescription for"
        >
          {pets.map((pet) => {
            return (
              <SelectItem key={pet.id} value={pet.id}>
                {pet.name}
              </SelectItem>
            );
          })}
        </Select>
        <Input
          label="Reason for visit"
          onChange={(event) => {
            setSelectedVaccine(event.target.value);
          }}
          value={selectedVaccine}
          type="text"
          radius="none"
          className="rounded-none "
        />

        <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
          <span className="text-sm h-full flex items-center text-neutral-500 shrink-0 border-r border-neutral-200 pr-4">
            Visited on
          </span>
          <input
            type="date"
            onChange={(event) => {
              setSelectedDate(event.target.value);
            }}
            value={selectedDate}
            className="bg-transparent text-sm w-full pl-4 appearance-none outline-none"
            name=""
            id="datPicker"
          />
        </div>

        <Input
          label="Name of the doctor"
          onChange={(event) => {
            setSelectedVaccine(event.target.value);
          }}
          value={selectedVaccine}
          type="text"
          radius="none"
          className="rounded-none "
        />
      </div>
      <div className="mt-4 lg:mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
        <Input
          label="Body weight"
          onChange={(event) => {
            setSelectedVaccine(event.target.value);
          }}
          value={selectedVaccine}
          type="text"
          radius="none"
          className="rounded-none "
        />

        <Input
          label="Temperature"
          onChange={(event) => {
            setSelectedVaccine(event.target.value);
          }}
          value={selectedVaccine}
          type="text"
          radius="none"
          className="rounded-none "
        />

        <Textarea
          label="Notes"
          radius="none"
          className="rounded-none lg:col-span-2"
        />
      </div>
      <div className="max-w-4xl mx-auto mt-10">
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default UploadPrescription;
