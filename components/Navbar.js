/* eslint-disable @next/next/no-img-element */
import React from "react";

function Navbar() {
  return (
    <div className="px-6 py-3 lg:px-20 lg:py-6 shadow-2xl shadow-black/5 flex items-center justify-between">
      <div className="flex items-center space-x-3 relative w-fit">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2930/2930618.png"
          className="h-9 lg:h-12"
          alt=""
        />
        <h1 className="font-medium">Doctor Doggy</h1>
        <span className="text-[10px] bg-pink-50 text-pink-500 px-2 py-1 rounded font-medium">
          BETA
        </span>
      </div>
      <ul className="hidden lg:flex items-center space-x-12 text-sm text-neutral-700">
        <li className="flex items-center space-x-2">
          <iconify-icon
            height="24"
            width="24"
            icon="dashicons:pets"
          ></iconify-icon>
          <span>About us</span>
        </li>
        <li className="flex items-center space-x-2">
          <iconify-icon
            height="20"
            width="20"
            icon="akar-icons:scissor"
          ></iconify-icon>
          <span>Services</span>
        </li>
        <li className="flex items-center space-x-2">
          <iconify-icon
            height="20"
            width="20"
            icon="iconoir:message-text"
          ></iconify-icon>
          <span>Feedback</span>
        </li>
        <li className="flex items-center space-x-2">
          <iconify-icon
            height="23"
            width="23"
            icon="fluent:call-20-regular"
          ></iconify-icon>
          <span>Contact us</span>
        </li>
      </ul>
      <div className="hidden lg:block">
        <button className="text-sm bg-neutral-100 px-3 py-2 lg:py-3 lg:px-6 text-black rounded flex items-center space-x-3">
          <iconify-icon height="20" icon="devicon:google"></iconify-icon>
          <span>Get Started</span>
        </button>
      </div>
      <div className="lg:hidden">
        <button>
          <iconify-icon height="24" icon="basil:menu-solid"></iconify-icon>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
