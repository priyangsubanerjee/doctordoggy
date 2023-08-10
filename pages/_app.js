/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import GlobalStates from "@/context/GlobalState";
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
          <NextProgress height={"3px"} options={{ showSpinner: false }} />
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
      </SessionProvider>
    </GlobalStates.Provider>
  );
}
