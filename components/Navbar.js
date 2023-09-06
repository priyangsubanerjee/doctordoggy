/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { sign } from "jsonwebtoken";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { Popover } from "@headlessui/react";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <div className="bg-gradient-to-r from-pink-100 to-yellow-100 px-6 py-4 lg:px-20 lg:py-4 flex justify-center lg:justify-between items-center text-xs lg:text-sm font-popins">
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
          <span>+91 9996512944</span>
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

      <nav className="sticky z-20 top-0 inset-x-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-16 lg:px-28 bg-white shadow-2xl shadow-black/10">
        <Link href={"/"} className="block">
          <img src="/logo.png" className="h-14 lg:h-[70px]" alt="" />
        </Link>
        <ul className="hidden font-poppins md:flex items-center md:space-x-10 text-slate-500 md:text-sm lg:text-sm">
          <Link href={"/?redirect=false"} className="block">
            <li>Home</li>
          </Link>
          <Link href={"/"} className="block">
            <li className="">
              <Popover className="relative">
                <Popover.Button className="flex items-center space-x-2 outline-none">
                  <span>Services</span>
                  <Icon icon="icon-park-outline:down" />
                </Popover.Button>

                <Popover.Panel className="absolute z-10 bg-white rounded shadow-2xl border shadow-black/10 w-[650px] p-4 mt-3 left-1/2 -translate-x-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <Link className="block" href={"/bookings/schedule"}>
                      <div className="flex p-3 hover:bg-slate-50">
                        <img
                          src="https://kibblesandcuts.com/wp-content/uploads/2022/02/Dog-Grooming-Services.jpg"
                          className="h-full w-16 object-cover rounded"
                          alt=""
                        />
                        <div className="ml-4">
                          <h2 className="text-sm text-black">Grooming & Spa</h2>
                          <p className="text-xs mt-1 leading-5">
                            Provide your pet with the best grooming and spa
                            services.
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link className="block" href={"/bookings/schedule"}>
                      <div className="flex p-3 hover:bg-slate-50">
                        <img
                          src="https://www.pawspace.in/wp-content/uploads/2021/10/benefit-of-home-dog-boarding.jpg"
                          className="h-full w-16 object-cover rounded"
                          alt=""
                        />
                        <div className="ml-4">
                          <h2 className="text-sm text-black">Boarding</h2>
                          <p className="text-xs mt-1 leading-5">
                            The best boarding services for your pets while you
                            are away.
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link className="block" href={"/bookings/schedule"}>
                      <div className="flex p-3 hover:bg-slate-50">
                        <img
                          src="https://image.petmd.com/files/styles/863x625/public/2023-02/how-often-should-you-walk-your-dog.jpg"
                          className="h-full w-16 object-cover rounded"
                          alt=""
                        />
                        <div className="ml-4">
                          <h2 className="text-sm text-black">Dog walking</h2>
                          <p className="text-xs mt-1 leading-5">
                            Your pet&apos;s energy is channelled constructively.
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link className="block" href={"/bookings/schedule"}>
                      <div className="flex p-3 hover:bg-slate-50">
                        <img
                          src="https://image.petmd.com/files/styles/863x625/public/2023-02/how-often-should-you-walk-your-dog.jpg"
                          className="h-full w-16 object-cover rounded"
                          alt=""
                        />
                        <div className="ml-4">
                          <h2 className="text-sm text-black">Training</h2>
                          <p className="text-xs mt-1 leading-5">
                            Basic obedience to advanced training, we have it
                            all.
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Popover.Panel>
              </Popover>
            </li>
          </Link>
          <Link href={"/"} className="block">
            <li>Brands</li>
          </Link>
          <Link href={"/"} className="block">
            <li>Contact us</li>
          </Link>
          <Link href={"/"} className="block">
            <li>Offers</li>
          </Link>
        </ul>
        <div>
          {session.status == "unauthenticated" ? (
            <button
              onClick={async () => await signIn("google")}
              className="hidden md:flex items-center bg-[#1b1b1b] rounded px-7 h-12 space-x-3"
            >
              <Icon height={25} icon="flat-color-icons:google" />
              <span className="font-medium text-white text-sm font-poppins">
                Get started
              </span>
            </button>
          ) : (
            <Link href={"/profile"}>
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={session?.data?.user?.image}
                  alt=""
                />
                <div className="ml-4">
                  <h2 className="text-sm">{session?.data?.user?.name}</h2>
                  <h2 className="text-xs text-neutral-600 mt-1">
                    {session?.data?.user?.email}
                  </h2>
                </div>
              </div>
            </Link>
          )}
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Icon height={20} icon="clarity:menu-line" />
          </button>
        </div>
      </nav>

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
    </>
  );
}

export default Navbar;
