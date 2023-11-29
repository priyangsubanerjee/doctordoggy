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
  const [userAgent, setUserAgent] = React.useState("");
  const [showInstallModal, setShowInstallModal] = React.useState(false);
  const [isAppIsInstalled, setIsAppIsInstalled] = React.useState(false);

  useEffect(() => {
    if (
      session.status === "authenticated" &&
      session.data.user.onBoardingSuccess == true &&
      Notification.permission == "granted"
    ) {
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

  const retrieveToken = async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(firebaseApp);
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
          });
          if (currentToken) {
            alert("FCM generated: " + currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        }
      }
    } catch (error) {
      console.log("An error occurred while retrieving token:", error);
    }
  };

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
