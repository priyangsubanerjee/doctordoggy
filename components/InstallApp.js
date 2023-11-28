/* eslint-disable @next/next/no-img-element */
import GlobalStates from "@/context/GlobalState";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";

function InstallApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(true);

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
    let installModalShown = localStorage.getItem("ins-md-sh") || null;
    if (installModalShown && installModalShown == "true") {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (checkUserAgent() == "safari") {
      if (checkIfAppIsInstalled() == false) {
        setIsInstalled(false);
        if (isAllowed() == true) {
          setIsVisible(true);
          localStorage.setItem("ins-md-sh", "true");
        }
      } else {
        setIsInstalled(true);
      }
    }
  }, []);

  useEffect(() => {
    isVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isVisible, setIsVisible]);

  const FAB = ({}) => {
    return (
      <>
        {isInstalled == false && (
          <button
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className={`h-14 w-14 text-neutral-700 shadow-xl shadow-black/10 fixed z-50 right-6 bottom-7 rounded-full flex items-center justify-center ${
              isVisible ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {isVisible ? (
              <Icon height={32} icon="iconamoon:close-light" />
            ) : (
              <Icon height={26} icon="mdi:bell" />
            )}
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full flex items-end lg:items-center justify-center w-full z-40 bg-black/70 inset-0 fixed"
          >
            <div className="h-auto w-full px-3 pb-4">
              <div className="w-full h-full relative bg-neutral-100/80 backdrop-blur-lg rounded-3xl py-6">
                <div className="flex items-center px-6">
                  <div className="h-14 w-14 flex items-center justify-center bg-white rounded-lg p-2">
                    <img src="/logoDark.png" alt="" />
                  </div>
                  <div className="ml-3">
                    <h1 className="font-semibold">Install Doctor Doggy</h1>
                    <p className="text-xs text-neutral-500 mt-1">
                      Never miss an important date
                    </p>
                  </div>
                </div>
                <div className="h-[1px] w-auto bg-neutral-800/20 mt-6"></div>
                <div className="p-5">
                  <p className="text-sm leading-6">
                    To receive push notifications in your iOS device you need to
                    add this to home screen. Follow the steps below.
                  </p>

                  <p className="mt-10 text-sm flex items-center">
                    1. Tap on{" "}
                    <span className="bg-white p-2 text-blue-600 ml-1 rounded-md inline-flex items-center justify-center">
                      <Icon height={19} icon="ion:share-outline" />
                    </span>
                  </p>
                  <p className="mt-6 text-sm">
                    2. Select{" "}
                    <span className="bg-white px-2 py-1 rounded">
                      Add to home screen
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FAB />
    </>
  );
}

export default InstallApp;
