/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Onboarding from "./Onboarding";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import InstallApp from "./InstallApp";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "@/firebase/app";
import { subscribe } from "@/helper/subscribe";
import CheckConnecion from "./CheckConnecion";

function Layout({ children }) {
  const session = useSession();

  const checkIfNeedsRefresh = async () => {
    let tokenUpdatedInSession = sessionStorage.getItem("tokenUpdated") || null;
    if (tokenUpdatedInSession == null) {
      console.log("Token not updated");
      sessionStorage.setItem("tokenUpdated", true);
      subscribe();
    } else {
      console.log("Token updated");
    }
  };

  useEffect(() => {
    if (
      session.status === "authenticated" &&
      session.data.user.onBoardingSuccess == true
    ) {
      if (!("Notification" in window)) {
        console.log("This browser does not support notification");
      }

      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          checkIfNeedsRefresh();
        }
      }
    }
  }, [session.status]);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        alert("Foreground push notification received:", payload);
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    } else {
      console.error("Service worker is not available");
    }
  }, []);

  // navigator online check

  return (
    <div className="pt-[104px] lg:pt-28 h-fit">
      <Onboarding />
      <InstallApp />
      <Navbar />
      <CheckConnecion />
      {children}
      <Toaster
        position="top-center"
        containerStyle={{
          top: 140,
        }}
        toastOptions={{
          style: {
            background: "#fff",
            color: "#000",
            borderRadius: 4,
            fontSize: "0.8rem",
          },
        }}
      />
    </div>
  );
}

export default Layout;
