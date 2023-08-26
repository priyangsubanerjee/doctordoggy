/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Sidebar({ open, setOpen }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setOpen(false);
    });
  }, [router]);

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 h-full w-full bg-black/50 z-20 flex lg:hidden justify-end">
          <div className="bg-white h-full w-[80%] py-6">
            <div className="flex items-center justify-end px-6">
              <button onClick={() => setOpen(false)}>
                <iconify-icon
                  height="32"
                  icon="iconamoon:close-light"
                ></iconify-icon>
              </button>
            </div>
            <ul className="items-center space-y-9 text-sm text-neutral-700 px-6">
              {session.status === "authenticated" ? (
                <Link href="/dashboard" className="block">
                  <li className="flex items-center space-x-2">
                    <iconify-icon
                      height="22"
                      width="22"
                      icon="streamline:nature-ecology-dog-head-dog-pet-animals-canine"
                    ></iconify-icon>
                    <span>Dashboard</span>
                  </li>
                </Link>
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

              <Link href="/bookings/" className="block">
                <li className="flex items-center space-x-2">
                  <iconify-icon
                    height="20"
                    width="20"
                    icon="akar-icons:scissor"
                  ></iconify-icon>
                  <span>Bookings</span>
                </li>
              </Link>
              <Link href="/feedback" className="block">
                <li className="flex items-center space-x-2">
                  <iconify-icon
                    height="20"
                    width="20"
                    icon="iconoir:message-text"
                  ></iconify-icon>
                  <span>Feedback</span>
                </li>
              </Link>
              <Link href="/contact" className="block">
                <li className="flex items-center space-x-2">
                  <iconify-icon
                    height="23"
                    width="23"
                    icon="fluent:call-20-regular"
                  ></iconify-icon>
                  <span>Contact us</span>
                </li>
              </Link>
            </ul>
            <div className="px-6 mt-10">
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
                  onClick={() => signIn("google")}
                  className="w-full text-sm bg-neutral-100 px-3 py-3 lg:py-3 lg:px-6 text-black rounded flex items-center justify-center space-x-3"
                >
                  <iconify-icon
                    height="20"
                    icon="devicon:google"
                  ></iconify-icon>
                  <span>Get Started</span>
                </button>
              )}
            </div>

            <div className="flex items-center whitespace-nowrap px-6 space-x-3 mt-10">
              <div className="h-[1px] bg-black/20 w-full"></div>
              <span className="text-[10px] text-neutral-500 tracking-widest">
                FOLLOW US
              </span>
              <div className="h-[1px] bg-black/20 w-full"></div>
            </div>
            <div className="flex items-center justify-center mt-10 space-x-4 text-xl text-neutral-700">
              <iconify-icon icon="mdi:instagram"></iconify-icon>
              <iconify-icon icon="ic:baseline-facebook"></iconify-icon>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
