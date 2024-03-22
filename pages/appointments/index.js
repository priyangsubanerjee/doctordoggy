/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

function Appointments() {
  const router = useRouter();
  const servicesList = [
    {
      title: "Grooming & Spa",
      description:
        "Provide your pets with the gift of a professional grooming and spa session, expertly administered by our trained team of grooming professionals. We utilize top-of-the-line equipment and cosmetics to ensure the delivery of high-quality services at budget-friendly rates.",
      image: "https://cdn-icons-png.flaticon.com/512/8817/8817469.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Grooming&Spa`,
    },
    {
      title: "Boarding",
      description:
        "Provide your pets with the gift of a professional grooming and spa session, expertly administered by our trained team of grooming professionals. We utilize top-of-the-line equipment and cosmetics to ensure the delivery of high-quality services at budget-friendly rates.",
      image: "https://cdn-icons-png.flaticon.com/512/10811/10811682.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Boarding`,
    },
    {
      title: "Dog Walking",
      description:
        "If you're short on time for regular pet walks, arrange a designated time slot and have it taken care of hassle-free. Our approach relies on positive reinforcement, assuring that your pet&apo;ss energy is channelled constructively, preventing disruptions to your living space and keeping boredom at bay.",
      image: "https://cdn-icons-png.flaticon.com/512/7699/7699724.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Dog-Walking`,
    },

    {
      title: "Training",
      description:
        "If you're short on time for regular pet walks, arrange a designated time slot and have it taken care of hassle-free. Our approach relies on positive reinforcement, assuring that your pet&apo;ss energy is channelled constructively, preventing disruptions to your living space and keeping boredom at bay.",
      image: "https://cdn-icons-png.flaticon.com/512/6381/6381356.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Training`,
    },
  ];
  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Appointments
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Dropdown className="rounded-xl z-30">
          <DropdownTrigger className="outline-none">
            <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
              <span>Schedule new</span>
              <span className="translate-y-[1px]">
                <Icon icon="formkit:right" />
              </span>
            </button>
          </DropdownTrigger>

          <DropdownMenu
            onAction={async (key) => {
              switch (key) {
                case "online-vet":
                  router.push("/appointments/schedule/online");
                  break;
                default:
                  toast("Feature coming soon!");
                  break;
              }
            }}
            aria-label="Custom item styles"
          >
            <DropdownItem className="rounded-lg" key="online-vet">
              Online vet consultation
            </DropdownItem>

            <DropdownItem className="rounded-lg" key="account">
              In-person vet consultation
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="notifications">
              Grooming & Spa
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="edit">
              Boarding
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="logout">
              Dog Walking
            </DropdownItem>
            <DropdownItem className="rounded-lg" key="logout">
              Training
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button
          onClick={() => toast("Feature coming soon!")}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Find help</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Appointments;
