/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

function Dev() {
  const router = useRouter();
  return (
    <div className="px-6 lg:px-32 mt-16 lg:mt-16">
      <div className="h-[500px] bg-[url('https://uploads-ssl.webflow.com/5a9ee6416e90d20001b20038/64f5c2c33e2504f6bbf98f2e_Rectangle%20(6).svg')] bg-cover bg-no-repeat w-full rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center px-6 lg:px-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2504/2504710.png"
            className="h-20 lg:h-24"
            alt=""
          />
          <h1 className="text-2xl lg:text-4xl font-semibold mt-12 text-center">
            Platform Under Development
          </h1>
          <h1 className="lg:text-xl mt-4 text-center text-base">
            Some thing is gonna happen soon ...
          </h1>
          <p className="text-center max-w-md mt-6 text-xs lg:text-sm leading-7 lg:leading-7">
            If you had already registered, you will be notified via email once
            the platform is ready. Your data is safe with us.
          </p>
          <div className="flex items-center justify-center mt-10">
            <Button
              onPress={() => router.push("/")}
              className="bg-black rounded-full text-white"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dev;
