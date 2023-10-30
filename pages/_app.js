/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalState";
import { Icon } from "@iconify/react";
import { set } from "mongoose";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import NextProgress from "next-progress";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [pets, setPets] = useState(null);
  const [account, setAccount] = useState(null);
  const [loadingOn, setLoadingOn] = useState(true);

  useEffect(() => {
    let shown = sessionStorage.getItem("loadingShown") || false;
    let loadingScreen = document.getElementById("loadingScreen");
    if (shown) {
      setLoadingOn(false);
      return;
    } else {
      loadingScreen.style.transform = "translateX(0%)";
      setTimeout(() => {
        loadingScreen.style.transform = "translateX(-100%)";
        sessionStorage.setItem("loadingShown", true);
        setLoadingOn(false);
      }, 3000);
    }
  }, []);

  const refreshPets = async () => {
    let email = session?.user?.email || null;
    if (email) {
      let res = await fetch("/api/pets/all", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
      let data = await res.json();
      if (data.success) {
        setPets(data.pets);
        return data.pets;
      } else {
        toast.error(data.message);
        setPets([]);
        return [];
      }
    }
  };

  const refreshAccount = async () => {
    let email = session?.user?.email || null;
    if (email) {
      let res = await fetch("/api/user/find", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
      let data = await res.json();
      if (data.success) {
        setAccount(data.user);
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    (async () => {
      await refreshPets();
      await refreshAccount();
    })();
  }, []);

  return (
    <GlobalStates.Provider
      value={{
        pets,
        refreshPets,
        account,
        refreshAccount,
      }}
    >
      <SessionProvider session={session}>
        <>
          <div
            id="loadingScreen"
            className="fixed transition-all duration-700 -translate-x-full inset-0 h-full w-full z-40 bg-[#0d1121] flex flex-col items-center justify-center"
          >
            <img
              src="https://res.cloudinary.com/ddn3h4a2b/image/upload/v1692859196/static/PHOTO-2023-08-22-10-17-36-removebg-preview_exf5h4.png"
              className="max-w-[300px]"
              alt=""
            />
            <span className="text-white mt-20">
              <Icon height={40} icon="line-md:loading-twotone-loop" />
            </span>
          </div>
          {loadingOn == false && (
            <>
              <NextProgress options={{ showSpinner: false }} />
              <Navbar />
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Footer />
              <Toaster
                position="bottom-right"
                containerStyle={{
                  bottom: 50,
                  right: 50,
                }}
                toastOptions={{
                  style: {
                    background: "#333",
                    color: "#fff",
                  },
                }}
              />
            </>
          )}
        </>
      </SessionProvider>
    </GlobalStates.Provider>
  );
}
