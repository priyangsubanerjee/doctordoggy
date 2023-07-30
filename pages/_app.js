import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextProgress from "next-progress";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <>
        <NextProgress height={"3px"} options={{ showSpinner: false }} />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </>
    </SessionProvider>
  );
}
