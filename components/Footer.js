/* eslint-disable @next/next/no-img-element */
import React from "react";

function Footer() {
  return (
    <div className="bg-neutral-100 px-6 lg:px-[100px] py-10 mt-20">
      <div className="lg:flex items-center lg:space-y-0 space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1692029332/doctor-doggy/IMG_1494_warsym.png"
            className="h-9 lg:h-12 mix-blend-multiply"
            alt=""
          />
        </div>
        <p className="text-xs lg:ml-8 ml-0">
          Copyright © 2023 PetSmart Inc. All rights reserved.
        </p>
        <div className="lg:ml-auto flex w-fit space-x-3 bg-white px-4 py-2 border text-xs rounded">
          <span>Status:</span>
          <div className="flex items-center space-x-2 text-blue-500">
            <iconify-icon icon="material-symbols:circle"></iconify-icon>
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
