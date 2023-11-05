import { Icon } from "@iconify/react";
import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPersonalPet } from "@/prisma/pet";
import calculateAge from "@/helper/age";
import axios from "axios";
import toast from "react-hot-toast";
import GlobalStates from "@/context/GlobalState";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pets = [];
  let medicines = [];
  if (session) {
    medicines = await fetch(
      "https://script.google.com/macros/s/AKfycbx9Hk4xPEdFVSBg0THF6P_UAHDx93BuwuHjsFqnk3-JzojEUTypWaqyZGl971BBOJaHwQ/exec"
    );
    medicines = await medicines.json();
    medicines = medicines?.medicines;
    console.log(medicines);
    pets = await getPersonalPet(session?.user?.email);
    pets = (await JSON.parse(JSON.stringify(pets))) || [];
  } else {
    pets = [];
  }
  return {
    props: { pets, medicines }, // will be passed to the page component as props
  };
}

function Deworming({ pets = [], medicines = [] }) {
  const { updatedModal } = useContext(GlobalStates);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [selectedMedicine, setSelectedMedicine] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dosage, setDosage] = React.useState({
    value: "",
    unit: "ml",
  });

  const performChecks = () => {
    if (selectedPet == null) {
      toast.error("Please select a pet.");
      return false;
    }
    if (selectedMedicine == null) {
      toast.error("Please select a medicine.");
      return false;
    }
    if (selectedDate == null) {
      toast.error("Please select a due date.");
      return false;
    }
    if (dosage.value == "") {
      toast.error("Please enter a valid dosage.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (performChecks()) {
      updatedModal(true, "Scheduling deworming");
      setIsLoading(true);
      const dewormingProp = {
        name: selectedPet.name,
        image: selectedPet.image,
        petId: selectedPet.id,
        bodyWeight: selectedPet.bodyWeight,
        medicineName: selectedMedicine,
        dosage: `${dosage.value} ${dosage.unit}`,
        dueDate: new Date(selectedDate).toISOString(),
        parentEmail: selectedPet.parentEmail,
      };
      try {
        await axios.post(
          "/api/deworming/create",
          {
            ...dewormingProp,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        updatedModal(true, "Scheduled vaccination");
        window.location.href = "/deworming";
      } catch (error) {
        console.log(error);
        updatedModal(true, "Error scheduling vaccination");
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Schedule Deworming
      </h1>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          Importance of deworming
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
        <Select
          onChange={(event) => {
            setSelectedPet(pets.find((pet) => pet.id === event.target.value));
          }}
          radius="none"
          label="Whom do you want to deworm?"
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
          label="Name of the deworming medicine"
          onChange={(event) => {
            setSelectedMedicine(event.target.value);
          }}
          value={selectedMedicine}
          type="text"
          radius="none"
          className="rounded-none "
          list="medicines"
        />
        <datalist id="medicines">
          {medicines.map((med) => {
            return <option key={med.name} value={med.name} />;
          })}
        </datalist>
        <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
          <span className="text-sm h-full flex items-center text-neutral-600 shrink-0 border-r border-neutral-200 pr-4">
            Dosage
          </span>
          <input
            type="text"
            placeholder="0"
            onChange={(event) => {
              setDosage({
                ...dosage,
                value: event.target.value,
              });
            }}
            value={dosage.value}
            className="bg-transparent text-sm w-full pl-4 outline-none"
            name=""
          />
          <select
            value={dosage.unit}
            onChange={(e) => {
              setDosage({
                ...dosage,
                unit: e.target.value,
              });
            }}
            name=""
            id=""
            className="w-44 h-full text-sm border-l bg-transparent pl-4 outline-none"
          >
            <option value="ml">ml</option>
            <option value="tablet(s)">tablet(s)</option>
          </select>
        </div>
        <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
          <span className="text-sm h-full flex items-center text-neutral-600 shrink-0 border-r border-neutral-200 pr-4">
            Due date
          </span>
          <input
            type="date"
            onChange={(event) => {
              setSelectedDate(event.target.value);
            }}
            value={selectedDate}
            className="bg-transparent text-sm w-full pl-4 outline-none"
            name=""
            id="datPicker"
          />
        </div>
      </div>
      <div className="mt-10 max-w-4xl mx-5 lg:mx-auto flex items-center justify-between space-x-2">
        <p className="text-sm text-neutral-700 hidden lg:block">
          Already vaccinated?{" "}
          <Link className="text-blue-600 ml-1" href="/vaccination/certificate">
            Upload deworming record
          </Link>
        </p>
        <Button
          loading={isLoading}
          onClick={handleSubmit}
          className="px-10 w-full lg:w-fit bg-black text-white rounded-md"
          radius="none"
        >
          Submit
        </Button>
      </div>
      <p className="text-sm text-neutral-700 text-center mt-16 lg:hidden">
        Already dewormed?{" "}
        <Link className="text-blue-600 ml-1" href="/vaccination/certificate">
          Upload deworming record
        </Link>
      </p>
    </div>
  );
}

export default Deworming;
