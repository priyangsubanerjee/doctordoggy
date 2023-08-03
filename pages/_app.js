import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NextProgress from "next-progress";
import toast, { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <>
        <NextProgress height={"3px"} options={{ showSpinner: false }} />
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
        <Toaster position="bottom-right" />
      </>
    </SessionProvider>
  );
}
