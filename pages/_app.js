import Layout from "@/components/Layout";
import NextProgress from "next-progress";
import ProcessingModal from "@/components/ProcessingModal";
import GlobalStates from "@/context/GlobalState";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { retrieveToken } from "@/helper/token";

// using next auth for authentication and next ui for styling
// TODO: add next seo for seo

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [procesingModalOpen, setProcessingModalOpen] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [processingModalMessage, setProcessingModalMessage] =
    useState("Loading...");

  const updatedModal = (state, message) => {
    setProcessingModalOpen(state ? state : false);
    setProcessingModalMessage(message ? message : "Loading...");
  };

  useEffect(() => {
    let tokenUpdatedInSession = sessionStorage.getItem("tokenUpdated") || null;
    retrieveToken();
    if (tokenUpdatedInSession == null) {
      sessionStorage.setItem("tokenUpdated", true);
    }
  }, []);

  return (
    <GlobalStates.Provider
      value={{
        sidebarOpened,
        setSidebarOpened,
        procesingModalOpen,
        processingModalMessage,
        updatedModal,
      }}
    >
      <SessionProvider session={session}>
        <NextUIProvider>
          <NextProgress height={"4px"} />
          <Layout>
            <Sidebar />
            <Component {...pageProps} />
            <ProcessingModal />
          </Layout>
        </NextUIProvider>
      </SessionProvider>
    </GlobalStates.Provider>
  );
}
