/* eslint-disable @next/next/no-img-element */
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
import axios from "axios";
import toast from "react-hot-toast";
import GlobalStates from "@/context/GlobalState";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import prisma from "@/prisma/prisma";
import RegisterFirstPet from "@/components/FirstAction/RegisterFirstPet";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let pets = [];
//   let vaccines = [];
//   if (session) {
//     vaccines = await fetch(
//       "https://script.google.com/macros/s/AKfycbxDz0sZbWBDZhhvBTrmbF6kTs64RwNEB9tIb9ZqZEcCpJivsw9OmYkmSxP4Qn7d90OT_A/exec"
//     );
//     vaccines = await vaccines.json();
//     vaccines = vaccines?.vaccinenames;
//     pets = await getPersonalPet(session?.user?.email);
//     pets = (await JSON.parse(JSON.stringify(pets))) || [];
//   } else {
//     pets = [];
//   }
//   return {
//     props: { pets, vaccines }, // will be passed to the page component as props
//   };
// }

function Vaccination() {
  const [pets, setPets] = React.useState([]);
  const [vaccines, setVaccines] = React.useState([]);
  const router = useRouter();
  const session = useSession();
  const { updatedModal } = useContext(GlobalStates);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [selectedVaccine, setSelectedVaccine] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(() => {
    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    return tomorrow.toLocaleDateString("en-CA");
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageLoaded, setPageLoaded] = React.useState(false);

  const handleSubmit = async () => {
    if (!selectedPet) {
      toast.error("Please select a pet");
      return;
    } else if (!selectedVaccine) {
      toast.error("Please select a vaccine");
      return;
    } else if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    updatedModal(true, "Scheduling vaccination");
    setIsLoading(true);
    const vaccineProp = {
      name: selectedPet.name,
      image: selectedPet.image,
      petId: selectedPet.id,
      vaccineName: selectedVaccine,
      dueDate: new Date(selectedDate).toISOString(),
      parentEmail: selectedPet.parentEmail,
    };
    try {
      await axios.post(
        "/api/vaccine/create",
        {
          ...vaccineProp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      updatedModal(false, "Scheduled vaccination");
      try {
        router.back();
      } catch (error) {
        router.push(
          router.query.redirect ? router.query.redirect : "/vaccination"
        );
        updatedModal(false, "Scheduled 🎉");
      }
    } catch (error) {
      console.log(error);
      updatedModal(true, "Error scheduling vaccination");
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (session.status === "authenticated") {
        let boosterRequest = await axios.get("/api/booster/get");
        let petRequest = await axios.post(
          "/api/pet/get_rf",
          {
            email: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPets(petRequest.data.success ? petRequest.data.pets : []);
        setVaccines(
          boosterRequest.data.success ? boosterRequest.data.boosters : []
        );
        setPageLoaded(true);
      }
    })();
  }, [session.status]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
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
      <>
        {pageLoaded == false ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <>
            {pets.length == 0 ? (
              <RegisterFirstPet />
            ) : (
              <>
                <div className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-3 text-b max-w-2xl md:max-w-4xl mx-auto px-5">
                  <Select
                    onChange={(event) => {
                      setSelectedPet(
                        pets.find((pet) => pet.id === event.target.value)
                      );
                    }}
                    radius="none"
                    label="Whom do you want to vaccinate?"
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
                      setSelectedVaccine(value);
                    }}
                    radius="none"
                    label="Select vaccine"
                  >
                    {vaccines.map((vaccine) => (
                      <AutocompleteItem key={vaccine.name} value={vaccine.name}>
                        {vaccine.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

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
                <div className="mt-10 max-w-2xl md:max-w-4xl px-5 mx-auto flex items-center justify-between">
                  <p className="text-sm text-neutral-700 hidden lg:block mr-2">
                    Already vaccinated?{" "}
                    <Link
                      className="text-blue-600 ml-1"
                      href="/vaccination/uploadOld"
                    >
                      Upload certificate
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
                  Already vaccinated?{" "}
                  <Link
                    className="text-blue-600 ml-1"
                    href="/vaccination/uploadOld"
                  >
                    Upload certificate
                  </Link>
                </p>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Vaccination;
