/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPetById } from "@/prisma/pet";
import { Button, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import GlobalStates from "@/context/GlobalState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "@/helper/image";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pet = null;
  let isParent = false;
  let breeds = [];
  if (session) {
    pet = await getPetById(context.params.id);
    pet = await JSON.parse(JSON.stringify(pet));
    if (pet) {
      breeds = await fetch(process.env.NEXT_PUBLIC_BREED_API);
      breeds = await breeds.json();
      if (session?.user?.email == pet.parentEmail) {
        isParent = true;
      }
      if (!pet.isPublic) {
        if (pet.parentEmail !== session?.user?.email) {
          pet = null;
        }
      }
    }
  }
  return {
    props: {
      session,
      pet,
      isParent,
      canine: breeds.caninenames,
      feline: breeds.felinenames,
    }, // will be passed to the page component as props
  };
}

function EditProfile({ pet, canine, feline }) {
  const router = useRouter();
  const session = useSession();
  const imageRef = React.useRef(null);
  const { updatedModal } = useContext(GlobalStates);

  const [storedProp, setStoredProp] = useState({
    image: pet?.image || "",
    parentEmail: pet?.parentEmail || "",
    name: pet?.name || "",
    species: pet?.species || "",
    breed: pet?.breed || "",
    sex: pet?.sex || "",
    dateOfBirth: "",
    bodyWeight: pet?.bodyWeight || "",
    isPublic: pet?.isPublic || false,
    color: pet?.color || "",
  });

  const [imageFile, setImageFile] = useState(null); // cannot be null
  const [breedOptions, setBreedOptions] = useState([...canine, ...feline]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pet.dateOfBirth != "") {
      let datePicker = document.getElementById("datPicker");
      // format in yyyy-MM-dd
      let dtStr = pet.dateOfBirth;

      let dt = new Date(dtStr);
      let month = dt.getMonth() + 1;
      let day = dt.getDate();
      let year = dt.getFullYear();

      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      let dateStr = year + "-" + month + "-" + day;

      setStoredProp({ ...storedProp, dateOfBirth: dateStr });
    }
  }, []);

  const performChecks = () => {
    if (storedProp.parentEmail == "") {
      toast("No parent email found");
      return false;
    }
    if (storedProp.name == "") {
      toast("Please enter your pet's name");
      return false;
    }
    if (storedProp.species == "") {
      toast("Please select your pet's species");
      return false;
    }

    if (storedProp.sex == "") {
      toast("Please select your pet's sex");
      return false;
    }

    if (storedProp.breed == "") {
      toast("Please select your pet's breed");
      return false;
    }
    if (storedProp.dateOfBirth == "") {
      toast("Please enter your pet's date of birth");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (performChecks()) {
      setLoading(true);
      try {
        let imageUrl = storedProp.image;
        if (imageFile != null) {
          updatedModal(true, "Uploading image ...");
          const { fileUrl, publicId } = await uploadImage(imageFile);
          imageUrl = fileUrl;
        }

        updatedModal(true, "Storing pet information ...");
        await axios.post(
          "/api/pet/update",
          {
            id: pet.id,
            pet: { ...storedProp, image: imageUrl },
            sessionEmail: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        updatedModal(true, "Pet created successfully");
        window.location.href = `/pets`;
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong with image.");
      }
    }
  };

  return (
    <div>
      <div className="pb-16">
        <h1 className="text-3xl font-semibold text-center mt-16">
          Edit Profile
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
              {storedProp.image == null ? (
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
                      src={
                        imageFile == null
                          ? storedProp.image
                          : URL.createObjectURL(imageFile)
                      }
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
                value={storedProp.name}
                onChange={(e) =>
                  setStoredProp({ ...storedProp, name: e.target.value })
                }
                size="md"
                className="rounded-none text-base lg:col-span-2"
              />

              <Select
                onChange={(e) => {
                  setStoredProp({
                    ...storedProp,
                    species: e.target.value,
                  });
                }}
                selectedKeys={[storedProp.species]}
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
                value={storedProp.breed}
                onChange={(e) =>
                  setStoredProp({
                    ...storedProp,
                    breed: e.target.value,
                  })
                }
                type="text"
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
                  setStoredProp({ ...storedProp, sex: e.target.value });
                }}
                radius="none"
                label="Sex"
                selectedKeys={[storedProp.sex]}
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
                  value={storedProp.dateOfBirth}
                  onChange={(e) =>
                    setStoredProp({
                      ...storedProp,
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
                value={storedProp.bodyWeight}
                onChange={(e) =>
                  setStoredProp({
                    ...storedProp,
                    bodyWeight: e.target.value,
                  })
                }
                type="tel"
                radius="none"
                className="rounded-none "
              />

              <Input
                label="Color"
                value={storedProp.color}
                onChange={(e) =>
                  setStoredProp({
                    ...storedProp,
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
                isSelected={storedProp.isPublic}
                onValueChange={() => {
                  setStoredProp({
                    ...storedProp,
                    isPublic: !storedProp.isPublic,
                  });
                }}
              />
            </div>

            <div className="mt-20 flex space-x-2 items-center justify-end">
              <Button
                isLoading={loading}
                onPress={() => handleSubmit()}
                radius="none"
                className="w-full rounded-md h-12 bg-black text-white"
              >
                {" "}
                Update{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
