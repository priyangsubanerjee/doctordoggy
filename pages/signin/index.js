/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";
import { signIn } from "next-auth/react";

function SignIn() {
  return (
    <div className="pt-20 px-6">
      <h1 className="text-2xl lg:text-4xl text-center font-medium">Sign In</h1>
      <p className="text-xs lg:text-sm text-center mt-3 text-neutral-600 leading-6">
        Sign in with you google account & stay in sync with your pet&apos;s
        health.
      </p>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-3">
        <Button
          onClick={() => {
            let next = new URL(window.location.href).searchParams.get("next");
            let callbackUrl = `${window.location.origin}${next}`;
            signIn("google", {
              callbackUrl,
            });
          }}
          className="border bg-transparent flex items-center justify-center space-x-3 h-16 outline-none"
        >
          <Icon height={28} icon="devicon:google" />
          <span className="text-base">Sign in with Google</span>
        </Button>
        {/* <Button className="border bg-transparent flex items-center justify-center space-x-3 h-16 outline-none">
          <Icon height={28} icon="devicon:github" />
          <span className="text-base">Sign in with Github</span>
        </Button> */}
      </div>
      <div className="w-full max-w-2xl mx-auto mt-24 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/001/078/362/small/overlapping-white-grey-gradient-circles-background.jpg')] bg-cover bg-no-repeat rounded-2xl p-6 pb-10 flex flex-col items-center justify-center">
        <Icon height={44} icon="ph:globe-thin" className="mx-auto" />
        <h1 className="text-xl font-semibold mt-2">Join the revolution</h1>
        <p className="text-sm text-neutral-600 text-center mt-2 leading-6">
          Join us as a doctor or a partner and help us make the world a better
          place for our pets.
        </p>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-6">
          <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline">
            <span>Doctors portal</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </button>
          <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline">
            <span>Partners portal</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
