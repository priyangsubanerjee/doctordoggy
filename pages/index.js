/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Marquee from "react-fast-marquee";
import { Icon } from "@iconify/react";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // if redirect is false, then the user is not logged in

  if (context.query.redirect === "false") {
    return {
      props: {
        session,
      },
    };
  }

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Home() {
  useEffect(() => {
    let i = 0;
    const carouselCards = document.querySelectorAll(".carouselCard");
    setInterval(() => {
      if (i == 0) {
        carouselCards[0].style.transform = "translateX(-100%)";
        carouselCards[1].style.transform = "translateX(-100%)";
        i = 1;
      } else {
        carouselCards[0].style.transform = "translateX(0%)";
        carouselCards[1].style.transform = "translateX(0%)";
        i = 0;
      }
    }, 7000);
  }, []);
  return (
    <main>
      <div className="w-full h-[500px] lg:h-[670px] lg:p-12">
        <div className="flex h-full w-full bg-red-50 items-center overflow-auto lg:rounded-lg transition-all relative pointer-events-none">
          <div className="carouselCard h-full shrink-0 w-full relative overflow-hidden transition-all duration-700">
            <img
              src="https://images.alphacoders.com/110/1106886.jpg"
              className="h-full w-full object-cover absolute inset-0"
              alt=""
            />
            <div className="h-full w-full bg-gradient-to-r from-black to-transparent absolute inset-0 flex flex-col justify-center px-8 lg:px-20">
              <span className="text-white/70 w-fit rounded-full px-5 py-1 border border-white/50 text-xs tracking-widest font-semibold">
                FEATURED
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white lg:w-1/2 font-popins leading-[1.2] lg:leading-[1.2] mt-8">
                Book a service for your pet now.
              </h1>
              <p className="text-white lg:w-1/2 mt-6 leading-6 lg:leading-[2] text-xs lg:text-sm font-popins">
                Treat your pets with dedicated care from our team of specially
                trained and highly experienced professionals. At Doctor Doggy,
                we guarantee top-notch treatment for your beloved non-human
                family members, even in your absence. Choose from a diverse
                array of services that we offer.
              </p>
              <div className="flex items-center mt-10 space-x-4 text-sm">
                <button className="bg-[#F15958] px-6 h-12 text-white rounded-md">
                  Make a reservation
                </button>
                <button className="bg-neutral-800 px-6 h-12 text-white rounded-md">
                  Learn more
                </button>
              </div>
            </div>
          </div>
          <div className="carouselCard h-full shrink-0 w-full relative overflow-hidden transition-all duration-700">
            <img
              src="https://media.istockphoto.com/id/1357774532/photo/dog-at-the-veterinarian.jpg?s=170667a&w=0&k=20&c=0Gxpkd99YeG-FWfM8xDOHOB6_8wiX5AscnfmiCNz-Lo="
              className="h-full w-full object-cover absolute inset-0"
              alt=""
            />
            <div className="h-full w-full bg-gradient-to-r from-black to-transparent absolute inset-0 flex flex-col justify-center px-8 lg:px-20">
              <span className="text-white/70 w-fit rounded-full px-5 py-1 border border-white/50 text-xs tracking-widest font-semibold">
                FEATURED
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white lg:w-1/2 font-popins leading-[1.2] lg:leading-[1.2] mt-8">
                Digitalize your pets medical records.
              </h1>
              <p className="text-white lg:w-1/2 mt-6 leading-6 lg:leading-[2] text-xs lg:text-sm font-popins">
                Amidst technological progress, why remain attached to physical
                vaccine cards and essential papers without any backup? Make the
                transition to Doctor Doggy&apos;s digitalized pet record portal,
                ensuring you never miss out on important information again.
              </p>
              <div className="flex items-center mt-10 space-x-4 text-sm">
                <button className="bg-[#F15958] px-6 h-12 text-white rounded-md">
                  Get Started For Free
                </button>
                <button className="bg-neutral-800 px-6 h-12 text-white rounded-md">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden px-6 lg:px-[100px] py-12 lg:py-28 lg:hidden">
        <div className="lg:w-1/2 flex items-center justify-center lg:hidden mb-10">
          <div className="h-fit w-[90%]">
            <img
              src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1690706013/Personal/Frame_2_yfmzoc.png"
              alt=""
            />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl lg:text-6xl lg:leading-[1.4] leading-[1.7] font-semibold mt-6 font-popins text-neutral-900">
            Digitialize your pet&apos;s health records.
          </h1>
          <div className="mt-3 lg:mt-7 text-neutral-700">
            <p className="leading-7 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              possimus aliquam saepe dolorum placeat consequatur laudantium
              doloremque! Maxime dolorum, neque ipsa, sapiente voluptas tenetur
              voluptatibus ex dolore similique
              <br />
            </p>
            <button
              onClick={() => signIn("google")}
              className="text-sm bg-neutral-100 px-3 py-4 lg:py-4 lg:px-6 text-black rounded flex items-center justify-center space-x-3 mt-10 lg:w-1/2 w-full"
            >
              <iconify-icon height="20" icon="devicon:google"></iconify-icon>
              <span>Get Started</span>
            </button>
          </div>
        </div>
        <div className="hidden lg:w-1/2 lg:flex items-center justify-center">
          <div className="relative h-fit w-[70%]">
            <img
              src="https://res.cloudinary.com/db9kd4qbi/image/upload/v1690698833/Personal/Frame_1_z1zucl.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[100px] py-10 lg:py-28 bg-neutral-50 relative">
        <p className="font-medium tracking-wider text-xs">WHY CHOOSE US?</p>
        <h2 className="text-2xl font-medium font-popins mt-10 leading-[1.6]">
          We are the best in the business.
        </h2>
        <p className="mt-4 text-sm leading-7">
          Embark on your parenthood adventure alongside a community of animal
          enthusiasts with over 7 years of experience. Our highest commitment is
          to customer contentment, setting us apart from all other contenders in
          this field. Join the pet care revolution by making the switch to
          Doctor Doggy today.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9784/9784121.png"
          className="absolute top-10 left-0 -translate-x-[45%] h-32 hidden lg:block"
          alt=""
        />

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10711/10711322.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Secure and Reliable
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10061/10061171.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Cloud Storage
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9769/9769561.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Handsfree Visits
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
          <div className="bg-white shadow-xl shadow-black/[0.01] rounded flex flex-col items-center justify-center px-4 py-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9769/9769705.png"
              className="h-20"
              alt=""
            />
            <h2 className="font-medium font-popins mt-7 text-sm text-center">
              Many more
            </h2>
            <p className="text-[10px] mt-2 font-light text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <h1 className="text-center text-3xl font-semibold font-popins text-neutral-800">
          See our all services ?
        </h1>
        <p className="text-center text-neutral-600 text-sm mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt .
        </p>

        <div className="mt-10">
          <Marquee>
            <div className="lg:w-[400px] h-[550px] px-10 py-16 bg-[#CAE6D4] flex flex-col items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2369/2369545.png"
                className="h-20"
                alt=""
              />
              <h2 className="text-2xl lg:text-3xl font-bold mt-5 text-black font-popins">
                Grooming & Spa
              </h2>
              <p className="text-center text-sm leading-6 mt-4 text-neutral-800">
                Provide your pets with the gift of a professional grooming and
                spa session, expertly administered by our trained team of
                grooming professionals. We utilize top-of-the-line equipment and
                cosmetics to ensure the delivery of high-quality services at
                budget-friendly rates.
              </p>
              <button className="mt-8 bg-neutral-800 text-white px-6 text-sm py-2 rounded-full">
                Learn more
              </button>
            </div>
            <div className="lg:w-[400px] h-[550px] px-10 py-16 bg-[#FCEBCC] flex flex-col items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7810/7810650.png"
                className="h-20"
                alt=""
              />
              <h2 className="text-2xl lg:text-3xl font-bold mt-5 text-black font-popins">
                Boarding
              </h2>
              <p className="text-center text-sm leading-6 mt-4 text-neutral-800">
                Feeling anxious about leaving your pets in an unfamiliar
                environment while boarding outside the city? Relax and pay a
                visit to our boarding facility. Our fully air-conditioned
                accommodations provide ample personal space for play. What sets
                us apart are the specialized meal choices, regular cleaning, and
                stringent quality control measures.
              </p>
              <button className="mt-8 bg-neutral-800 text-white px-6 text-sm py-2 rounded-full">
                Learn more
              </button>
            </div>
            <div className="lg:w-[400px] h-[550px] px-10 py-16 bg-[#D5BCEE] flex flex-col items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4966/4966169.png"
                className="h-20"
                alt=""
              />
              <h2 className="text-2xl lg:text-3xl font-bold mt-5 text-black font-popins">
                Veterinary
              </h2>
              <p className="text-center text-sm leading-6 mt-4 text-neutral-800">
                Have your pets undergo examinations by our exceptionally
                skilled, capable, and seasoned team of veterinarians. Our duty
                involves consistently evaluating our doctors and safeguarding
                our clientele from unqualified individuals.
              </p>
              <button className="mt-8 bg-neutral-800 text-white px-6 text-sm py-2 rounded-full">
                Learn more
              </button>
            </div>
            <div className="lg:w-[400px] h-[550px] px-10 py-16 bg-[#F9CBCA] flex flex-col items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8410/8410128.png"
                className="h-20"
                alt=""
              />
              <h2 className="text-2xl lg:text-3xl font-bold mt-5 text-black font-popins">
                Dog Walking
              </h2>
              <p className="text-center text-sm leading-6 mt-4 text-neutral-800">
                If you&apos;re short on time for regular pet walks, arrange a
                designated time slot and have it taken care of hassle-free. Our
                approach relies on positive reinforcement, assuring that your
                pet&apo;ss energy is channelled constructively, preventing
                disruptions to your living space and keeping boredom at b
              </p>
              <button className="mt-8 bg-neutral-800 text-white px-6 text-sm py-2 rounded-full">
                Learn more
              </button>
            </div>
            <div className="lg:w-[400px] h-[550px] px-10 py-16 bg-[#caf9f0] flex flex-col items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3827/3827176.png"
                className="h-20"
                alt=""
              />
              <h2 className="text-2xl lg:text-3xl font-bold mt-5 text-black font-popins">
                Training
              </h2>
              <p className="text-center text-sm leading-6 mt-4 text-neutral-800">
                Uncertain about managing your exuberant pet? Worried about
                teaching them fundamental commands? Reserve your initial session
                with our trainer and witness the transformation. Our trainer
                will lead you through necessary steps to ensure your pet&apos;s
                well-being and vitality.
              </p>
              <button className="mt-8 bg-neutral-800 text-white px-6 text-sm py-2 rounded-full">
                Learn more
              </button>
            </div>
          </Marquee>
        </div>
      </div>

      <div className="px-6 lg:px-[100px] py-10 lg:py-28">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-neutral-800 font-popins">
            What our customers say
          </p>
          <button className="font-semibold tracking-wide88 text-xs text-blue-900">
            WRITE A REVIEW
          </button>
        </div>
        <div className="flex mt-10">
          <div className="lg:w-[500px] bg-neutral-50 rounded p-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
              <div className="ml-4">
                <p className="font-medium">Jane Doe</p>
                <span className="text-[10px]">12 July, 2023</span>
              </div>
            </div>
            <p className="text-xs leading-6 font-light mt-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
              vitae deserunt tenetur qui! Nulla impedit error suscipit harum,
              dolore soluta deserunt atque repudiandae placeat ratione
              reprehenderit velit ipsa tempore expedita.
            </p>
            <div className="mt-4 text-yellow-500 space-x-2">
              {[...Array(5)].map((_, i) => {
                return (
                  <iconify-icon
                    key={i}
                    icon="solar:star-bold-duotone"
                  ></iconify-icon>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[100px] py-10 lg:py-28 bg-neutral-950">
        <p className="tracking-wider text-4xl font-bold text-white font-popins">
          Trusted Brands
        </p>
        <p className="text-sm mt-3 text-white/50 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          veniam accusamus expedita harum mollitia quia quisquam fuga adipisci
          deleniti quasi, eius exercitationem nemo, iusto veritatis corporis
          quod placeat nihil sed.
        </p>
        <div className="flex items-center justify-between"></div>
        <div className="flex mt-10">
          <Marquee gradient={true} gradientColor={[0, 0, 0]}>
            <div className="w-52 h-52 bg-transparent shrink-0 mr-20">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Royal-Canin-Logo.svg/2560px-Royal-Canin-Logo.svg.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div className="w-52 h-52 bg-transparent shrink-0 mr-20">
              <img
                src="https://1000logos.net/wp-content/uploads/2023/03/Pedigree-Logo-2007.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div className="w-52 h-52 bg-transparent shrink-0 mr-20">
              <img
                src="https://seeklogo.com/images/F/farmina-pet-foods-logo-19EA90C73A-seeklogo.com.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </Marquee>
        </div>
      </div>

      <div className="px-6 lg:px-[100px] py-10 lg:pt-28">
        <p className="text-4xl font-bold text-black font-popins">Contact us</p>
        <p className="text-sm mt-3 text-black/80 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          veniam accusamus expedita harum mollitia quia quisquam fuga adipisci.
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
    </main>
  );
}
