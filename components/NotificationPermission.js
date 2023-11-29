/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import GlobalStates from "@/context/GlobalState";
import firebaseApp from "@/firebase/app";
import { retrieveToken } from "@/helper/token";
import { Button } from "@nextui-org/react";
import { getMessaging, getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function NotificationPermission() {
  const session = useSession();

  const [isVisible, setIsVisible] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  function checkUserAgent() {
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) != -1
    ) {
      return "opera";
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
      return "edge";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return "chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      return "safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return "firefox";
    } else if (
      navigator.userAgent.indexOf("MSIE") != -1 ||
      !!document.documentMode == true
    ) {
      return "ie";
    } else {
      return "unknown";
    }
  }

  function checkIfAppIsInstalled() {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return true;
    } else {
      return false;
    }
  }

  function isAllowed() {
    let permissionLastAsked =
      localStorage.getItem("notificationPermissionLastAsked") || null;
    let today = new Date();

    if (permissionLastAsked == null) {
      return true;
    } else {
      let lastAsked = new Date(permissionLastAsked);
      let diff = today - lastAsked;
      let days = diff / (1000 * 3600 * 24);
      if (days > 1) {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    let today = new Date();
    if (
      isAllowed() == true &&
      session.status == "authenticated" &&
      session.data.user.onBoardingSuccess == true
    ) {
      if (checkUserAgent() == "safari") {
        if (checkIfAppIsInstalled() == true) {
          if (Notification.permission !== "granted") {
            if (
              Notification.permission == "denied" &&
              process.env.NODE_ENV !== "development"
            ) {
              localStorage.setItem("notificationPermission", "denied");
              setIsBlocked(true);
            }

            localStorage.setItem("notificationPermissionLastAsked", today);
            setIsVisible(true);
          }
        } else {
          setIsVisible(false);
        }
      } else {
        if (Notification.permission !== "granted") {
          localStorage.setItem("notificationPermissionLastAsked", today);
          setIsVisible(true);
        } else {
        }
      }
    }
  }, [session.status]);

  const askPermission = async () => {
    if (Notification.permission === "granted") {
      localStorage.setItem("notificationPermission", "granted");
      return true;
    } else {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem("notificationPermission", "granted");
        setIsVisible(false);
        await retrieveToken();
        return true;
      } else {
        localStorage.setItem("notificationPermission", "denied");
        setIsBlocked(true);
        return false;
      }
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 h-full w-full z-50 bg-black/50 flex items-center">
          <div className="h-full lg:h-fit lg:w-[500px] w-full bg-white lg:rounded-xl mx-auto lg:py-8 py-16 px-5 lg:px-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9225/9225884.png"
              className="mx-auto h-20 lg:mt-8"
              alt=""
            />

            <h1 className="text-2xl font-semibold text-neutral-700 mt-10 text-center">
              {isBlocked ? "Notifications are blocked" : "Enable notifications"}
            </h1>

            <p className="text-center leading-6 text-neutral-500 text-sm mt-6">
              We need your permission to send you notifications regarding your
              pets scheduled appointment, vaccination and other important
              information.
            </p>

            {isBlocked == false && (
              <>
                <div className="flex justify-center mt-16 lg:mt-10">
                  <Button
                    onPress={() => askPermission()}
                    className="w-[250px] text-base h-14 font-semibold bg-neutral-800 text-white rounded-full mx-auto text-center"
                  >
                    Allow
                  </Button>
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    onClick={() => {
                      setIsVisible(false);
                      localStorage.setItem(
                        "notificationPermissionLastAsked",
                        today
                      );
                    }}
                    className="w-[250px] text-sm hover:underline h-14 text-neutral-600 rounded-full mx-auto text-center"
                  >
                    Remind later
                  </button>
                </div>
              </>
            )}
            {isBlocked && (
              <div className="flex justify-center mt-16 lg:mt-10 mb-8">
                <Link href="/notifications">
                  <Button className="w-[250px] text-base h-14 font-semibold bg-neutral-800 text-white rounded-full mx-auto text-center">
                    Learn more
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationPermission;
