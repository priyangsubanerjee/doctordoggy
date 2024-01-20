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
        const token = await getToken(messaging, {
          vapidKey:
            "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
        });
        if (token) {
          console.log(token);
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

          await subscribe();
          return null;
        }
      } else {
        console.log("Permission not granted for push notifications");
      }
    }
  } catch (error) {
    alert("Error while subscribing to push notifications");
    console.log("Service worker registration failed, error:", error);
    navigator.serviceWorker
      .register("firebase-messaging-sw.js", { scope: "/" })
      .then(
        function (reg) {
          var serviceWorker;
          if (reg.installing) {
            serviceWorker = reg.installing;
            // console.log('Service worker installing');
          } else if (reg.waiting) {
            serviceWorker = reg.waiting;
            // console.log('Service worker installed & waiting');
          } else if (reg.active) {
            serviceWorker = reg.active;
          }

          if (serviceWorker) {
            console.log("sw current state", serviceWorker.state);
            if (serviceWorker.state == "activated") {
              //If push subscription wasnt done yet have to do here
              subscribe();
            }
            serviceWorker.addEventListener("statechange", async function (e) {
              console.log("sw statechange : ", e.target.state);
              if (e.target.state == "activated") {
                // use pushManger for subscribing here.
                if (Notification.permission == "granted") {
                  const token = await getToken(messaging, {
                    vapidKey:
                      "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
                  });
                  if (token) {
                    console.log(token);
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
                        toast.error(
                          "Error while subscribing to push notifications"
                        );
                      console.log(error);
                      return null;
                    }
                  } else {
                    showToast &&
                      toast.error(
                        "Error while subscribing to push notifications"
                      );

                    await subscribe();
                    return null;
                  }
                } else {
                  console.log("Permission not granted for push notifications");
                }
              }
            });
          }
        },
        function (err) {
          console.error("unsuccessful registration with ", workerFileName, err);
        }
      );
    // await navigator.serviceWorker
    //   .register("/firebase-messaging-sw.js")
    //   .then(async function (reg) {
    //     if (reg.installing) {
    //     } else if (reg.waiting) {
    //     } else if (reg.active) {
    //       toast.dismiss();
    //       await subscribe(true);
    //     }
    //   });
  }
};
