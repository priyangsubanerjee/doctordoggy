/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { sign } from "jsonwebtoken";
import { useRouter } from "next/router";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <div className="hidden px-6 py-4 lg:px-20 lg:py-4 shadow-xl shadow-black/[0.018] items-center justify-between lg:sticky lg:top-0 lg:inset-x-0 z-20 bg-white">
        <Link href="/">
          <div className="flex items-center space-x-3 relative w-fit">
            <img
              src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1692029332/doctor-doggy/IMG_1494_warsym.png"
              className="h-12 lg:h-16"
              alt=""
            />
            {/* <h1 className="font-medium">Doctor Doggy</h1>
          <span className="text-[10px] bg-pink-50 text-pink-500 px-2 py-1 rounded font-medium">
            BETA
          </span> */}
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
      </div>

      <div className="px-6 py-4 lg:px-20 lg:py-4 flex justify-center lg:justify-between items-center text-xs lg:text-sm font-popins">
        <div className="hidden lg:flex items-center space-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.2652 15.5 20.5196 15.6054 20.7071 15.7929C20.8946 15.9804 21 16.2348 21 16.5V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21C15.4913 21 11.1673 19.2089 7.97918 16.0208C4.79107 12.8327 3 8.50868 3 4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H7.5C7.76522 3 8.01957 3.10536 8.20711 3.29289C8.39464 3.48043 8.5 3.73478 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                fill="black"
              />
            </svg>
          </span>
          <span>+91 992234408</span>
        </div>
        <div className="flex items-center space-x-3">
          <img
            className="h-5 w-5"
            src="https://cdn-icons-png.flaticon.com/512/1175/1175818.png"
            alt=""
          />
          <span>Flat 70% OFF on grooming & pet care.</span>
        </div>
        <div className="hidden lg:flex space-x-4">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 16V8C3 6.67392 3.52678 5.40215 4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H16C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16Z"
                stroke="black"
                stroke-width="1.5"
              />
              <path
                d="M17.5 6.51002L17.51 6.49902"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M8 1C4.13 1 1 4.15 1 8.04c0 3.51 2.56 6.43 5.91 6.96v-4.92H5.13V8.04h1.78V6.49c0-1.77 1.05-2.74 2.64-2.74c.77 0 1.57.14 1.57.14v1.73h-.88c-.87 0-1.14.54-1.14 1.1v1.32h1.94l-.31 2.04H9.1V15c3.35-.53 5.91-3.44 5.91-6.96c0-3.89-3.13-7.04-7-7.04Z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="px-6 py-4 lg:px-20 lg:py-4 flex items-center justify-between bg-[#F15958]">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-white">
            Logo.
          </h1>
        </div>
        <ul className="hidden lg:flex items-center space-x-12 font-popins text-white/70 text-sm font-normal">
          <Link href={"/?redirect=false"}>
            <li
              style={{
                color:
                  router.pathname == "/" ? "#fff" : "rgba(255,255,255,0.7)",
              }}
            >
              Home
            </li>
          </Link>
          <Link href={"/dashboard"}>
            <li
              style={{
                color: router.pathname.includes("/dashboard")
                  ? "#fff"
                  : "rgba(255,255,255,0.7)",
              }}
            >
              Dashboard
            </li>
          </Link>
          <li
            style={{
              color: router.pathname.includes("/about")
                ? "#fff"
                : "rgba(255,255,255,0.7)",
            }}
          >
            About
          </li>
          <li className="relative group hover:text-white cursor-pointer">
            <span>Services</span>

            <div className="absolute opacity-0 -z-40 top-0 left-1/2 translate-y-[50%] -translate-x-1/2 group-hover:z-10 group-hover:translate-y-[0] group-hover:opacity-100 transition-all duration-500">
              <div className="mt-7 w-80 h-44 bg-white shadow-2xl shadow-black/[0.15] relative">
                <span className="text-white absolute top-1 -translate-y-full left-1/2 -translate-x-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                  >
                    <path fill="currentColor" d="m7.5 3l7.5 8H0l7.5-8Z" />
                  </svg>
                </span>
                <div className="p-4">
                  <div className="flex justify-between bg-red-50 p-4 rounded">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1650/1650515.png"
                      className="h-12"
                      alt=""
                    />
                    <div className="ml-4">
                      <h1 className="text-sm font-semibold text-neutral-700">
                        Grooming
                      </h1>
                      <p className="text-[10px] lg:text-[11px] text-neutral-500 mt-1 leading-5">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                      <button className="w-full bg-[#F15958] text-center text-sm text-white rounded mt-2 py-2">
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>Reviews</li>
          <li>Contact</li>
        </ul>
        <div className="flex items-center space-x-5">
          <div>
            {session.status == "unauthenticated" ? (
              <button
                onClick={() => signIn("google")}
                className="bg-white px-4 lg:px-7 py-2 rounded-full lg:rounded text-sm lg:shadow-md"
              >
                Get started
              </button>
            ) : (
              <div>
                <Link className="hidden lg:block" href={"/profile"}>
                  <button className="flex items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 37 37"
                        fill="none"
                      >
                        <path
                          d="M18.5001 6.16669C20.1356 6.16669 21.7041 6.81639 22.8606 7.97286C24.017 9.12934 24.6667 10.6979 24.6667 12.3334C24.6667 13.9689 24.017 15.5374 22.8606 16.6938C21.7041 17.8503 20.1356 18.5 18.5001 18.5C16.8646 18.5 15.2961 17.8503 14.1396 16.6938C12.9831 15.5374 12.3334 13.9689 12.3334 12.3334C12.3334 10.6979 12.9831 9.12934 14.1396 7.97286C15.2961 6.81639 16.8646 6.16669 18.5001 6.16669ZM18.5001 30.8334C18.5001 30.8334 30.8334 30.8334 30.8334 27.75C30.8334 24.05 24.8209 20.0417 18.5001 20.0417C12.1792 20.0417 6.16675 24.05 6.16675 27.75C6.16675 30.8334 18.5001 30.8334 18.5001 30.8334Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <div className="ml-3 text-left">
                      <h2 className="text-white text-sm">My account</h2>
                    </div>
                  </button>
                </Link>
                <button
                  className="lg:hidden text-white"
                  onClick={() => setSidebarOpen(true)}
                >
                  <iconify-icon
                    height="24"
                    icon="basil:menu-solid"
                  ></iconify-icon>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
    </>
  );
}

export default Navbar;
