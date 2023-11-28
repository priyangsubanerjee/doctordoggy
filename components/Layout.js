/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Onboarding from "./Onboarding";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import InstallApp from "./InstallApp";

function Layout({ children }) {
  const session = useSession();

  const [userAgent, setUserAgent] = React.useState("");
  const [showInstallModal, setShowInstallModal] = React.useState(false);
  const [isAppIsInstalled, setIsAppIsInstalled] = React.useState(false);

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

  //   useEffect(() => {
  //     if (session?.status === "authenticated") {
  //       if (session?.data?.user?.onBoardingSuccess == true) {
  //         if (checkUserAgent() == "safari") {
  //           if (checkIfAppIsInstalled == false) {
  //             setShowInstallModal(true);
  //           }
  //         }
  //       }
  //     }
  //   }, [session.status]);

  return (
    <div className="pt-16 lg:pt-28 h-fit">
      <Onboarding />
      <InstallApp />
      <Navbar />
      {children}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 60,
          right: 50,
        }}
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: 0,
            fontSize: "0.8rem",
          },
        }}
      />
    </div>
  );
}

export default Layout;
