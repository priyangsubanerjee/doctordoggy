/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPetById } from "@/prisma/pet";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Switch,
} from "@nextui-org/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import GlobalStates from "@/context/GlobalState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "@/helper/image";
import Compressor from "compressorjs";
import { getBreeds } from "@/prisma/breed";

function EditProfile() {
  const router = useRouter();
  const session = useSession();
  const imageRef = React.useRef(null);
  const { updatedModal } = useContext(GlobalStates);

  const [pet, setPet] = useState(null);
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

  const [pageLoaded, setPageLoaded] = useState(false);
  const [imageFile, setImageFile] = useState(null); // cannot be null
  const [loading, setLoading] = useState(false);
  const [species, setSpecies] = React.useState([]);
  const [breedOptions, setBreedOptions] = React.useState([]);
  const [breedList, setBreedList] = useState([]);

  const dataURLtoFile = (dataurl, filename, type) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type });
  };

  useEffect(() => {
    setBreedOptions([]);
    if (storedProp.species.length != 0) {
      let breed_names = [];
      breedList.forEach((breed) => {
        if (
          breed.type.toLocaleLowerCase() ==
          storedProp.species.toLocaleLowerCase()
        ) {
          breed_names.push(breed.name);
        }
        setBreedOptions(breed_names);
      });
    } else {
      setBreedOptions([]);
    }
  }, [breedList, storedProp.species]);

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
            id: storedProp.id,
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
        updatedModal(false, "Pet updated successfully");
        toast.success("Pet updated successfully");
        router.push(`/pets/${storedProp.id}`);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      (async () => {
        let parentRequest = await axios.post(
          "/api/pet/read_vis",
          {
            id: router.query.id,
            email: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (parentRequest.data.success) {
          let petRequest = await axios.post(
            `/api/pet/getbyid`,
            {
              id: router.query.id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (petRequest.data.success) {
            let breedsRequest = await axios.get(`/api/breed`);
            if (breedsRequest.data.success) {
              let breeds = [];
              let species = [];

              breedsRequest.data.breeds.forEach((breed) => {
                !species.includes(breed.type.toLocaleLowerCase()) &&
                  species.push(breed.type.toLocaleLowerCase());
              });

              breeds = breedsRequest.data.breeds;

              setBreedList(breeds);
              setSpecies(species);
              setPageLoaded(true);

              setStoredProp({
                ...storedProp,
                ...petRequest.data.pet,
                dateOfBirth: new Date(
                  petRequest.data.pet.dateOfBirth.split("T")[0]
                )
                  .toISOString()
                  .split("T")[0],
              });
            }
          }
        } else {
          toast.error("You are not authorized to edit this pet.");
          router.push("/pets");
        }
      })();
    }
  }, [session.status]);

  return (
    <div>
      <div className="pb-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mt-10 lg:mt-16">
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

        {pageLoaded ? (
          <>
            <div className="lg:flex lg:w-[80%] mx-6 lg:mx-auto lg:space-x-12 mt-10 lg:mt-16">
              <div className="lg:w-fit w-full shrink-0">
                <div
                  onClick={() => imageRef?.current.click()}
                  className="h-[200px] lg:h-full lg:max-h-[350px] lg:w-96 bg-neutral-100 hover:bg-neutral-200 rounded-md relative cursor-pointer transition-all overflow-hidden"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log(file.size / 1024 / 1024, "MB");
                      if (file == null) return;
                      let canvas = document.createElement("canvas");
                      let ctx = canvas.getContext("2d");
                      let cw = canvas.width;
                      let ch = canvas.height;
                      let maxW = 500;
                      let maxH = 500;
                      let img = new Image();
                      img.src = URL.createObjectURL(file);
                      img.onload = function () {
                        let iw = img.width;
                        let ih = img.height;
                        let scale = Math.min(maxW / iw, maxH / ih);
                        let iwScaled = iw * scale;
                        let ihScaled = ih * scale;
                        canvas.width = iwScaled;
                        canvas.height = ihScaled;
                        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
                        let dataURL = canvas.toDataURL("image/jpeg", 0.1);
                        let resizedImage = dataURL.replace(
                          /^data:image\/(png|jpg|jpeg);base64,/,
                          ""
                        );
                        let fileResized = dataURLtoFile(
                          dataURL,
                          file.name,
                          file.type
                        );
                        console.log(fileResized.size / 1024 / 1024, "MB");
                        setImageFile(fileResized);
                      };
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
                          <p className="mt-3 font-medium">
                            Choose another photo
                          </p>
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
                      setStoredProp({ ...storedProp, species: e.target.value });
                    }}
                    selectedKeys={[storedProp.species]}
                    radius="none"
                    label="Species"
                  >
                    {species.map((type, index) => {
                      return (
                        <SelectItem key={type} value={type}>
                          {type.substring(0, 1).toUpperCase() +
                            type.substring(1)}
                        </SelectItem>
                      );
                    })}
                  </Select>

                  <Autocomplete
                    isDisabled={storedProp.species.length == 0}
                    onSelectionChange={(value) => {
                      setStoredProp({ ...storedProp, breed: value });
                    }}
                    selectedKey={storedProp.breed}
                    radius="none"
                    label="Select breed"
                  >
                    {breedOptions.map((animal) => (
                      <AutocompleteItem key={animal} value={animal}>
                        {animal}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

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
          </>
        ) : (
          <div className="flex items-center justify-center mt-20">
            <Spinner color="primary" size="lg" className="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
