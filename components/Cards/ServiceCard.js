/* eslint-disable @next/next/no-img-element */
import React from "react";

function ServiceCard({
  image,
  title,
  description,
  buttonText = "Book now",
  buttonLink,
}) {
  return (
    <div className="bg-white rounded-md overflow-hidden border shadow-lg shadow-neutral-200 max-w-sm lg:max-w-[400px] mr-10">
      <div className="relative">
        <img
          src={image}
          alt=""
          className="full w-full object-cover  h-[180px] lg:h-[200px] "
        />
        <div className="absolute p-7 inset-0 h-full w-full z-10 bg-gradient-to-b from-transparent to-black flex items-end">
          <h2 className="text-3xl font-jost font-semibold text-white">
            {title}
          </h2>
        </div>
      </div>
      <div className="px-7 py-5 h-[250px] flex flex-col">
        <p className="text-xs text-neutral-600 leading-6 mt-2 mb-5 line-clamp-5">
          {description}
        </p>
        <button className="mt-auto text-sm shrink-0 bg-slate-900 text-white h-12 rounded-md">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
