/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Avatar, Button, Chip, User } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

const InfoBar = ({}) => {
  return (
    <div className="bg-slate-950 text-sm py-3 text-center text-white font-light">
      This site is under development.
      <Button radius="full" size="sm" className="ml-3">
        Learn more
      </Button>
    </div>
  );
};

function Navbar() {
  const router = useRouter();
  const session = useSession();

  const AccountButton = () => {
    return (
      <div>
        {session.status == "unauthenticated" ? (
          <Link href={"/signin"}>
            <Icon height={24} icon="codicon:account" />
          </Link>
        ) : (
          <Dropdown className="rounded-lg">
            <DropdownTrigger className="outline-none">
              <Avatar
                size="sm"
                src={session?.data?.user?.image}
                className="cursor-pointer"
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Custom item styles">
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem
                  onClick={() => router.push("/account")}
                  isReadOnly
                  key="profile"
                  className="h-14 gap-2 opacity-100"
                >
                  <User
                    name={session?.data?.user?.name}
                    description={session?.data?.user?.email}
                    classNames={{
                      name: "text-slate-700",
                      description: "text-default-500",
                    }}
                    avatarProps={{
                      size: "sm",
                      src: session?.data?.user?.image,
                    }}
                  />
                </DropdownItem>
              </DropdownSection>
              <DropdownItem className="rounded" key="new">
                Pets
              </DropdownItem>
              <DropdownItem className="rounded" key="copy">
                Account
              </DropdownItem>
              <DropdownItem className="rounded" key="edit">
                Report an issue
              </DropdownItem>
              <DropdownItem
                onClick={() => signOut()}
                key="delete"
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/676/676291.png"
            className="h-7"
            alt=""
          />
        </div>
        <ul className="hidden lg:flex items-center space-x-14 text-sm">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Parenting</li>
          <li>Vaccination</li>
          <li>Appointments</li>
        </ul>
        <div className="flex items-center">
          <AccountButton />
          <button className="ml-5 lg:hidden">
            <Icon height={24} icon="clarity:menu-line" />
          </button>
        </div>
      </div>
      <InfoBar />
    </nav>
  );
}

export default Navbar;
