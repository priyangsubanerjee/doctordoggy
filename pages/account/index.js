import { Icon } from "@iconify/react";
import { Button, Divider, Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Account() {
  const session = useSession();
  const [state, setState] = useState("view"); // ["view", "edit"]
  const [accountProp, setAccountProp] = useState({
    name: session?.data?.user?.name || "",
    email: session?.data?.user?.email || "",
    phone: "",
    zipcode: "",
    address: "",
  });

  const Statemanager = () => {
    return state == "view" ? (
      <>
        <p className="text-sm text-neutral-600">
          Something is not right?{" "}
          <button
            onClick={() => setState("edit")}
            className="text-blue-600 hover:underline"
          >
            Edit your details
          </button>
        </p>
      </>
    ) : (
      <div className="flex items-center space-x-10">
        <button
          className="text-neutral-600 hover:underline text-sm h-12"
          onClick={() => setState("view")}
        >
          Cancel
        </button>
        <Button className="rounded-md bg-neutral-800 hover:bg-black text-white h-12">
          Save changes
        </Button>
      </div>
    );
  };

  useEffect(() => {
    if (state == "view") return;
    const phoneInput = document.getElementById("phoneInput");
    phoneInput.focus();
  }, [state]);

  return (
    <div className="lg:px-44 px-6 py-16">
      <h1 className="text-2xl lg:text-3xl font-medium">Account</h1>
      <div className="flex items-center space-x-2 mt-3 text-neutral-600 text-xs lg:text-sm">
        <span>Unable to access this page?</span>
        <Link href={"/report"}>
          <button className="flex text-blue-600 items-center space-x-1 hover:underline">
            <Icon height={18} icon="solar:bug-outline" />
            <span>Report a bug.</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl mt-10 gap-4">
        <Input
          label="Name (as per your account provider)"
          type="text"
          placeholder="Enter your text"
          radius="none"
          value={accountProp.name}
          readOnly
          className="rounded-none cursor-not-allowed pointer-events-none"
        />

        <Input
          label="Email (as per your account provider)"
          type="email"
          placeholder="Enter your text"
          radius="none"
          value={accountProp.email}
          readOnly
          className="rounded-none border border-transparent focus-within:border-black/30 pointer-events-none"
        />
        <Input
          label="Phone"
          id="phoneInput"
          type="tel"
          placeholder="Enter your phone number"
          radius="none"
          className="rounded-none border border-transparent focus-within:border-black/30"
        />
        <Input
          label="Zipcode"
          type="tel"
          placeholder="Enter your area pincode"
          radius="none"
          className="rounded-none border border-transparent focus-within:border-black/30"
        />

        <Textarea
          label="Address"
          placeholder="Enter your address"
          radius="none"
          className="rounded-none border border-transparent focus-within:border-black/30 lg:col-span-2"
        />
        <div className="mt-8 flex items-center justify-end lg:col-span-2">
          <Statemanager />
        </div>
      </div>

      <Divider className="my-36" />

      <div>
        <h1 className="text-2xl lg:text-3xl font-medium">Feedback</h1>
        <p className="mt-3 text-neutral-600 text-xs lg:text-sm">
          Help us get better. Together we can make the world a better place for
          our pets.
        </p>
        <Textarea
          variant="flat"
          placeholder="Enter your text here"
          radius="none"
          rows={5}
          className="rounded-none border border-transparent max-w-4xl lg:col-span-2 mt-5"
        />
        <Button className="rounded-md bg-neutral-800 hover:bg-black text-white mt-8 text-sm">
          Send
        </Button>
      </div>
    </div>
  );
}

export default Account;
