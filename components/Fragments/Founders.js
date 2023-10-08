/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React from "react";

function Founders() {
  const foundersList = [
    {
      image:
        "https://res.cloudinary.com/ddn3h4a2b/image/upload/v1694007716/static/Screenshot_2023-08-26_at_8.08.37_PM_bsv4hc_vsgw0f.png",
      name: "Subhodip Roy",
      position: "Co-Founder",
      description:
        "Our objective is to blend technology seamlessly into the established pet care sector, ensuring convenience and inclusivity for everyone. What distinguishes us from peers is our emphasis on vital services over mere product sales. Our vision aligns with the industry norm: to streamline the pet parenting journey through a comprehensive array of services delivered by proficient experts. Anticipating your acknowledgment of our endeavour, we welcome any input on how we can further enhance it.",
    },
    {
      image:
        "https://res.cloudinary.com/ddn3h4a2b/image/upload/v1694007724/static/Screenshot_2023-08-26_at_8.08.45_PM_epyu8v_b0laqi.png",
      name: "Ankit Karmakar",
      position: "Co-Founder",
      description:
        "Our core intention behind introducing this initiative, despite our existence in the product market for the past few years, is straightforward. We aspire to establish ourselves as a premier modern pet care brand, concentrating primarily on essentials such as healthcare, vaccinations, grooming, and other vital services. Through our team of highly trained professionals and experts, we aim to streamline the journey of pet parenting for individuals engrossed in their professional lives. We understand their desire to provide optimal care for their pets, even when resources are limited.",
    },
  ];

  const FounderCard = ({ image, name, position, description, index }) => {
    return (
      <div className="w-full h-full bg-slate-50 rounded-2xl px-6 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center -translate-y-[40px]">
          <img
            src={image}
            alt=""
            className="h-20 w-20 rounded-full object-cover"
          />
          <h1 className="text-xl font-semibold mt-4">{name}</h1>
          <p className="text-xs px-5 bg-slate-200 text-slate-700 rounded-full text-center mt-2 leading-6">
            {position}
          </p>
          <p className="text-sm leading-6 mt-5 text-slate-700 line-clamp-5">
            {description}
          </p>
          <button className="flex mt-7 items-center text-blue-600 space-x-2 text-sm hover:underline">
            <span>Read more</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="border-t py-20">
      <h1 className="text-3xl font-semibold text-center">Founders table</h1>
      <p className="text-center text-sm text-neutral-600 mt-3 leading-6 mx-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aliquid
      </p>
      <div className="mt-16 lg:mt-28 grid gap-y-20 gap-x-6 lg:gap-x-6 lg:gap-y-6 grid-cols-1 md:grid-cols-2 lg:max-w-5xl place-content-center place-items-center mx-6 lg:mx-auto">
        {foundersList.map((founder, i) => (
          <FounderCard {...founder} key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

export default Founders;
