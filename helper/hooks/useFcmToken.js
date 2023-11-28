import { useEffect, useState } from "react";
import firebaseApp from "../../firebase/firebase";
import { getMessaging, getToken } from "firebase/messaging";

const useFcmToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      const messaging = getMessaging(firebaseApp);
      const permission = await Notification.requestPermission();

      // Check if permission is granted before retrieving the token
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BMz9a6zyrHPgp5jBxXv_QjIhcJaunKrX2zinqT1ThGEeckAsbD2J0BdQYpd-SHSf8beu9ngbsUfI3iTVoklKLOo",
          });
          if (currentToken) {
            setToken(currentToken);
            console.log(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.log("Permission not granted");
        }
      }
    };
    retrieveToken();
  }, []);

  return { fcmToken: token };
};

export default useFcmToken;
