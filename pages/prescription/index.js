/* eslint-disable @next/next/no-html-link-for-pages */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function Prescriptions() {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Prescription Respository
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <a
          href="/prescription/upload"
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer"
        >
          <span>Upload prescription</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
        <a
          href={"/vaccination/schedule"}
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Find more help</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Prescriptions;
