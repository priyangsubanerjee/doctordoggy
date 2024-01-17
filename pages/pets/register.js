/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { uploadImage } from "@/helper/image";
import GlobalStates from "@/context/GlobalState";

import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/react";
import { useRouter } from "next/router";

function RegisterPet({ canine = [], feline = [] }) {
  const router = useRouter();
  const session = useSession();
  const imageRef = React.useRef(null);
  const { updatedModal } = useContext(GlobalStates);
  const [registerProp, setRegisterProp] = React.useState({
    parentEmail: "",
    name: "",
    species: "",
    breed: "",
    sex: "",
    dateOfBirth: new Date().toISOString().split("T")[0],
    bodyWeight: "",
    isPublic: true,
    color: "",
  });
  const [imageFile, setImageFile] = React.useState(null); // cannot be null
  const [species, setSpecies] = React.useState([]);
  const [breedOptions, setBreedOptions] = React.useState([
    ...canine,
    ...feline,
  ]);
  const [loading, setLoading] = useState(false);
  const [breedList, setBreedList] = useState([]);

  const performChecks = () => {
    if (imageFile == null) {
      toast("Please choose a photo of your pet");
      return false;
    }
    if (registerProp.parentEmail == "") {
      toast("No parent email found");
      return false;
    }
    if (registerProp.name == "") {
      toast("Please enter your pet's name");
      return false;
    }
    if (registerProp.species == "") {
      toast("Please select your pet's species");
      return false;
    }

    if (registerProp.sex == "") {
      toast("Please select your pet's sex");
      return false;
    }

    if (registerProp.breed == "") {
      toast("Please select your pet's breed");
      return false;
    }
    if (registerProp.dateOfBirth == "") {
      toast("Please enter your pet's date of birth");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (performChecks()) {
      updatedModal(true, "Uploading image ...");
      setLoading(true);
      try {
        const { fileUrl, publicId } = await uploadImage(imageFile);
        updatedModal(true, "Storing pet information ...");
        let registerRequest = await axios.post(
          "/api/pet/create",
          {
            pet: { ...registerProp, image: fileUrl },
            sessionEmail: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (registerRequest.data.success) {
          setLoading(false);
          updatedModal(false, "Pet created successfully");
          toast.success(registerRequest.data.message);
          router.push("/pets");
        } else {
          setLoading(false);
          updatedModal(false, "Something went wrong with pet registration.");
          toast.error(registerRequest.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong with image.");
      }
    }
  };

  const fetchBreeds = async () => {
    let api = "/api/breed";
    let breeds_ = await axios.get(api);
    breeds_ = breeds_.data.success ? breeds_.data.breeds : [];
    let types = [];
    breeds_.forEach((breed) => {
      !types.includes(breed.type.toLocaleLowerCase()) &&
        types.push(breed.type.toLocaleLowerCase());
    });
    setSpecies(types);
    setBreedList(breeds_);
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      setRegisterProp({
        ...registerProp,
        parentEmail: session?.data?.user?.email,
      });
      fetchBreeds();
    }
  }, [session.status]);

  useEffect(() => {
    setBreedOptions([]);
    if (registerProp.species.length != 0) {
      let breed_names = [];
      breedList.forEach((breed) => {
        if (
          breed.type.toLocaleLowerCase() ==
          registerProp.species.toLocaleLowerCase()
        ) {
          breed_names.push(breed.name);
        }
        setBreedOptions(breed_names);
      });
    }
  }, [registerProp.species]);

  useEffect(() => {
    console.log(registerProp.breed);
  }, [registerProp.breed]);

  if (breedList.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-3xl font-semibold text-center">
          Register your pet
        </h1>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <p className="text-center text-neutral-600 text-sm">
            * marked fields are mandatory.
          </p>
          <p className="flex items-center text-blue-600 space-x-2 text-sm hover:underline">
            <span>Learn more</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </p>
        </div>
        <Spinner className="mt-10" color="primary" size="lg" />
      </div>
    );
  } else {
    return (
      <div className="pb-16">
        <h1 className="text-3xl font-semibold text-center mt-16">
          Register your pet
        </h1>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <p className="text-center text-neutral-600 text-sm">
            * marked fields are mandatory.
          </p>
          <p className="flex items-center text-blue-600 space-x-2 text-sm hover:underline">
            <span>Learn more</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </p>
        </div>
        <div className="lg:flex lg:w-[80%] mx-6 lg:mx-auto lg:space-x-12 mt-10 lg:mt-16">
          <div className="lg:w-fit w-full shrink-0">
            <div
              onClick={() => imageRef?.current.click()}
              className="h-[200px] lg:h-full lg:max-h-[350px] lg:w-96 bg-neutral-100 hover:bg-neutral-200 rounded-md relative cursor-pointer transition-all overflow-hidden"
            >
              <input
                type="file"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                }}
                name=""
                hidden
                ref={imageRef}
                id=""
              />
              {imageFile == null ? (
                <>
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1998/1998342.png"
                      className="h-8 w-8"
                      alt=""
                    />
                    <p className="mt-3 font-medium">Choose a photo</p>
                    <p className="text-xs text-neutral-500 mt-2">
                      .png, .jpg, .jpeg, .heic
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                    <div className="absolute opacity-0 hover:opacity-100 inset-0 h-full w-full bg-white/70 flex flex-col items-center justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1998/1998342.png"
                        className="h-8 w-8"
                        alt=""
                      />
                      <p className="mt-3 font-medium">Choose another photo</p>
                      <p className="text-xs text-neutral-500 mt-2">
                        .png, .jpg, .jpeg, .heic
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full mt-16 lg:mt-0">
            <p className="text-xs text-neutral-600">
              General information about your pet
            </p>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 text-b">
              <Input
                label="Name of your pet"
                type="text"
                required
                radius="none"
                value={registerProp.name}
                onChange={(e) =>
                  setRegisterProp({ ...registerProp, name: e.target.value })
                }
                size="md"
                className="rounded-none text-base lg:col-span-2"
              />

              <Select
                onChange={(e) => {
                  setRegisterProp({ ...registerProp, species: e.target.value });
                }}
                radius="none"
                label="Species"
              >
                {species.map((type, index) => {
                  return (
                    <SelectItem key={type} value={type}>
                      {type.substring(0, 1).toUpperCase() + type.substring(1)}
                    </SelectItem>
                  );
                })}
              </Select>

              <Autocomplete
                isDisabled={registerProp.species.length == 0}
                onSelectionChange={(value) => {
                  setRegisterProp({ ...registerProp, breed: value });
                }}
                radius="none"
                label="Select breed"
              >
                {breedOptions.map((animal) => (
                  <AutocompleteItem key={animal} value={animal}>
                    {animal}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              {/* <Input
                label="Breed"
                value={registerProp.breed}
                onChange={(e) =>
                  setRegisterProp({
                    ...registerProp,
                    breed: e.target.value,
                  })
                }
                type="text"
                radius="none"
                className="rounded-none "
                list="breeds"
              /> */}
              <datalist id="breeds">
                {breedOptions != undefined &&
                  breedOptions.length !== 0 &&
                  breedOptions.map((breed, index) => {
                    return (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    );
                  })}
              </datalist>

              <Select
                onChange={(e) => {
                  setRegisterProp({ ...registerProp, sex: e.target.value });
                }}
                radius="none"
                label="Sex"
              >
                <SelectItem key="male" value="male">
                  Male ♂
                </SelectItem>
                <SelectItem key="female" value="female">
                  Female ♀
                </SelectItem>
              </Select>

              <div className="flex items-center justify-between h-[56px] bg-neutral-100 px-3">
                <span className="text-sm h-full flex items-center text-neutral-600 shrink-0 border-r border-neutral-200 pr-4">
                  D.O.B
                </span>
                <input
                  value={registerProp.dateOfBirth}
                  onChange={(e) =>
                    setRegisterProp({
                      ...registerProp,
                      dateOfBirth: e.target.value,
                    })
                  }
                  type="date"
                  className="bg-transparent text-sm w-full h-full pl-4 appearance-none outline-none"
                  name=""
                  id="datPicker"
                />
              </div>

              <Input
                label="Body weight (Kg)"
                value={registerProp.bodyWeight}
                onChange={(e) =>
                  setRegisterProp({
                    ...registerProp,
                    bodyWeight: e.target.value,
                  })
                }
                type="tel"
                radius="none"
                className="rounded-none "
              />

              <Input
                label="Color"
                value={registerProp.color}
                onChange={(e) =>
                  setRegisterProp({
                    ...registerProp,
                    color: e.target.value,
                  })
                }
                type="text"
                radius="none"
                className="rounded-none "
              />
            </div>

            <div className="h-[1px] w-full my-8"></div>

            <div className="flex items-center justify-between mt-5">
              <div>
                <p className="text-neutral-800 text-sm">
                  Is your pet&apos;s profile public?
                </p>
                <Link
                  href="/pets/register"
                  className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-1"
                >
                  <span>Learn about public profiles</span>
                  <span className="translate-y-[1px]">
                    <Icon icon="formkit:right" />
                  </span>
                </Link>
              </div>
              <Switch
                isSelected={registerProp.isPublic}
                onValueChange={() => {
                  setRegisterProp({
                    ...registerProp,
                    isPublic: !registerProp.isPublic,
                  });
                }}
              />
            </div>

            <div className="mt-20 flex space-x-2 items-center justify-end">
              <Button
                isLoading={loading}
                onPress={handleSubmit}
                radius="none"
                className="w-full rounded-md h-12 bg-black text-white"
              >
                {" "}
                Register{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPet;
