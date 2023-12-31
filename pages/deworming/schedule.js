/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import {
  Select,
  SelectItem,
  Input,
  Button,
  Spinner,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPersonalPet } from "@/prisma/pet";
import calculateAge from "@/helper/age";
import axios from "axios";
import toast from "react-hot-toast";
import GlobalStates from "@/context/GlobalState";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let pets = [];
//   let medicines = [];
//   if (session) {
//     medicines = await fetch(
//       "https://script.google.com/macros/s/AKfycbx9Hk4xPEdFVSBg0THF6P_UAHDx93BuwuHjsFqnk3-JzojEUTypWaqyZGl971BBOJaHwQ/exec"
//     );
//     medicines = await medicines.json();
//     medicines = medicines?.medicines;
//     console.log(medicines);
//     pets = await getPersonalPet(session?.user?.email);
//     pets = (await JSON.parse(JSON.stringify(pets))) || [];
//   } else {
//     pets = [];
//   }
//   return {
//     props: { pets, medicines }, // will be passed to the page component as props
//   };
// }

function Deworming() {
  const router = useRouter();
  const session = useSession();
  const [pets, setPets] = React.useState([]);
  const [medicines, setMedicines] = React.useState([]);
  const { updatedModal } = useContext(GlobalStates);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [selectedMedicine, setSelectedMedicine] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(() => {
    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    return tomorrow.toLocaleDateString("en-CA");
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [dosage, setDosage] = React.useState({
    value: "",
    unit: "ml",
  });
  const [pageLoaded, setPageLoaded] = React.useState(false);

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
        updatedModal(true, "Scheduled 🎉");
        router.push(
          router.query.redirect ? router.query.redirect : "/deworming"
        );
        updatedModal(false, "Scheduled 🎉");
      } catch (error) {
        console.log(error);
        updatedModal(true, "Error scheduling vaccination");
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (session.status === "authenticated") {
        let pets = [];
        let medicines = [];
        medicines = await fetch("/api/dewormer/get");
        medicines = await medicines.json();
        console.log(medicines);
        console.log(session?.data?.user?.email);
        pets = await fetch("/api/pet/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.data?.user?.email,
          }),
        });
        pets = await pets.json();
        console.log(pets);
        setPets(pets);
        setMedicines(medicines);
        setPageLoaded(true);
      }
    })();
  }, [session.status]);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
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

      <>
        {pageLoaded == false ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <>
            <div className="mt-10 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b max-w-4xl lg:mx-auto mx-5">
              <Select
                onChange={(event) => {
                  setSelectedPet(
                    pets.find((pet) => pet.id === event.target.value)
                  );
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

              <Autocomplete
                onSelectionChange={(value) => {
                  let medicine = medicines.find(
                    (medicine) => medicine.name === value
                  );

                  medicine &&
                    medicine.length != 0 &&
                    setDosage({
                      ...dosage,
                      unit: medicine.type == "Tabs" ? "tablet(s)" : "ml",
                    });
                  setSelectedMedicine(value);
                }}
                radius="none"
                label="Select vaccine"
              >
                {medicines.map((medicine) => (
                  <AutocompleteItem key={medicine.name} value={medicine.name}>
                    {medicine.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
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
                  className="bg-transparent text-sm w-full h-full pl-4 outline-none"
                  name=""
                  id="datPicker"
                />
              </div>
            </div>
            <div className="mt-10 max-w-4xl mx-5 lg:mx-auto flex items-center justify-between space-x-2">
              <p className="text-sm text-neutral-700 hidden lg:block">
                Already dewormed?{" "}
                <Link
                  className="text-blue-600 ml-1"
                  href="/vaccination/certificate"
                >
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
              <Link
                className="text-blue-600 ml-1"
                href="/vaccination/certificate"
              >
                Upload deworming record
              </Link>
            </p>
          </>
        )}
      </>
    </div>
  );
}

export default Deworming;
