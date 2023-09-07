/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function ThreeSteps() {
  const [isCallRequested, setIsCallRequested] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  return (
    <>
      <div className="bg-[#0d1121] py-16 lg:py-24 px-6 lg:px-28">
        <h2 className="relative text-center text-white font-bold text-3xl lg:text-5xl font-jost leading-[1.5] lg:leading-[1.4]">
          3 simple steps to <br /> Enjoy Your Day
        </h2>
        <div class="container px-5 mx-auto lg:flex mt-16">
          <div class="flex flex-wrap lg:w-1/2">
            <div class="w-full max-w-md md:pr-10 md:py-6">
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-[2px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-5">
                  <h2 class="font-semibold font-jost title-font text-sm text-indigo-400 mb-1 tracking-wider">
                    STEP 1
                  </h2>
                  <p class="leading-relaxed lg:text-lg text-white font-medium">
                    Choose a service you want to book.
                  </p>
                  <p className="text-slate-300 mt-1 text-xs leading-6">
                    Select a service from our diverse array of offerings,
                    ranging from grooming and spa to boarding and veterinary
                    care.
                  </p>
                </div>
              </div>
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-[2px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-5">
                  <h2 class="font-semibold font-jost title-font text-sm text-indigo-400 mb-1 tracking-wider">
                    STEP 2
                  </h2>
                  <p class="leading-relaxed lg:text-lg text-white font-medium">
                    Book your day
                  </p>
                  <p className="text-slate-300 mt-1 text-xs leading-6">
                    Choose a date and time that is convenient for you and your
                    pet. We will take care of the rest.
                  </p>
                </div>
              </div>
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-1 pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-5">
                  <h2 class="font-semibold font-jost title-font text-sm text-indigo-400 mb-1 tracking-wider">
                    STEP 3
                  </h2>
                  <p class="leading-relaxed lg:text-lg text-white font-medium">
                    Have Relax
                  </p>
                  <p className="text-slate-300 mt-1 text-xs leading-6">
                    Sit back and relax while we take care of your pet&apos;s
                    needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white lg:w-1/2">
            <img
              src="https://www.sfu.ca/siat/student_projects/iat339_2022_summer/kang/P2%20Templates/img/welcome.png"
              alt=""
              className="w-full lg:w-[550px] object-contain"
            />
          </div>
        </div>

        <div className="mt-10 lg:flex items-center justify-center space-y-4 lg:space-y-0 lg:space-x-6">
          <Link href="/bookings/schedule">
            <button className="w-full lg:w-fit h-12 px-5 lg:px-10 bg-white hover:bg-white/60 transition-all rounded-md flex justify-center items-center space-x-4">
              <Icon height={24} icon="solar:calendar-broken" />
              <span>Schedule a service</span>
            </button>
          </Link>
          <button
            onClick={() => setIsCallRequested(true)}
            className="w-full lg:w-fit h-12 px-5 lg:px-10 text-white border border-white rounded-md flex justify-center items-center space-x-4"
          >
            <Icon height={24} icon="material-symbols:call" />
            <span>Get a call from us</span>
          </button>
        </div>
      </div>

      {isCallRequested && (
        <div className="fixed inset-0 h-full w-full bg-black/50 z-30 flex items-center overflow-auto justify-center">
          <div className="w-[95%] lg:w-[500px] p-8 bg-white rounded">
            <h2 className="font-jost font-semibold text-2xl">Request a call</h2>
            <p className="text-xs mt-2 text-neutral-500">
              Our team will call you back within 24 hours.
            </p>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 px-4 rounded border w-full mt-6"
              name=""
              id=""
            />
            <input
              type="tel"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 px-4 rounded border w-full mt-3"
              name=""
              id=""
            />

            <div className="mt-10 flex items-center justify-end space-x-3">
              <button
                onClick={() => setIsCallRequested(false)}
                className="flex h-12 bg-neutral-100 items-center px-4 rounded-md text-neutral-700"
              >
                <span>Cancel</span>
              </button>
              <button
                onClick={async () => {
                  if (name == "") {
                    alert("Please enter a valid name");
                    return;
                  }
                  if (phone == "") {
                    alert("Please enter a valid phone");
                    return;
                  }
                  if (phone.length < 10) {
                    alert("Please enter a valid phone");
                    return;
                  }
                  await fetch("/api/notification/send", {
                    method: "POST",
                    body: JSON.stringify({
                      message: `Call request from ${name} (${phone})`,
                    }),
                  });
                  setIsCallRequested(false);
                }}
                className="flex h-12 bg-indigo-500 items-center px-4 rounded-md text-white"
              >
                <span>Submit request</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ThreeSteps;
