/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function Waitlist() {
  return (
    <div className="pb-16">
      <div className="relative">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/007/100/608/small_2x/abstract-geometric-white-and-gray-on-light-silver-gradient-background-modern-banner-design-illustration-free-vector.jpg"
          className="w-full h-[250px] object-cover absolute top-0 inset-x-0"
          alt=""
        />
        <div className="absolute inset-0 w-full h-[300px] bg-gradient-to-b from-white to-transparent"></div>
      </div>
      <div className="z-10 relative px-4 mt-16">
        <h1 className="text-2xl lg:text-3xl font-semibold text-center">
          Page in development
        </h1>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <p>
            You can still join the waitlist to be notified when we launch this
            feature.
          </p>
        </div>
        <form className="md:w-[500px] bg-white  mt-10 border rounded-2xl mx-auto p-6">
          <div>
            <label className="text-sm text-neutral-500" htmlFor="">
              Enter your email
            </label>
            <Input
              className="h-12 rounded text-base mt-2"
              radius="sm"
              placeholder="Email"
              required={true}
            />
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link href={"/"}>
              <button
                type="button"
                className="text-sm mr-4 text-neutral-600 hover:underline"
              >
                Cancel and go back
              </button>
            </Link>
            <Button
              type="submit"
              className="bg-black text-white rounded-md text-sm"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Waitlist;
