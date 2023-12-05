/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Avatar, Button, Chip, User } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import Router, { useRouter } from "next/router";
import GlobalStates from "@/context/GlobalState";

function Navbar() {
  const { sidebarOpened, setSidebarOpened } = useContext(GlobalStates);
  const session = useSession();
  const router = useRouter();
  const [allowed, setAllowed] = React.useState(false);

  const [state, setState] = React.useState(0);

  const infoBarContents = [
    <>
      <div className="flex items-center justify-center w-full shrink-0">
        This site is under development.
        <Button
          onClick={() => Router.push("/dev")}
          radius="full"
          size="sm"
          className="ml-3"
        >
          Learn more
        </Button>
      </div>
    </>,
    <>
      <div className="flex items-center justify-center w-full shrink-0">
        This site is under development.
        <Button
          onClick={() => Router.push("/dev")}
          radius="full"
          size="sm"
          className="ml-3"
        >
          Learn more
        </Button>
      </div>
    </>,
    <>
      <div className="flex items-center justify-center w-full shrink-0">
        This site is under development.
        <Button
          onClick={() => Router.push("/dev")}
          radius="full"
          size="sm"
          className="ml-3"
        >
          Learn more
        </Button>
      </div>
    </>,
  ];

  // increment the state every 5 seconds to show different info bar content
  useEffect(() => {
    if (allowed) {
      const interval = setInterval(() => {
        setState((state) => (state + 1) % 3);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [allowed]);

  useEffect(() => {
    if (allowed) {
      if (state < infoBarContents.length) {
        let container = document.getElementById("container");
        let width = container.clientWidth;
        container.scrollLeft = container.scrollLeft + width;
      } else {
        let container = document.getElementById("container");
        let width = container.clientWidth;
        container.scrollLeft = 0;
      }
    }
  }, [state, allowed, infoBarContents.length]);

  useEffect(() => {
    setTimeout(() => {
      setAllowed(true);
    }, 5000);
  }, []);

  const InfoBar = ({}) => {
    return (
      <div className="relative overflow-hidden bg-red-200">
        <div className="w-[15%] lg:w-[40%] z-30 absolute bg-gradient-to-r from-slate-950 to-transparent left-0 inset-y-0"></div>
        <div
          id="container"
          onClick={() => {}}
          className="bg-slate-950 relative text-sm py-3 flex overflow-hidden text-center text-white font-light scroll-smooth"
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
              onAction={(key) => {
                switch (key) {
                  case "logout":
                    signOut();
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
      <div className="h-12 px-6 lg:px-44 lg:h-14 flex items-center justify-between bg-white/90 backdrop-blur-2xl">
        <div>
          <Link href={"/"}>
            <img src="/logoDark.png" className="lg:h-9 h-7" alt="" />
          </Link>
        </div>
        <ul className="hidden lg:flex items-center space-x-12 text-sm">
          <li className="cursor-pointer" onClick={() => router.push("/")}>
            Home
          </li>
          <li
            className="cursor-pointer"
            onClick={() => Router.push("/dev/progress")}
          >
            About
          </li>
          <li
            className="cursor-pointer"
            onClick={() => Router.push("/dev/progress")}
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
                    case "vc":
                      router.push("/vaccination");
                      break;
                    case "ps":
                      router.push("/prescription");
                      break;
                    case "de":
                      router.push("/deworming");
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
                <DropdownItem key="vc">Vaccinations</DropdownItem>
                <DropdownItem key="ps">Prescriptions</DropdownItem>
                <DropdownItem key="de">Dewormings</DropdownItem>
                <DropdownItem key="pa">Pathology</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
        <div className="flex items-center">
          <AccountButton />
          <button
            onClick={() => setSidebarOpened(true)}
            className="ml-5 lg:hidden"
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
