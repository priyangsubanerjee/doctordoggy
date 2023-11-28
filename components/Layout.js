import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Onboarding from "./Onboarding";
import toast, { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "@/firebase/config";
import { getToken } from "next-auth/jwt";

function Layout({ children }) {
  //   const requestPermission = async () => {
  //     // request permission from user
  //     if ("Notification" in window) {
  //       const permission = await Notification.requestPermission();
  //       // if user grants permission
  //       if (permission === "granted") {
  //         const app = initializeApp(firebaseConfig);
  //         const messaging = getMessaging(app);
  //         // getToken(messaging, {
  //         //   vapidKey:
  //         //     "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
  //         // });
  //         // console.log(token);
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     requestPermission();
  //   }, []);
  return (
    <div className="pt-16 lg:pt-28">
      <Onboarding />
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
