/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Marquee from "react-fast-marquee";
import ServiceCard from "../Cards/ServiceCard";

function Services() {
  return (
    <div className="py-20 lg:pt-28 lg:pb-16 bg-white relative overflow-hidden">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3042/3042349.png"
        alt=""
        className="absolute left-1/2 top-0 h-16 lg:h-24 -translate-x-1/2"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/4794/4794033.png"
        className="absolute left-0 top-0 h-28 lg:h-[200px] -translate-x-[30%] -translate-y-[30%] grayscale opacity-40"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/4794/4794033.png"
        className="absolute right-0 top-0 h-28 lg:h-[200px] translate-x-[30%] -translate-y-[30%] grayscale opacity-40"
      />
      <div className="bg-[#fff] px-6 lg:px-24">
        <h1 className="text-center text-3xl lg:text-4xl font-jost font-semibold text-neutral-800">
          Services we offer
        </h1>
        <p className="text-center text-neutral-500 mt-4 text-sm leading-6">
          Make your experience as a pet parent smoother by selecting from our
          extensive variety of pet care services.
        </p>
      </div>
      <div className="bg-white mt-16">
        <Marquee className="pb-16" pauseOnClick speed={40}>
          <ServiceCard
            image="https://kibblesandcuts.com/wp-content/uploads/2022/02/Dog-Grooming-Services.jpg"
            title="Grooming & Spa"
            description="Provide your pets with the gift of a professional grooming and
                spa session, expertly administered by our trained team of
                grooming professionals. We utilize top-of-the-line equipment and
                cosmetics to ensure the delivery of high-quality services at
                budget-friendly rates."
          />

          <ServiceCard
            image="https://www.pawspace.in/wp-content/uploads/2021/10/benefit-of-home-dog-boarding.jpg"
            title="Boarding"
            description="Provide your pets with the gift of a professional grooming and
                spa session, expertly administered by our trained team of
                grooming professionals. We utilize top-of-the-line equipment and
                cosmetics to ensure the delivery of high-quality services at
                budget-friendly rates."
          />

          <ServiceCard
            image="https://img.freepik.com/free-photo/close-up-veterinary-doctor-taking-care-pet_23-2149267859.jpg?w=2000"
            title="Veterinary"
            description="Have your pets undergo examinations by our exceptionally
                skilled, capable, and seasoned team of veterinarians. Our duty
                involves consistently evaluating our doctors and safeguarding
                our clientele from unqualified individuals."
          />

          <ServiceCard
            image="https://image.petmd.com/files/styles/863x625/public/2023-02/how-often-should-you-walk-your-dog.jpg"
            title="Dog Walking"
            description="If you're short on time for regular pet walks, arrange a
                designated time slot and have it taken care of hassle-free. Our
                approach relies on positive reinforcement, assuring that your
                pet&apo;ss energy is channelled constructively, preventing
                disruptions to your living space and keeping boredom at bay."
          />
        </Marquee>
      </div>
    </div>
  );
}

export default Services;
