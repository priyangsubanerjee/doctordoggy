/* eslint-disable @next/next/no-img-element */
import React from "react";

function Founders() {
  return (
    <div className="bg-[#0d1121] px-6 lg:px-24 py-36">
      <h2 className="relative text-center text-white font-bold text-2xl lg:text-3xl font-jost leading-[1.5] lg:leading-[1.4]">
        From the <br className="lg:hidden" /> founders table.
        <img
          src="https://cdn-icons-png.flaticon.com/512/1657/1657088.png"
          className="absolute -top-1 left-[15%] lg:left-[30%] -translate-x-1/2 h-9 lg:h-12"
          alt=""
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/1657/1657088.png"
          className="absolute -top-1 right-[15%] lg:right-[30%] translate-x-1/2 h-9 lg:h-12"
          alt=""
        />
      </h2>
      <p className="text-center text-slate-300 text-sm mt-3">
        The place where it all started.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
        <div className="bg-gradient-to-b from-[#14182c] to-[#191f3d] rounded-md hover:scale-105 w-full h-full p-6 transition-all relative overflow-hidden">
          <div className="flex">
            <img
              src="https://res.cloudinary.com/ddn3h4a2b/image/upload/v1694007716/static/Screenshot_2023-08-26_at_8.08.37_PM_bsv4hc_vsgw0f.png"
              className="h-16 w-16 rounded-full object-cover border border-white"
              alt=""
            />
            <div className="ml-4">
              <h2 className="text-white text-xl font-semibold font-jost">
                Subhodip Roy
              </h2>
              <p className="text-slate-400 text-sm mt-2">Co-Founder</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-7 mt-6">
            Our objective is to blend technology seamlessly into the established
            pet care sector, ensuring convenience and inclusivity for everyone.
            What distinguishes us from peers is our emphasis on vital services
            over mere product sales. Our vision aligns with the industry norm:
            to streamline the pet parenting journey through a comprehensive
            array of services delivered by proficient experts. Anticipating your
            acknowledgment of our endeavour, we welcome any input on how we can
            further enhance it.
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#14182c] to-[#191f3d] rounded-md hover:scale-105 w-full h-full p-6 transition-all relative overflow-hidden">
          <div className="flex">
            <img
              src="https://res.cloudinary.com/ddn3h4a2b/image/upload/v1694007724/static/Screenshot_2023-08-26_at_8.08.45_PM_epyu8v_b0laqi.png"
              className="h-16 w-16 rounded-full object-cover border border-white"
              alt=""
            />
            <div className="ml-4">
              <h2 className="text-white text-xl font-semibold font-jost">
                Ankit Karmakar
              </h2>
              <p className="text-slate-400 text-sm mt-2">Co-Founder</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-7 mt-6">
            Our core intention behind introducing this initiative, despite our
            existence in the product market for the past few years, is
            straightforward. We aspire to establish ourselves as a premier
            modern pet care brand, concentrating primarily on essentials such as
            healthcare, vaccinations, grooming, and other vital services.
            Through our team of highly trained professionals and experts, we aim
            to streamline the journey of pet parenting for individuals engrossed
            in their professional lives. We understand their desire to provide
            optimal care for their pets, even when resources are limited.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Founders;
