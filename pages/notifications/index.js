/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";

function Notifications() {
  const [isPermissionGranted, setIsPermissionGranted] = React.useState(false);
  const [lastAskedOn, setLastAskedOn] = React.useState("");

  useEffect(() => {
    let state = localStorage.getItem("notificationPermission") || null;
    if (state == "granted") {
      setIsPermissionGranted(true);
    } else {
      setIsPermissionGranted(false);
    }

    let lastAsked =
      localStorage.getItem("notificationPermissionLastAsked") || null;
    lastAsked = new Date(lastAsked);
    lastAsked = lastAsked.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setLastAskedOn(lastAsked);
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-center mt-20 lg:mt-16">
        Notification Settings
      </h1>

      <div className="flex items-center justify-center space-x-2 mt-4">
        <p className="text-center text-neutral-600 text-sm">
          Receive push notifications
        </p>
        <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
          <span>Learn more</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>

      <div className="border w-[90%] text-center lg:w-fit mx-auto p-12 rounded-xl mt-14 lg:mt-20">
        {isPermissionGranted ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10175/10175334.png"
              className="h-16"
              alt=""
            />
            <p className="text-center text-neutral-800 text-lg font-semibold mt-5">
              Notification enabled
            </p>
            <p className="text-sm text-neutral-600 mt-4">
              We have found that push notifications are enabled on your device.
            </p>
            <p className="text-xs mt-3">
              <span className="text-neutral-500">Last asked on </span>
              <span className="text-neutral-700">{lastAskedOn}</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10175/10175334.png"
              className="h-16"
              alt=""
            />
            <p className="text-center text-neutral-800 text-lg font-semibold mt-5">
              Notification disabled
            </p>
            <p className="text-sm text-neutral-600 mt-4 leading-6">
              We have found that push notifications are disabled on your device.
            </p>
            <p className="text-xs lg:mt-3 mt-7 text-blue-500 hover:underline">
              Learn how to enable
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
