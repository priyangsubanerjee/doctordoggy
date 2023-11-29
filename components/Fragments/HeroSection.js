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

// TODO: Make the search bar functional
// TODO: Migrate all the static data to static.js file
// TODO: Migrate all the images to Cloudinary

function HeroSection() {
  const router = useRouter();
  const session = useSession();
  const [pets, setPets] = React.useState([]);
  const [isPermissionLayoutVisible, setIsPermissionLayoutVisible] =
    React.useState(false);

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
    (async () => {
      if (
        session.status == "authenticated" &&
        session.data.user.onBoardingSuccess == true
      ) {
        if ("Notification" in window && Notification.permission !== "granted") {
          setIsPermissionLayoutVisible(true);
        }
      } else {
      }
    })();
  }, [session.status]);

  const TriggerPermission = async () => {
    let permission = await Notification.requestPermission();
    if (permission == "granted") {
      setIsPermissionLayoutVisible(false);
    }
  };

  const FeatureCard = ({ title, icon, buttonText, index, href }) => {
    return (
      <div
        onClick={() => router.replace(href)}
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

  const PermissionLayout = () => {
    return (
      <div className="h-fit bg-white p-8">
        <div className="border rounded-xl p-5 md:p-8 md:max-w-3xl lg:max-w-4xl mx-auto">
          <div className="md:flex items-center">
            <img
              src="https://www.magicbell.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmagicbell%2Fimage%2Ffetch%2Ff_auto%2Cq_auto%2Fhttps%3A%2F%2Fmagicbell.ghost.io%2Fcontent%2Fimages%2F2022%2F01%2FHow-to-Design-Better-Push-Notifications-for-Mobile-Apps.jpg&w=1920&q=75"
              alt=""
              className="h-24 md:h-32 mx-auto lg:-ml-7"
            />
            <div className="md:ml-5 mt-4 md:mt-0">
              <h2 className="font-semibold text-base lg:text-xl">
                Subscribing to push messages
              </h2>
              <p className="text-xs lg:text-sm text-neutral-500 leading-6 mt-2">
                We need your permission to send you notifications regarding your
                pets scheduled appointment, vaccination and other important
                dates.
              </p>
              <Button
                onClick={() => TriggerPermission()}
                className="rounded-md mt-4 w-full md:w-fit"
              >
                Ask permission
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isPermissionLayoutVisible == false ? (
        <div className="h-[250px] md:h-[500px] lg:h-[500px] relative">
          <img
            src="/static/hero.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 z-10 lg:pb-20 flex items-center lg:items-end justify-center bg-gradient-to-b from-transparent to-black/50">
            <div className="h-12 lg:h-16 bg-white border w-[93%] lg:w-[60%] rounded-md flex items-center overflow-hidden">
              <input
                type="text"
                className="h-full px-6 lg:px-12 lg:text-lg w-full outline-none"
                placeholder="Search for a service or a product"
                name=""
                id=""
              />
              <button className="shrink-0 px-5 lg:px-10 bg-slate-100 h-full">
                <Icon
                  icon="iconoir:search"
                  className="text-2xl text-gray-900"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <PermissionLayout />
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
