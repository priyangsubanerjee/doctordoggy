/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Avatar, Button, Chip, User } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/router";
import GlobalStates from "@/context/GlobalState";
import { set } from "lodash";

function Navbar() {
  var s = useRef(null);
  const { sidebarOpened, setSidebarOpened } = useContext(GlobalStates);
  const session = useSession();
  const router = useRouter();
  const [allowed, setAllowed] = React.useState(false);
  const [hideInfoBar, setHideInfoBar] = React.useState(false);

  const [state, setState] = React.useState(0);

  const infoBarContents = [
    <>
      <div className="flex items-center justify-center w-full shrink-0">
        <span className="mr-2 text-base">🎊</span> Partners program is live!
        <Link className="ml-2" href="https://partners.doctordoggy.vet">
          <button className="text-black bg-white py-1 px-3 rounded-full text-xs">
            Join
          </button>
        </Link>
      </div>
    </>,
    <>
      <div className="flex items-center justify-center w-full shrink-0">
        Get your pets vaccinated now!
        <Link href="/vaccination/schedule">
          <Button radius="full" size="sm" className="ml-3 bg-white">
            Schedule
          </Button>
        </Link>
      </div>
    </>,
    <>
      <div className="flex items-center justify-center w-full shrink-0">
        Want us to remind next deworming?
        <Link href="/deworming/schedule">Schedule</Link>
      </div>
    </>,
  ];

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       let container = document.getElementById("container");
  //       let width = container.clientWidth;
  //       if (s.current == null) {
  //         container.scrollLeft = container.scrollLeft + width;
  //         s.current = 1;
  //       } else if (s.current < infoBarContents.length - 1) {
  //         container.scrollLeft = container.scrollLeft + width;
  //         s.current = s.current + 1;
  //       } else {
  //         container.scrollLeft = 0;
  //         s.current = 0;
  //       }
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, []);

  useEffect(() => {
    if (session.status === "authenticated") {
      setTimeout(() => {
        setHideInfoBar(true);
      }, 10000);
    }
  }, [session.status]);

  const InfoBar = ({}) => {
    return (
      <div className="relative overflow-hidden">
        <div className="w-0 md:w-[15%] lg:w-[40%] z-30 absolute bg-gradient-to-r from-slate-950 to-transparent left-0 inset-y-0"></div>
        <div
          id="container"
          onClick={() => {}}
          className="relative text-sm py-3 flex overflow-hidden text-center text-white font-light scroll-smooth bg-neutral-900 bg-no-repeat bg-cover"
        >
          {infoBarContents.map((content, index) => {
            return <>{content}</>;
          })}
        </div>
        <div className="w-[15%] lg:w-[40%] z-30 absolute bg-gradient-to-r to-slate-950 from-transparent right-0 inset-y-0"></div>
      </div>
    );
  };

  const AccountButton = () => {
    // shows different buttons depending on the session status
    return (
      <div>
        {session.status == "unauthenticated" ? (
          <Link href={"/signin"}>
            <Avatar size="sm" className="cursor-pointer mt-2" />
          </Link>
        ) : (
          <Dropdown className="rounded-lg z-30">
            <DropdownTrigger className="outline-none">
              <Avatar
                size="sm"
                src={session?.data?.user?.image}
                className="cursor-pointer"
              />
            </DropdownTrigger>

            <DropdownMenu
              onAction={async (key) => {
                switch (key) {
                  case "logout":
                    await signOut();
                    location.reload();
                    break;
                  case "account":
                    window.location.href = "/account";
                    break;
                  case "pets":
                    window.location.href = "/pets";
                    break;
                  case "notifications":
                    window.location.href = "/notifications";
                    break;
                  default:
                    break;
                }
              }}
              aria-label="Custom item styles"
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem key="account" className="h-14 gap-2 opacity-100">
                  <User
                    name={session?.data?.user?.name}
                    description={session?.data?.user?.email}
                    classNames={{
                      name: "text-neutral-700",
                      description: "text-default-500",
                    }}
                    avatarProps={{
                      size: "sm",
                      src: session?.data?.user?.image,
                    }}
                  />
                </DropdownItem>
              </DropdownSection>

              <DropdownItem className="rounded" key="pets">
                Pets
              </DropdownItem>

              <DropdownItem className="rounded" key="account">
                Account
              </DropdownItem>
              <DropdownItem className="rounded" key="notifications">
                Notifications
              </DropdownItem>
              <DropdownItem className="rounded" key="edit">
                Report an issue
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger rounded"
                color="danger"
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-20">
      <div className="h-12 px-6 lg:px-44 lg:h-14 flex items-center justify-between bg-white backdrop-blur-2xl">
        <div>
          <Link aria-label="home" href={"/"}>
            <img src="/logoDark.png" className="lg:h-9 h-7" alt="" />
          </Link>
        </div>
        <ul className="hidden md:flex items-center space-x-12 text-sm">
          <li className="cursor-pointer" onClick={() => router.push("/")}>
            Home
          </li>
          {/* <li
            className="cursor-pointer"
            onClick={() => router.push("/join-waitlist?ref=about-navbar")}
          >
            About
          </li> */}
          <li
            className="cursor-pointer"
            onClick={() => router.push("/join-waitlist?ref=services-navbar")}
          >
            Services
          </li>
          <li onClick={() => router.push("/pets")} className="cursor-pointer">
            Pets
          </li>
          <li
            onClick={() => router.push("/vaccination")}
            className="cursor-pointer"
          >
            Vaccination
          </li>
          <li
            onClick={() => router.push("/deworming")}
            className="cursor-pointer"
          >
            Deworming
          </li>
          <li>
            <Dropdown>
              <DropdownTrigger>
                <button className="flex items-center space-x-1 outline-none">
                  <span>More</span>
                  <Icon height={6} icon="formkit:down" />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  switch (key) {
                    case "dtm":
                      router.push("/due/tomorrow");
                      break;
                    case "ps":
                      router.push("/prescription");
                      break;
                    case "dt":
                      router.push("/due/today");
                      break;
                    case "pa":
                      router.push("/pathology");
                      break;
                    default:
                      break;
                  }
                }}
                aria-label="Static Actions"
              >
                <DropdownItem key="ps">Prescriptions</DropdownItem>
                <DropdownItem key="pa">Pathology</DropdownItem>
                <DropdownItem key="dt">Due today</DropdownItem>
                <DropdownItem key="dtm">Due tomorrow</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
        <div className="flex items-center">
          <AccountButton />
          <button
            onClick={() => setSidebarOpened(true)}
            className="ml-5 md:hidden"
          >
            <Icon height={24} icon="clarity:menu-line" />
          </button>
        </div>
      </div>
      <InfoBar />
    </nav>
  );
}

export default Navbar;
