/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function Services() {
  const servicesList = [
    {
      title: "Grooming & Spa",
      description:
        "Provide your pets with the gift of a professional grooming and spa session, expertly administered by our trained team of grooming professionals. We utilize top-of-the-line equipment and cosmetics to ensure the delivery of high-quality services at budget-friendly rates.",
      image: "https://cdn-icons-png.flaticon.com/512/8817/8817469.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Grooming&Spa`,
    },
    {
      title: "Boarding",
      description:
        "Provide your pets with the gift of a professional grooming and spa session, expertly administered by our trained team of grooming professionals. We utilize top-of-the-line equipment and cosmetics to ensure the delivery of high-quality services at budget-friendly rates.",
      image: "https://cdn-icons-png.flaticon.com/512/10811/10811682.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Boarding`,
    },
    {
      title: "Dog Walking",
      description:
        "If you're short on time for regular pet walks, arrange a designated time slot and have it taken care of hassle-free. Our approach relies on positive reinforcement, assuring that your pet&apo;ss energy is channelled constructively, preventing disruptions to your living space and keeping boredom at bay.",
      image: "https://cdn-icons-png.flaticon.com/512/7699/7699724.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Dog-Walking`,
    },

    {
      title: "Training",
      description:
        "If you're short on time for regular pet walks, arrange a designated time slot and have it taken care of hassle-free. Our approach relies on positive reinforcement, assuring that your pet&apo;ss energy is channelled constructively, preventing disruptions to your living space and keeping boredom at bay.",
      image: "https://cdn-icons-png.flaticon.com/512/6381/6381356.png",
      buttonText: "Coming soon",
      buttonLink: `/join-waitlist?ref=Training`,
    },
  ];

  const ServiceCard = ({
    title,
    description,
    image,
    buttonText,
    buttonLink,
    index,
  }) => {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-md p-6 ${
          index == 3 ? "md:col-span-3" : "col-span-1"
        } `}
      >
        <img
          src={image}
          className="h-[70px] bg-sky-50 p-4 lg:h-[80px] w-[70px] lg:w-[80px] object-cover rounded-2xl lg:rounded-2xl"
          alt=""
        />
        <h2 className="lg:text-lg font-semibold mt-5">{title}</h2>
        <p className="text-xs max-w-[300px] text-neutral-600 text-center leading-6 line-clamp-2 mt-2">
          {description}
        </p>
        <Link href={buttonLink} className="mt-3 block">
          <button className="flex items-center text-blue-600 space-x-2 text-sm hover:underline">
            <span>{buttonText}</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="border-t py-24">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center">
        Services that we provide
      </h1>
      <p className="text-sm text-center mt-3 mx-6 leading-6 text-neutral-600">
        Make your experience as a pet parent smoother by selecting from our
        extensive variety of pet care services.
      </p>
      <div className="mt-16 lg:mt-16 grid grid-cols-2 md:grid-cols-3 gap-y-10 lg:max-w-6xl place-content-center place-items-center mx-3 lg:mx-auto">
        {servicesList.map((service, i) => (
          <ServiceCard {...service} key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

export default Services;
