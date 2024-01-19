/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import calculateAge from "@/helper/age";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import RegisterFirstPet from "@/components/Cards/RegisterFirstPet";

function Pets() {
  const session = useSession();
  const router = useRouter();
  const [pets, setPets] = React.useState([]);
  const [pageLoaded, setPageLoaded] = React.useState(false);

  useEffect(() => {
    if (session.status == "loading" || session.status == "unauthenticated")
      return;

    (async () => {
      let petsRequest = await axios.post(
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

      if (petsRequest.data.success) {
        setPets(petsRequest.data.pets);
        setPageLoaded(true);
      } else {
        toast.error(petsRequest.data.message);
      }
    })();
  }, [session.status]);

  const PetCard = ({ name, age, image, id }) => {
    return (
      <Link href={`/pets/${id}`}>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start w-full">
          <div className="h-20 lg:h-24 w-20 shrink-0 lg:w-24 rounded-full overflow-hidden">
            <img src={image} className="h-full w-full object-cover" alt="" />
          </div>
          <div className="mt-3 lg:mt-0 lg:ml-5 flex flex-col lg:block items-center justify-center">
            <h2 className="text-slate-800 font-medium text-base text-center lg:text-left">
              {name}
            </h2>
            <p className="text-xs mt-1 text-neutral-600">{age}</p>

            <button className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-3">
              <span>Details</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="pb-16">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Pets galaxy
      </h1>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          Cant find your pet below?
        </p>
        <button
          onClick={() => router.push("/pets/register")}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Register your pet</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
      {pageLoaded == false ? (
        <div className="flex flex-col items-center justify-center mt-32">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <>
          {pets.length == 0 ? (
            <RegisterFirstPet />
          ) : (
            <div className="lg:max-w-[75%] mx-8 lg:mx-auto mt-16 grid grid-cols-2 gap-8 lg:gap-12 lg:grid-cols-3">
              {pets.map((pet) => (
                <PetCard
                  id={pet?.id}
                  key={pet?.id}
                  name={pet?.name}
                  age={calculateAge(pet?.dateOfBirth)}
                  image={pet?.image}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Pets;
