import React from "react";
import Navbar from "./Navbar";
import Onboarding from "./Onboarding";

function Layout({ children }) {
  return (
    <div className="pt-16 lg:pt-28">
      <Onboarding />
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
