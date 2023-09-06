/* eslint-disable @next/next/no-img-element */
import React from "react";

function ChooseUs() {
  return (
    <div className="bg-[#0d1121] px-6 lg:px-24 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center lg:grid-cols-4 place-items-center gap-5">
        <div className="bg-gradient-to-b from-[#14182c] to-[#191f3d] rounded-md hover:scale-105 w-full h-full p-6 transition-all relative overflow-hidden">
          <img
            src="/pattern.png"
            className="absolute top-0 right-0 translate-x-[30%] -translate-y-[40%] h-24 opacity-50 -rotate-[150deg]"
            alt=""
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/4444/4444501.png"
            className="h-12"
            alt=""
          />
          <h2 className="font-semibold font-jost text-xl mt-7 text-white">
            Personalized care
          </h2>
          <p className="text-[13px] text-xs text-white/70 leading-6 mt-1 font-light">
            We provide personalized care for your pets, ensuring that they
            receive the best possible treatment.
          </p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#14182c] to-[#191f3d] rounded-md hover:scale-105 w-full h-full p-6 transition-all">
          <img
            src="/pattern.png"
            className="absolute top-0 right-0 translate-x-[30%] -translate-y-[40%] h-24 opacity-50 -rotate-[150deg]"
            alt=""
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/5145/5145422.png"
            className="h-12"
            alt=""
          />
          <h2 className="font-semibold font-jost text-xl mt-7 text-white">
            Trusted Team
          </h2>
          <p className="text-[13px] text-xs text-white/70 leading-6 mt-1 font-light">
            Our team of highly trained professionals is always ready to assist
            you with your pet&apos;s needs.
          </p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#14182c] to-[#191f3d] rounded-md hover:scale-105 w-full h-full p-6 transition-all">
          <img
            src="/pattern.png"
            className="absolute top-0 right-0 translate-x-[30%] -translate-y-[40%] h-24 opacity-50 -rotate-[150deg]"
            alt=""
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/3220/3220618.png"
            className="h-12"
            alt=""
          />
          <h2 className="font-semibold font-jost text-xl mt-7 text-white">
            Peace Of Mind
          </h2>
          <p className="text-[13px] text-xs text-white/70 leading-6 mt-1 font-light">
            We provide you with peace of mind by ensuring that your pets are in
            safe hands.
          </p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#14182c] to-[#191f3d] rounded-md hover:scale-105 w-full h-full p-6 transition-all">
          <img
            src="/pattern.png"
            className="absolute top-0 right-0 translate-x-[30%] -translate-y-[40%] h-24 opacity-50 -rotate-[150deg]"
            alt=""
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/2913/2913520.png"
            className="h-12"
            alt=""
          />
          <h2 className="font-semibold font-jost text-xl mt-7 text-white">
            Nice Environment
          </h2>
          <p className="text-[13px] text-xs text-white/70 leading-6 mt-1 font-light">
            We provide a safe and comfortable environment for your pets to play
            and relax.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
