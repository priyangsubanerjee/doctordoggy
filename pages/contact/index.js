import React from "react";

function Contact() {
  return (
    <div className="min-h-screen h-fit px-6 py-8 lg:py-20 lg:px-[100px]">
      <h1 className="text-2xl lg:text-3xl font-bold font-popins text-neutral-800">
        Contact us
      </h1>
      <div className="grid grid-cols-2 max-w-4xl mt-20">
        <button className="p-4 border rounded-lg flex items-center text-slate-700">
          <iconify-icon height="32" icon="fluent:call-24-filled"></iconify-icon>
          <span className="ml-3">Call us</span>
          <span className="ml-6">(123) 456-7890</span>
        </button>
      </div>
    </div>
  );
}

export default Contact;
