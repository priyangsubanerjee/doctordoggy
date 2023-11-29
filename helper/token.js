import firebaseApp from "@/firebase/app";
import axios from "axios";
import { getMessaging, getToken } from "firebase/messaging";
import { getSession, useSession } from "next-auth/react";

export const retrieveToken = async () => {
  let token = null;
  let session = await getSession();
  let messaging = getMessaging(firebaseApp);
  let permission = await Notification.requestPermission();

  try {
    if (session.user.email) {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
          });
          if (currentToken) {
            console.log(
              "FCM generated: " + currentToken + " for " + session.user.email
            );
            token = currentToken;
            try {
              await axios.post(
                "/api/fcm/update",
                {
                  email: session.user.email,
                  token: currentToken,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              return token;
            } catch (error) {
              console.log(error);
              return null;
            }
          } else {
            await retrieveToken();
          }
        } else {
          console.log("Unable to get permission to notify.");
          return null;
        }
      } else {
        console.log("Service worker not available");
        return null;
      }
    }
  } catch (error) {
    console.log("An error occurred while retrieving token:", error);
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(async function (reg) {
        if (reg.installing) {
          console.log("Service worker installing");
        } else if (reg.waiting) {
          console.log("Service worker installed");
        } else if (reg.active) {
          await retrieveToken();
          console.log("Service worker active");
        }
      });
    await retrieveToken();
    return null;
  }
};
