/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import React from "react";

function Dev() {
  return (
    <div className="px-6 lg:px-32 mt-6 lg:mt-16">
      <div className="h-[500px] bg-[url('https://img.freepik.com/free-vector/abstract-fluid-neon-color-3d-effect-background-banner-design-multipurpose_1340-16669.jpg')] bg-cover bg-no-repeat w-full rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center px-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968499.png"
            className="h-16"
            alt=""
          />
          <h1 className="text-4xl font-semibold mt-12">
            Platform Under Developing
          </h1>
          <h1 className="text-xl mt-4">Some thing is gonna happen soon ...</h1>
          <p className="text-center max-w-md mt-6 text-sm leading-7">
            If you had already registered, you will be notified via email once
            the platform is ready. Your data is safe with us.
          </p>
          <div className="flex items-center justify-center mt-10">
            <Button className="bg-black rounded-full text-white">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dev;
