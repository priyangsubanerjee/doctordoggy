/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { Switch } from "@nextui-org/react";
import Link from "next/link";

function RegisterPet() {
  const [isPublicProfile, setIsPublicProfile] = React.useState(false);
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

      <div className="flex w-[80%] mx-auto space-x-12 mt-16">
        <div className="w-fit shrink-0">
          <div className="h-full max-h-[500px] w-96 bg-neutral-100 rounded-md relative">
            <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center">
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
          </div>
        </div>
        <div className="w-full">
          <p className="text-xs text-neutral-600">
            General information about your pet
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-b">
            <Input
              label="Name of your pet"
              type="email"
              radius="none"
              className="rounded-none  col-span-2"
            />

            <Input
              label="Species"
              type="email"
              radius="none"
              className="rounded-none "
            />

            <Input
              label="Breed"
              type="text"
              radius="none"
              className="rounded-none "
            />
            <Input
              label="Sex"
              type="text"
              radius="none"
              className="rounded-none "
            />
            <Input
              label="Date of birth"
              type="text"
              radius="none"
              className="rounded-none "
            />
            <Input
              label="Body weight"
              type="text"
              radius="none"
              className="rounded-none "
            />
          </div>
          <div className="h-[1px] w-full my-8"></div>
          <p className="text-xs text-neutral-600">Privacy</p>
          <div className="flex items-center justify-between max-w-sm mt-5">
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
            <Switch checked={isPublicProfile} onChange={setIsPublicProfile} />
          </div>
          <div className="h-[1px] w-full my-8"></div>
          <p className="text-xs text-neutral-600">Alerts</p>
          <div className="flex items-center justify-between max-w-sm mt-5">
            <div>
              <p className="text-neutral-800 text-sm">
                Receive sms & email alerts ?
              </p>
            </div>
            <Switch checked={isPublicProfile} onChange={setIsPublicProfile} />
          </div>
          <div className="mt-20 flex items-center justify-start">
            <Button
              radius="none"
              color="primary"
              className="w-1/2 rounded h-12"
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
