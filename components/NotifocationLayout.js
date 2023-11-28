import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/messaging";
import firebaseApp, { firebaseCloudMessaging } from "../firebase/firebase";
import { useRouter } from "next/router";
import useFcmToken from "@/helper/hooks/useFcmToken";
import { getMessaging, onMessage } from "firebase/messaging";

function NotificationLayout() {
  const router = useRouter();
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    try {
      fcmToken && console.log("FCM token:", fcmToken);
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground push notification received:", payload);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event
        };
      }
    } catch (error) {
      console.log("An error occurred while retrieving token:", error);
    }
  }, []);

  return <></>;
}

export default NotificationLayout;
