import React from "react";

function Petcard() {
  return (
    <div className="flex flex-col items-center relative">
      <div className="absolute top-2 right-1 text-2xl text-blue-500">
        <iconify-icon icon="ic:twotone-male"></iconify-icon>
      </div>
      <div className="lg:h-32 h-28 lg:w-32 w-28 p-2 border border-dashed border-neutral-300 rounded-full flex items-center justify-center bg-white">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3307/3307591.png"
          className="bg-gray-50 rounded-full p-3"
          alt=""
        />
      </div>
      <p className="text-center text-neutral-700 font-semibold mt-3 text-sm">
        Laddu
      </p>
      <span className="text-[10px] mt-2">3.4 Years</span>
    </div>
  );
}

export default Petcard;
