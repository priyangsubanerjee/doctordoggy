import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="pt-16 lg:pt-20">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
