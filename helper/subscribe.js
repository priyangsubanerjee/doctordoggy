import firebaseApp from "@/firebase/app";
import axios from "axios";
import { getMessaging, getToken } from "firebase/messaging";
import { getSession } from "next-auth/react";
import toast from "react-hot-toast";

export const subscribe = async (showToast) => {
  let session = await getSession();
  let messaging = getMessaging(firebaseApp);
  try {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (Notification.permission == "granted") {
        showToast && toast.loading("Subscribing to push notifications");
        const token = await getToken(messaging, {
          vapidKey:
            "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
        });
        if (token) {
          showToast && toast.success("Subscribed to push notifications");
          try {
            await axios.post(
              "/api/fcm/update",
              {
                email: session.user.email,
                token: token,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            return token;
          } catch (error) {
            showToast &&
              toast.error("Error while subscribing to push notifications");
            console.log(error);
            return null;
          }
        } else {
          showToast &&
            toast.error("Error while subscribing to push notifications");
          subscribe();
          return null;
        }
      }
    }
  } catch (error) {
    console.log("Service worker registration failed, error:", error);
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(async function (reg) {
        if (reg.installing) {
        } else if (reg.waiting) {
        } else if (reg.active) {
          subscribe();
        }
      });
    subscribe();
  }
};
