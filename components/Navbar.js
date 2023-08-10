/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useSession();

  return (
    <div className="px-6 py-4 lg:px-20 lg:py-4 shadow-xl shadow-black/[0.018] flex items-center justify-between lg:sticky lg:top-0 lg:inset-x-0 z-20 bg-white">
      <Link href="/">
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
      </Link>
      <ul className="hidden lg:flex items-center space-x-12 text-sm text-neutral-700">
        {session.status === "authenticated" ? (
          <a rel="noopener noreferrer" href="/dashboard">
            <li className="flex items-center space-x-2">
              <iconify-icon
                height="22"
                width="22"
                icon="streamline:nature-ecology-dog-head-dog-pet-animals-canine"
              ></iconify-icon>
              <span>Dashboard</span>
            </li>
          </a>
        ) : (
          <li className="flex items-center space-x-2">
            <iconify-icon
              height="24"
              width="24"
              icon="ph:paw-print"
            ></iconify-icon>
            <span>About us</span>
          </li>
        )}
        <Link href="/?redirect=false">
          <li className="flex items-center space-x-2">
            <iconify-icon
              height="20"
              width="20"
              icon="akar-icons:scissor"
            ></iconify-icon>
            <span>Services</span>
          </li>
        </Link>
        <Link href="/feedback">
          <li className="flex items-center space-x-2">
            <iconify-icon
              height="20"
              width="20"
              icon="iconoir:message-text"
            ></iconify-icon>
            <span>Feedback</span>
          </li>
        </Link>
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
        {session.status === "authenticated" ? (
          <Link href="/profile">
            <div className="flex items-center space-x-3 px-3 py-2 hover:bg-neutral-100 rounded-md">
              <img
                className="h-10 w-10 rounded-full"
                src={session.data.user.image}
                alt=""
              />
              <div>
                <h1 className="font-medium text-sm">
                  {session.data.user.name}
                </h1>
                <span className="text-xs text-neutral-500">
                  {session.data.user.email}
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <button
            onClick={async () => await signIn("google")}
            className="text-sm bg-neutral-100 px-3 py-2 lg:py-3 lg:px-6 text-black rounded flex items-center space-x-3"
          >
            <iconify-icon height="20" icon="devicon:google"></iconify-icon>
            <span>Get Started</span>
          </button>
        )}
      </div>
      <div className="lg:hidden">
        <button onClick={() => setSidebarOpen(true)}>
          <iconify-icon height="24" icon="basil:menu-solid"></iconify-icon>
        </button>
      </div>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
    </div>
  );
}

export default Navbar;
