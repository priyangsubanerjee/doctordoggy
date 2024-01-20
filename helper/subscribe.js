import firebaseApp from "@/firebase/app";
import axios from "axios";
import { getMessaging, getToken } from "firebase/messaging";
import { getSession } from "next-auth/react";

export const subscribe = async () => {
  let session = await getSession();
  let messaging = getMessaging(firebaseApp);
  try {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if ("Notification" in window) {
        if (Notification.permission == "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
          });
          if (token) {
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
              return null;
            }
          } else {
            await subscribe();
            return null;
          }
        }
      }
    }
  } catch (error) {
    await navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(async function (reg) {
        if (reg.installing) {
        } else if (reg.waiting) {
        } else if (reg.active) {
          await subscribe(true);
        }
      });
    await subscribe(true);
  }
};
