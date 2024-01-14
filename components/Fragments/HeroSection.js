/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import quickNavOptions from "@/static/quick-navigaion";
import { Icon } from "@iconify/react";
import { Avatar, Button } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import PermissionLayout from "../PermissionLayout";
import toast from "react-hot-toast";
import { searchMenu } from "@/static/searchMenu";
import { has } from "lodash";

// TODO: Make the search bar functional
// TODO: Migrate all the static data to static.js file
// TODO: Migrate all the images to Cloudinary

function HeroSection() {
  const router = useRouter();
  const session = useSession();
  const [pets, setPets] = React.useState([]);
  const [isPermissionLayoutVisible, setIsPermissionLayoutVisible] =
    React.useState(false);

  const [hasFocus, setHasFocus] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  useEffect(() => {
    if (session?.data?.user?.email) {
      axios
        .post(
          `/api/pet/get`,
          {
            email: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setPets(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session.status]);

  useEffect(() => {
    refreshStatus();
  }, [session.status]);

  useEffect(() => {
    if (query.length > 0 && query != " ") {
      let results = [];
      searchMenu.forEach((item) => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          results.push(item);
        }
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const refreshStatus = async () => {
    if (
      session.status == "authenticated" &&
      session.data.user.onBoardingSuccess == true
    ) {
      if ("Notification" in window && Notification.permission !== "granted") {
        if (checkUserAgent() == "safari" && checkIfAppIsInstalled() == false) {
          console.log("Safari browser needs PWA to be installed");
        } else {
          setIsPermissionLayoutVisible(true);
        }
      }
    } else {
    }
  };

  const FeatureCard = ({ title, icon, buttonText, index, href }) => {
    return (
      <div
        onClick={() => router.push(href)}
        className={`flex w-full flex-col items-center justify-center p-3 cursor-pointer`}
      >
        <img src={icon} alt="" className="h-12" />
        <p className="text-base lg:text-xl font-semibold mt-5">{title}</p>
        <button className="flex items-center text-blue-600 space-x-2 text-sm mt-2 hover:underline">
          <span>{buttonText}</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
    );
  };

  const ShortcutToPets = ({}) => {
    if (pets.length > 0)
      return (
        <div className="w-fit mx-auto rounded-full border relative px-3 mt-8">
          <span className="absolute whitespace-nowrap top-0 text-[10px] tracking-widest text-neutral-500 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-white">
            LOVE
          </span>
          <div className="py-3 flex items-center justify-center space-x-2">
            {pets.length > 0 &&
              pets.slice(0, 2).map((pet, i) => (
                <Link href={`/pets/${pet.id}`} key={i}>
                  <Avatar key={i} src={pet.image} size="lg" />
                </Link>
              ))}

            <Avatar
              onClick={() => (window.location.href = "/pets")}
              className="bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
              icon={
                <Icon
                  icon="icon-park-outline:right"
                  height={25}
                  className="text-neutral-700"
                />
              }
              size="lg"
            />
          </div>
        </div>
      );
  };

  function checkUserAgent() {
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) != -1
    ) {
      return "opera";
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
      return "edge";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return "chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      return "safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return "firefox";
    } else if (
      navigator.userAgent.indexOf("MSIE") != -1 ||
      !!document.documentMode == true
    ) {
      return "ie";
    } else {
      return "unknown";
    }
  }

  function checkIfAppIsInstalled() {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      {isPermissionLayoutVisible == false ? (
        <div className="h-[250px] md:h-[500px] lg:h-[500px] relative">
          <img
            src="/static/hero.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 z-10 lg:pb-32 flex items-center lg:items-end justify-center bg-gradient-to-b from-transparent to-black/50">
            <div className="relative w-[93%] lg:w-[60%]">
              <div className="h-12 lg:h-16 bg-white border rounded-md flex items-center overflow-hidden">
                <input
                  type="text"
                  value={query}
                  onFocus={() => setHasFocus(true)}
                  onBlur={() => setHasFocus(false)}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-full px-6 lg:px-12 lg:text-lg w-full outline-none"
                  placeholder="Search for a service or a product"
                  name=""
                  id=""
                />
                <button
                  name="search-submit"
                  className="shrink-0 px-5 lg:px-10 bg-slate-100 h-full"
                >
                  <Icon
                    onClick={() => setQuery("")}
                    icon={
                      query.length > 0 ? "ep:close" : "fluent:search-24-regular"
                    }
                    className="text-2xl text-gray-900"
                  />
                </button>
              </div>

              {searchResults.length > 0 && (
                <div className="absolute inset-x-0 w-full py-4 px-4 top-16 lg:top-20 bg-white border shadow-xl shadow-black/5 z-10 rounded-lg">
                  {searchResults.map((item, i) => (
                    <Link key={i} href={item.url}>
                      <div
                        className="flex text-neutral-600 text-sm items-center rounded-md px-4 py-3 hover:bg-gray-100 cursor-pointer"
                        key={i}
                      >
                        <Icon height={18} icon={item.icon} />
                        <span className="ml-5">{item.name}</span>

                        <Icon
                          className="ml-auto"
                          icon="icon-park-outline:right"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <PermissionLayout close={() => setIsPermissionLayoutVisible(false)} />
      )}

      <ShortcutToPets />
      <div className="py-10 lg:py-20 lg:-mt-8">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center">
          One Stop Solution
        </h1>
        <p className="text-center mt-4 lg:mt-6 text-base lg:text-xl font-light">
          For all your parenting needs
        </p>
        <div className="mt-16 lg:mt-20 grid gap-y-9 lg:gap-y-16 grid-cols-2 md:grid-cols-3 lg:max-w-3xl place-content-center place-items-center mx-0 lg:mx-auto">
          {quickNavOptions.map((feature, i) => (
            <FeatureCard {...feature} key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
