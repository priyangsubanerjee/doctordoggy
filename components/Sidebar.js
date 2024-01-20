import GlobalStates from "@/context/GlobalState";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

function Sidebar() {
  const router = useRouter();
  const { sidebarOpened, setSidebarOpened } = useContext(GlobalStates);
  const menu = [
    {
      name: "Home",
      icon: "ri:home-line",
      link: "/",
    },
    {
      name: "Services",
      icon: "solar:bath-bold-duotone",
      link: "/join-waitlist?ref=services",
    },
    {
      name: "Pets",
      icon: "material-symbols:pets",
      link: "/pets",
    },
    {
      name: "Vaccinations",
      icon: "game-icons:love-injection",
      link: "/vaccination",
    },
    {
      name: "Dewormings",
      icon: "material-symbols:admin-meds",
      link: "/deworming",
    },
    {
      name: "Prescriptions",
      icon: "healthicons:rx-outline",
      link: "/prescription",
    },
    {
      name: "Pathology",
      icon: "lucide:microscope",
      link: "/pathology",
    },
    {
      name: "Appointments",
      icon: "carbon:calendar",
      link: "/join-waitlist?ref=appointments",
    },
  ];

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setSidebarOpened(false);
    });
  }, [router]);
  return (
    <>
      {sidebarOpened && (
        <div className="h-full w-full inset-0 fixed flex justify-end z-30 bg-black/50">
          <div className="h-full bg-white w-[80%]">
            <div className="p-4 flex items-center justify-end">
              <button onClick={() => setSidebarOpened(false)}>
                <Icon height={30} icon="iconamoon:close-thin" />
              </button>
            </div>
            <ul className="text-neutral-700">
              {menu.map((item, i) => (
                <Link href={item.link} key={i}>
                  <li
                    key={i}
                    className="flex items-center space-x-2 py-5 px-6 hover:bg-gray-100 cursor-pointer"
                  >
                    <Icon height={24} icon={item.icon} />
                    <span>{item.name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
