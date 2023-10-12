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

  const CCNameEmail = () => {
    return (
      <div
        id="ccne-modal"
        className="hidden fixed inset-0 h-full w-full bg-black/70 items-center justify-center z-30"
      >
        <div className="max-w-lg w-full bg-white rounded-lg p-8">
          <h1 className="font-semibold text-xl">
            Why cant I edit my name and email?
          </h1>
          <p className="mt-3 text-sm text-neutral-700 leading-6">
            Your name and email are fetched from your account provider. To
            change your name and email, you need to change it in your account
            provider, such as Google, Github, etc.
          </p>
          <Button
            onPress={() => {
              document.getElementById("ccne-modal").classList.remove("flex");
              document.getElementById("ccne-modal").classList.add("hidden");
            }}
            radius="full"
            color="primary"
            className="mt-7"
          >
            Okay, I understand
          </Button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (state == "view") return;
    const phoneInput = document.getElementById("phoneInput");
    phoneInput.focus();
  }, [state]);

  return (
    <div className="lg:px-44 px-6 py-20 lg:py-16">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl mt-10 gap-2 lg:gap-4">
        <Input
          label="Name (as per your account provider)"
          type="text"
          placeholder="Enter your text"
          radius="none"
          value={accountProp.name}
          readOnly
          className="rounded-none cursor-not-allowed pointer-events-none opacity-50"
        />

        <Input
          label="Email (as per your account provider)"
          type="email"
          placeholder="Enter your text"
          radius="none"
          value={accountProp.email}
          readOnly
          className="rounded-none pointer-events-none opacity-50"
        />
        <Input
          label="Phone number"
          id="phoneInput"
          type="tel"
          radius="none"
          className="rounded-none border border-transparent focus-within:border-black/30"
        />
        <Input
          label="Area pincode"
          type="tel"
          radius="none"
          className="rounded-none border border-transparent focus-within:border-black/30"
        />

        <Textarea
          label="Full Address (Optional)"
          radius="none"
          className="rounded-none border border-transparent focus-within:border-black/30 lg:col-span-2"
        />
        <div className="mt-8 flex items-center justify-end lg:justify-between lg:col-span-2">
          <button
            onClick={() => {
              document.getElementById("ccne-modal").classList.remove("hidden");
              document.getElementById("ccne-modal").classList.add("flex");
            }}
            className="text-sm text-blue-600 hover:underline hidden lg:block"
          >
            Why cant I edit my name and email?
          </button>
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

      <CCNameEmail />
    </div>
  );
}

export default Account;
