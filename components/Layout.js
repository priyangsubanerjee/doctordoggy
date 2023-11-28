import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Onboarding from "./Onboarding";
import toast, { Toaster } from "react-hot-toast";
function Layout({ children }) {
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      toast.success("App is running in standalone mode");
    } else {
      toast.error("App is not running in standalone mode");
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-28">
      <Onboarding />
      <Navbar />
      {children}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 60,
          right: 50,
        }}
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: 0,
            fontSize: "0.8rem",
          },
        }}
      />
    </div>
  );
}

export default Layout;
