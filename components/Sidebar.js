import GlobalStates from "@/context/GlobalState";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";

function Sidebar() {
  const { sidebarOpened, setSidebarOpened } = useContext(GlobalStates);
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
            <ul className="text-sm text-neutral-600">
              <li className="px-6 py-4">
                <a
                  rel="noopener noreferrer"
                  className="text-sm text-black"
                  href={"/"}
                >
                  Home
                </a>
              </li>
              <li className="px-6 py-4">
                <a
                  rel="noopener noreferrer"
                  className="text-sm text-black"
                  href={"/dev/progress"}
                >
                  About
                </a>
              </li>
              <li className="px-6 py-4">
                <a
                  rel="noopener noreferrer"
                  className="text-sm text-black"
                  href={"/dev/progress"}
                >
                  Services
                </a>
              </li>
              <li className="px-6 py-4">
                <a
                  rel="noopener noreferrer"
                  className="text-sm text-black"
                  href={"/pets"}
                >
                  Pets
                </a>
              </li>
              <li className="px-6 py-4">
                <a
                  rel="noopener noreferrer"
                  className="text-sm text-black"
                  href={"/vaccination"}
                >
                  Vaccinations
                </a>
              </li>
              <li className="px-6 py-4">
                <a
                  rel="noopener noreferrer"
                  className="text-sm text-black"
                  href={"/prescription"}
                >
                  Prescriptions
                </a>
              </li>
              <li className="px-6 py-4">
                <a
                  rel="noopener noreferrer"
                  className="text-sm text-black"
                  href={"/dev/progress"}
                >
                  Appointments
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
