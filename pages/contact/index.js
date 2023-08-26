import { Icon } from "@iconify/react";
import React from "react";

function Contact() {
  return (
    <div className="min-h-screen h-fit px-6 py-8 lg:py-20 lg:px-[100px]">
      <p className="text-4xl font-bold text-black font-popins">Contact us</p>
      <p className="text-sm mt-3 text-black/80 leading-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas veniam
        accusamus expedita harum mollitia quia quisquam fuga adipisci.
      </p>
      <div className="lg:flex mt-16 lg:space-x-16">
        <form className="lg:w-[50%] grid grid-cols-2 gap-4 h-fit" action="">
          <div>
            <p>Email</p>
            <input
              type="text"
              className="h-12 w-full bg-neutral-100 mt-2 px-4 rounded"
              placeholder="abc@gmail.com"
              name=""
              id=""
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="text"
              className="h-12 w-full bg-neutral-100 mt-2 px-4 rounded"
              placeholder="abc@gmail.com"
              name=""
              id=""
            />
          </div>
          <div className="col-span-2">
            <p>Your message</p>
            <textarea
              type="text"
              className="bg-neutral-100 mt-2 p-4 rounded w-full h-full resize-none"
              placeholder="abc@gmail.com"
              cols="10"
              name=""
              id=""
            />
          </div>
          <div className="col-span-2">
            <button className="text-white bg-neutral-800 mt-10 w-full py-4">
              Send message
            </button>
          </div>
        </form>
        <div className="lg:w-[50%] mt-10 lg:mt-0">
          <h1 className="text-2xl text-center font-bold text-neutral-800">
            Get in touch
          </h1>
          <ul className="text-center mt-7 space-y-3">
            <li className="flex items-center justify-center space-x-3">
              <Icon height={24} icon="material-symbols:call" />
              <span className="text-sm">+91 9996512944</span>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <Icon height={24} icon="ic:baseline-email" />
              <span className="text-sm">admin@doctordoggy.vet</span>
            </li>
          </ul>
          <h1 className="text-2xl text-center font-bold text-neutral-800 mt-16">
            Locate us
          </h1>
          <ul className="text-center mt-7 space-y-3">
            <li className="flex items-center justify-center space-x-3">
              <Icon height={24} icon="solar:calendar-broken" />
              <span className="text-sm">MON - FRI, 9:00AM - 10:00PM</span>
            </li>
            <a
              href="https://www.google.com/maps/dir//New+Pet+smart+bidhannagar,+52,+Bidhannagar,+Durgapur,+West+Bengal+713206/@23.5158391,87.3548915,20.29z/data=!4m8!4m7!1m0!1m5!1m1!1s0x39f77193aa4e95c7:0xdb74e5bbb15abf79!2m2!1d87.3552126!2d23.5158563?entry=ttu"
              rel="noopener noreferrer"
              className="block"
            >
              <li className="flex items-center justify-center space-x-3 hover:text-blue-500">
                <Icon height={24} icon="mdi:location" />
                <span className="text-sm">Locate on maps</span>
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
