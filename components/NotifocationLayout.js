import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/messaging";
import firebaseApp, { firebaseCloudMessaging } from "../firebase/firebase";
import { useRouter } from "next/router";
import useFcmToken from "@/helper/hooks/useFcmToken";
import { getMessaging, onMessage } from "firebase/messaging";

function NotificationLayout({ children }) {
  const router = useRouter();
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  fcmToken && console.log("FCM token:", fcmToken);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return <>{children}</>;
}

export default NotificationLayout;
