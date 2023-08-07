/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession } from "next-auth/react";
import React from "react";

function OnboardingSuccess() {
  const session = useSession();
  return (
    <div className="inset-0 fixed z-30 bg-neutral-100 lg:p-16 text-center lg:pt-32 flex justify-center">
      <div className="max-w-xl bg-white border h-fit px-8 pt-16 pb-8 rounded-md">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2437/2437643.png"
          className="mx-auto h-20"
          alt=""
        />
        <h2 className="mt-10 text-neutral-500 text-sm">
          Happy parenting,{" "}
          <span className="text-neutral-700 font-medium">
            {session?.data?.user?.name}
          </span>
        </h2>
        <h1 className="text-4xl font-bold mt-6 text-neutral-800">
          Onboarding <span className="text-pink-500">success</span>
        </h1>
        <p className="text-sm leading-7 mt-6 text-neutral-500">
          You have successfully completed the onboarding process. You can now
          register your pets in the dashboard & start using the app.
        </p>

        <div className="grid grid-cols-2 mt-16 gap-2">
          <button
            onClick={async () => {
              window.open("/dashboard", "_self");
            }}
            className="flex items-center justify-center space-x-2 w-full lg:px-5 px-5 py-3 rounded bg-blue-500 text-white text-sm"
          >
            <iconify-icon
              height="20"
              icon="icon-park-solid:check-one"
            ></iconify-icon>
            <span>Proceed to dashboard</span>
          </button>
          <button className="w-full">
            <a
              href="/dashboard"
              className="flex items-center justify-center space-x-2 w-full lg:px-5 px-5 py-3 rounded bg-neutral-100 text-neutral-700 text-sm"
            >
              <iconify-icon
                height="20"
                icon="icon-park-solid:check-one"
              ></iconify-icon>
              <span>Need help? Contact us</span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingSuccess;
