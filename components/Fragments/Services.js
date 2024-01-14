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
      image:
        "https://www.groomers-online.com/blog/wp-content/uploads/2023/04/GettyImages-1277453154.jpg",
      buttonText: "Learn more",
      buttonLink: "",
    },
    {
      title: "Boarding",
      description:
        "Provide your pets with the gift of a professional grooming and spa session, expertly administered by our trained team of grooming professionals. We utilize top-of-the-line equipment and cosmetics to ensure the delivery of high-quality services at budget-friendly rates.",
      image:
        "https://vetmed.tamu.edu/news/wp-content/uploads/sites/9/2018/05/20150804-doghouse.jpg",
      buttonText: "Learn more",
      buttonLink: "",
    },
    {
      title: "Dog Walking",
      description:
        "If you're short on time for regular pet walks, arrange a designated time slot and have it taken care of hassle-free. Our approach relies on positive reinforcement, assuring that your pet&apo;ss energy is channelled constructively, preventing disruptions to your living space and keeping boredom at bay.",
      image:
        "https://image.petmd.com/files/styles/863x625/public/2023-02/how-often-should-you-walk-your-dog.jpg",
      buttonText: "Learn more",
      buttonLink: "",
    },

    {
      title: "Training",
      description:
        "If you're short on time for regular pet walks, arrange a designated time slot and have it taken care of hassle-free. Our approach relies on positive reinforcement, assuring that your pet&apo;ss energy is channelled constructively, preventing disruptions to your living space and keeping boredom at bay.",
      image:
        "https://www.dailypaws.com/thmb/qlpLn9xomUWCs0KDmHyzDkOoFzc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/man-training-dog-735898051-2000-eef075257ca44a22828da97373d88e2a.jpg",
      buttonText: "Learn more",
      buttonLink: "",
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
        className={`flex flex-col items-center justify-center ${
          index == 3 ? "md:col-span-3" : "col-span-1"
        }`}
      >
        <img
          src={image}
          className="h-[100px] lg:h-[150px] w-[100px] lg:w-[150px] object-cover rounded-full lg:rounded-full"
          alt=""
        />
        <h2 className="lg:text-lg font-bold mt-5">{title}</h2>
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
      <div className="mt-16 lg:mt-24 grid gap-y-9 gap-x-6 lg:gap-x-6 lg:gap-y-16 grid-cols-2 md:grid-cols-3 lg:max-w-6xl place-content-center place-items-center mx-6 lg:mx-auto">
        {servicesList.map((service, i) => (
          <ServiceCard {...service} key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

export default Services;
