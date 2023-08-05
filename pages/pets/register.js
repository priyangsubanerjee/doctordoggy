/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GlobalStates from "@/context/GlobalState";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

function RegisterPet() {
  const { refreshPets } = useContext(GlobalStates);
  const session = useSession();
  const router = useRouter();

  const [pet, setPet] = useState({
    image: null,
    name: "",
    family: "Canine",
    sex: "Male",
    dateOfBirth: "",
    breed: "",
    color: "",
    weight: "",
    historyOfComplications: "",
  });
  const [loading, setLoading] = useState(false);

  const imageInput = useRef(null);

  const uploadImage = async (e) => {
    if (pet.image !== "" && pet.image !== null) {
      const formData = new FormData();
      formData.append("file", pet.image);
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });
      const { fileUrl, publicId } = await res.json();
      return {
        fileUrl,
        publicId,
      };
    } else {
      return "https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png";
    }
  };

  const registerPet = async () => {
    if (
      pet.name == "" ||
      pet.family == "" ||
      pet.sex == "" ||
      pet.dateOfBirth == "" ||
      pet.breed == ""
    ) {
      alert("* marked fields are necessary & cannot be left empty.");
      return;
    }
    setLoading(true);
    let { fileUrl, publicId } = await uploadImage();
    let res = await fetch("/api/pets/register", {
      method: "POST",
      body: JSON.stringify({
        fileUrl: fileUrl,
        publicId: publicId,
        name: pet.name,
        family: pet.family,
        sex: pet.sex,
        dateOfBirth: pet.dateOfBirth,
        breed: pet.breed,
        color: pet.color,
        weight: pet.weight,
        historyOfComplications: pet.historyOfComplications,
        parentEmail: session.data.user.email,
      }),
    });
    let data = await res.json();
    if (data.success) {
      refreshPets();
      setLoading(false);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
          Register new <span className="text-pink-500">pet</span>
        </h2>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          <span className="text-red-500">*</span> marked fields are required
        </p>
      </div>
      <div className="mt-10 lg:mt-20">
        <div>
          <p className="text-sm text-neutral-600">Avatar image</p>
          <div className="flex justify-center lg:justify-start mt-4">
            <div className="h-32 lg:h-28 w-32 lg:w-28 rounded-full relative">
              <input
                type="file"
                hidden
                onChange={async (e) => {
                  let file = e.target.files[0];
                  setPet({ ...pet, image: file });
                }}
                accept="image/*"
                ref={imageInput}
                name=""
                id=""
              />
              <img
                src={
                  pet.image !== null
                    ? URL.createObjectURL(pet.image)
                    : "https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png"
                }
                className="object-cover mt-2 h-full w-full rounded-full"
                alt=""
              />
              <button
                onClick={() => imageInput.current.click()}
                className="h-10 w-10 rounded-full text-black bg-white hover:bg-neutral-100 border shadow-md absolute bottom-0 right-0 z-0"
              >
                <iconify-icon icon="solar:camera-bold"></iconify-icon>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6">
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Name <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              value={pet.name}
              onChange={(e) => setPet({ ...pet, name: e.target.value })}
              className="px-4 h-12 border w-full mt-2 rounded"
              placeholder="How would you like to call your pet?"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
              Family <span className="text-red-500 text-lg">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-[30%]">
                <iconify-icon icon="icon-park-outline:down"></iconify-icon>
              </span>
              <select
                value={pet.family}
                onChange={(e) => setPet({ ...pet, family: e.target.value })}
                className="px-4 h-12 border w-full mt-2 appearance-none rounded bg-transparent"
                name=""
                id=""
              >
                <option value="Canine">Canine</option>
                <option value="Feline">Feline</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500 mt-1">
              Sex <span className="text-red-500 text-lg">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-[30%]">
                <iconify-icon icon="icon-park-outline:down"></iconify-icon>
              </span>
              <select
                value={pet.sex}
                onChange={(e) => setPet({ ...pet, sex: e.target.value })}
                className="px-4 h-12 border w-full mt-2 appearance-none rounded bg-transparent"
                name=""
                id=""
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              D.O.B <span className="text-red-500 ml-1 text-xl">*</span>
            </label>
            <div
              onClick={() => document.getElementById("dobInput").focus()}
              className="h-12 border w-full mt-2 rounded bg-transparent relative px-4"
            >
              <span
                onClick={() => document.getElementById("dobInput").focus()}
                className="absolute right-3 top-1/2 -translate-y-[30%] lg:hidden"
              >
                <iconify-icon icon="solar:calendar-outline"></iconify-icon>
              </span>
              <input
                type="date"
                placeholder="Date of birth"
                value={pet.dateOfBirth}
                onChange={(e) =>
                  setPet({ ...pet, dateOfBirth: e.target.value })
                }
                className="appearance-none w-fit lg:w-full h-full bg-transparent  outline-none"
                name=""
                id="dobInput"
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Breed <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              value={pet.breed}
              onChange={(e) => setPet({ ...pet, breed: e.target.value })}
              className="px-4 h-12 border w-full mt-2 rounded"
              placeholder="Breed of your pet"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Color specification{" "}
              <span className="text-red-500/0 text-lg">*</span>
            </label>
            <input
              type="text"
              value={pet.color}
              onChange={(e) => setPet({ ...pet, color: e.target.value })}
              className="px-4 h-12 border w-full mt-2 rounded"
              placeholder="Color of your pet"
              name=""
              id=""
            />
          </div>
          <div>
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Body weight
              <span className="text-red-500/0 text-lg">*</span>
            </label>
            <input
              type="tel"
              value={pet.weight}
              onChange={(e) => setPet({ ...pet, weight: e.target.value })}
              className="px-4 h-12 border w-full mt-2 rounded"
              placeholder="Weight of your pet in kg"
              name=""
              id=""
            />
          </div>
          <div className="lg:col-span-2">
            <label className="font-medium text-xs shrink-0 text-neutral-500">
              Previous complications
            </label>
            <textarea
              value={pet.historyOfComplications}
              onChange={(e) =>
                setPet({ ...pet, historyOfComplications: e.target.value })
              }
              name=""
              className="resize-none w-full h-full border px-4 py-3 mt-2"
              placeholder="Your text here"
              id=""
            ></textarea>
          </div>
        </div>
        <div className="mt-20 flex items-center space-x-3">
          <button
            disabled={loading}
            onClick={() => registerPet()}
            className="flex disabled:opacity-50 items-center justify-center space-x-2 w-fit lg:px-5 px-5 py-3 rounded bg-blue-500 text-white text-sm"
          >
            {loading ? (
              <iconify-icon height="24" icon="eos-icons:loading"></iconify-icon>
            ) : (
              <iconify-icon
                height="23"
                icon="icon-park-solid:check-one"
              ></iconify-icon>
            )}
            <span>Save changes & proceed</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-30 h-full w-full bg-black/50 flex items-center justify-center">
          <div className="px-10 py-8 bg-white rounded-lg">
            <h2 className="text-lg font-semibold text-neutral-700">
              Registering your pet
            </h2>
            <p className="text-[11px] lg:text-xs text-neutral-500 mt-3">
              This might take a few seconds
            </p>
            <div className="mt-8 w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full w-[40%] rounded-full bg-neutral-800 animate-indeterminate"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPet;
