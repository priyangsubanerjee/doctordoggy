/* eslint-disable @next/next/no-img-element */
import { retrieveToken } from "@/helper/token";
import { Button } from "@nextui-org/react";
import { getSession } from "next-auth/react";
import React from "react";

function PermissionLayout() {
  const session = getSession();
  const TriggerPermission = async () => {
    let permission = await Notification.requestPermission();
    if (permission == "granted") {
      setIsPermissionLayoutVisible(false);
      await retrieveToken();
    }
  };
  return (
    <div className="h-fit bg-white p-6 md:p-8">
      <div className="border rounded-xl p-5 md:p-8 md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="md:flex items-center">
          <img
            src="https://www.magicbell.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmagicbell%2Fimage%2Ffetch%2Ff_auto%2Cq_auto%2Fhttps%3A%2F%2Fmagicbell.ghost.io%2Fcontent%2Fimages%2F2022%2F01%2FHow-to-Design-Better-Push-Notifications-for-Mobile-Apps.jpg&w=1920&q=75"
            alt=""
            className="h-24 md:h-32 mx-auto lg:-ml-7"
          />
          <div className="md:ml-5 mt-4 md:mt-0">
            <h2 className="font-semibold text-base lg:text-xl">
              Subscribing to push messages
            </h2>
            <p className="text-xs lg:text-sm text-neutral-500 leading-6 mt-2">
              We need your permission to send you notifications regarding your
              pets scheduled appointment, vaccination and other important dates.
            </p>
            <Button
              onClick={() => TriggerPermission()}
              className="rounded-md mt-4 w-full md:w-fit"
            >
              Ask permission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PermissionLayout;
