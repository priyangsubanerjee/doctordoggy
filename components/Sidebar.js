import React from "react";

function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 h-full w-full bg-black/50 z-10 flex lg:hidden justify-end">
          <div className="bg-white h-full w-[80%] py-6">
            <div className="flex items-center justify-end px-6">
              <button onClick={() => setOpen(false)}>
                <iconify-icon
                  height="32"
                  icon="iconamoon:close-light"
                ></iconify-icon>
              </button>
            </div>
            <ul className="items-center space-y-9 text-sm text-neutral-700 px-6">
              <li className="flex items-center space-x-2">
                <iconify-icon
                  height="24"
                  width="24"
                  icon="ph:paw-print"
                ></iconify-icon>
                <span>About us</span>
              </li>
              <li className="flex items-center space-x-2">
                <iconify-icon
                  height="20"
                  width="20"
                  icon="akar-icons:scissor"
                ></iconify-icon>
                <span>Services</span>
              </li>
              <li className="flex items-center space-x-2">
                <iconify-icon
                  height="20"
                  width="20"
                  icon="iconoir:message-text"
                ></iconify-icon>
                <span>Feedback</span>
              </li>
              <li className="flex items-center space-x-2">
                <iconify-icon
                  height="23"
                  width="23"
                  icon="fluent:call-20-regular"
                ></iconify-icon>
                <span>Contact us</span>
              </li>
            </ul>
            <div className="px-6 mt-10">
              <button className="w-full text-sm bg-neutral-100 px-3 py-3 lg:py-3 lg:px-6 text-black rounded flex items-center justify-center space-x-3">
                <iconify-icon height="20" icon="devicon:google"></iconify-icon>
                <span>Get Started</span>
              </button>
            </div>
            <div className="flex items-center justify-center mt-16 space-x-4 text-xl text-neutral-700">
              <iconify-icon icon="mdi:instagram"></iconify-icon>
              <iconify-icon icon="ic:baseline-facebook"></iconify-icon>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
