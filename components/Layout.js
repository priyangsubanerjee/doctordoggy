import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="pt-16 lg:pt-28">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
