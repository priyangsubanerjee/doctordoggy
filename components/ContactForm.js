import { Icon } from "@iconify/react";
import React from "react";

function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [contactDetails, setContactDetails] = React.useState("");
  const [message, setMessage] = React.useState("");

  const submitForm = async () => {
    if (!name || !contactDetails || !message) {
      alert("Please fill all the fields");
      return;
    } else {
      setLoading(true);
      const response = await fetch("/api/notification/send", {
        method: "POST",
        body: JSON.stringify({
          message: `New message from ${name} with contact details ${contactDetails}%0A%0A${message}`,
        }),
      });
      const data = await response.json();
      setLoading(false);
      alert("Message sent successfully");
      setName("");
      setContactDetails("");
      setMessage("");
    }
  };

  return (
    <div>
      <p className="text-2xl lg:text-4xl font-bold text-black font-popins">
        Contact us
      </p>
      <p className="text-sm mt-3 text-black/80 leading-6">
        Drop us a message and we&apos;ll get back to you as soon as possible.
      </p>
      <div className="lg:flex mt-16 lg:space-x-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="lg:w-[50%] w-full grid grid-cols-1 lg:grid-cols-2 gap-4 h-fit"
          action=""
        >
          <div>
            <p className="text-sm font-medium text-neutral-700">Name</p>
            <input
              type="text"
              className="h-12 w-full bg-neutral-100 mt-2 px-4 rounded"
              placeholder="Please enter your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              name=""
              id=""
            />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-700">
              Email / Phone
            </p>
            <input
              onChange={(e) => {
                setContactDetails(e.target.value);
              }}
              value={contactDetails}
              type="text"
              className="h-12 w-full bg-neutral-100 mt-2 px-4 rounded"
              placeholder="Your email or phone number"
              name=""
              id=""
            />
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-neutral-700">Your message</p>
            <textarea
              type="text"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              className="bg-neutral-100 mt-2 p-4 rounded w-full h-full resize-none"
              placeholder="Your message here"
              name=""
              id=""
            />
          </div>
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="text-white bg-neutral-800 mt-10 w-full py-4"
            >
              Send message
            </button>
          </div>
        </form>
        <div className="lg:w-[50%] mt-10 lg:mt-0">
          <h1 className="text-xl lg:text-2xl text-center font-bold text-neutral-800">
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
          <h1 className="text-xl lg:text-2xl text-center font-bold text-neutral-800 mt-16">
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

export default ContactForm;
