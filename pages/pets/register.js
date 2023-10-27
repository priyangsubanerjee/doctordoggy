/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Switch } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";

export async function getServerSideProps(context) {
  let breeds = await fetch(process.env.NEXT_PUBLIC_BREED_API);
  breeds = await breeds.json();

  return {
    props: {
      canine: breeds.caninenames,
      feline: breeds.felinenames,
    },
  };
}

function RegisterPet({ canine, feline }) {
  const imageRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const [isPublicProfile, setIsPublicProfile] = React.useState(true);
  const [registerProp, setRegisterProp] = React.useState({
    name: "",
    species: "",
    breed: "",
    sex: "",
    dateOfBirth: "",
    bodyWeight: "",
  });
  const [imageFile, setImageFile] = React.useState(null); // cannot be null
  const [breedOptions, setBreedOptions] = React.useState([
    ...canine,
    ...feline,
  ]); // cannot be null

  const performChecks = () => {
    if (imageFile == null) {
      toast("Please choose a photo of your pet");
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

  useEffect(() => {
    if (registerProp.species == "canine") {
      setBreedOptions([...canine]);
    } else if (registerProp.species == "feline") {
      setBreedOptions([...feline]);
    } else {
      setBreedOptions([...canine, ...feline]);
    }
  }, [canine, feline, registerProp.species]);

  return (
    <div className="pb-16">
      <h1 className="text-3xl font-semibold text-center mt-16">
        Register your pet
      </h1>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          * marked fields are mandatory.
        </p>
        <Link
          href="/pets/register"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Learn more</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </Link>
      </div>

      <div className="lg:flex lg:w-[80%] mx-6 lg:mx-auto lg:space-x-12 mt-10 lg:mt-16">
        <div className="lg:w-fit w-full shrink-0">
          <div
            onClick={() => imageRef?.current.click()}
            className="h-[200px] lg:h-full lg:max-h-[350px] lg:w-96 bg-neutral-100 hover:bg-neutral-200 rounded-md relative cursor-pointer transition-all overflow-hidden"
          >
            <input
              type="file"
              onChange={(e) => {
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
              <SelectItem key="canine" value="canine">
                Canine 🦮
              </SelectItem>
              <SelectItem key="feline" value="feline">
                Feline 🐈
              </SelectItem>
            </Select>

            <Input
              label="Breed"
              value={registerProp.breed}
              onChange={(e) =>
                setRegisterProp({
                  ...registerProp,
                  breed: e.target.value,
                })
              }
              type="tel"
              radius="none"
              className="rounded-none "
              list="breeds"
            />
            <datalist id="breeds">
              {breedOptions.map((breed, index) => {
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
              <SelectItem value="dog">Male ♂</SelectItem>
              <SelectItem value="cat">Female ♀</SelectItem>
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
                className="bg-transparent text-sm w-full pl-4 appearance-none outline-none"
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
              isSelected={isPublicProfile}
              onValueChange={setIsPublicProfile}
            />
          </div>

          <div className="mt-20 flex space-x-2 items-center justify-end">
            <Button
              onPress={() => {
                if (performChecks()) {
                  console.log(registerProp);
                }
              }}
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

export default RegisterPet;
