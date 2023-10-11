import { Icon } from "@iconify/react";
import { Button, Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

function Account() {
  const [state, setState] = useState("view"); // ["view", "edit"]

  const Statemanager = () => {
    return state == "view" ? (
      <>
        <Button onClick={() => setState("edit")} radius="sm" color="default">
          Edit profile
        </Button>
      </>
    ) : (
      <>
        <Button onClick={() => setState("view")} radius="sm" color="primary">
          Save changes
        </Button>
      </>
    );
  };

  return (
    <div className="lg:px-44 py-16">
      <h1 className="text-3xl font-medium">Account</h1>
      <div className="flex items-center space-x-2 mt-3 text-neutral-600 text-sm">
        <span>Unable to access this page?</span>
        <Link href={"/report"}>
          <button className="flex text-blue-600 items-center space-x-1 hover:underline">
            <Icon height={18} icon="solar:bug-outline" />
            <span>Report this page.</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 max-w-3xl mt-10 gap-4">
        <div>
          <Input
            radius="sm"
            variant="flat"
            type="text"
            label="Name"
            placeholder="Enter your name"
            readOnly
            value={"Priyangsu Banerjee"}
            className="opacity-60"
          />
        </div>
        <div>
          <Input
            radius="sm"
            type="text"
            label="Email"
            placeholder="Enter your email"
            readOnly={state == "view"}
            value={"priyangsu26@gmail.com"}
            className="opacity-60"
          />
        </div>
        <div>
          <Input
            radius="sm"
            type="tel"
            label="Phone"
            placeholder="Enter your phone"
            readOnly={state == "view"}
            value={"9647045453"}
          />
        </div>
        <div>
          <Input
            radius="sm"
            type="tel"
            label="Pincode"
            placeholder="Enter your area pincode"
            readOnly={state == "view"}
            value={"713216"}
          />
        </div>
        <div className="col-span-2">
          <Textarea
            radius="sm"
            label="Address"
            labelPlacement="inside"
            placeholder="Enter your description"
          />
        </div>
      </div>

      <div className="mt-8">
        <Statemanager />
      </div>
    </div>
  );
}

export default Account;
