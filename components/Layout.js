/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Onboarding from "./Onboarding";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import InstallApp from "./InstallApp";
import NotificationPermission from "./NotificationPermission";
import useFcmToken from "@/firebase/useToken";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "@/firebase/app";

function Layout({ children }) {
  const session = useSession();

  useEffect(() => {
    if (
      session.status === "authenticated" &&
      session.data.user.onBoardingSuccess == true &&
      Notification.permission == "granted"
    ) {
      let tokenUpdatedInSession =
        sessionStorage.getItem("tokenUpdated") || null;
      if (tokenUpdatedInSession == null) {
        sessionStorage.setItem("tokenUpdated", true);
        retrieveToken();
      }

      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
          alert("Foreground push notification received:", payload);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event
        };
      }
    }
  }, [session.status]);

  return (
    <div className="pt-16 lg:pt-28 h-fit">
      <Onboarding />
      <InstallApp />
      <NotificationPermission />
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
