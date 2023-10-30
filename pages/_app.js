import Layout from "@/components/Layout";
import ProcessingModal from "@/components/ProcessingModal";
import GlobalStates from "@/context/GlobalState";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

// using next auth for authentication and next ui for styling
// TODO: add next seo for seo

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [procesingModalOpen, setProcessingModalOpen] = useState(false);
  const [processingModalMessage, setProcessingModalMessage] =
    useState("Loading...");

  const updatedModal = (state, message) => {
    setProcessingModalOpen(state ? state : false);
    setProcessingModalMessage(message ? message : "Loading...");
  };

  return (
    <GlobalStates.Provider
      value={{
        procesingModalOpen,
        processingModalMessage,
        updatedModal,
      }}
    >
      <SessionProvider session={session}>
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
            <ProcessingModal />
          </Layout>
        </NextUIProvider>
      </SessionProvider>
    </GlobalStates.Provider>
  );
}
