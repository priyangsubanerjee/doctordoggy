/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import { getVaccinesByEmail } from "@/prisma/vaccine";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FetchVaccinations } from "@/hooks/fetch";
import ScheduleFirstVaccination from "@/components/FirstAction/ScheduleFirstVaccination";
import toast from "react-hot-toast";
import VaccineCard from "@/components/Cards/VaccineCard";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let vaccinations = [];
//   if (session) {
//     vaccinations = await getVaccinesByEmail(session?.user?.email);
//     vaccinations = JSON.parse(JSON.stringify(vaccinations));
//   }

//   return {
//     props: {
//       vaccinations,
//     },
//   };
// }

function VaccinationHistory({}) {
  const session = useSession();
  const [vaccinations, setVaccinations] = React.useState(null);

  useEffect(() => {
    if (session.status == "loading" || session.status == "unauthenticated")
      return;
    FetchVaccinations(session.data.user.email).then((data) => {
      setVaccinations(data);
    });
  }, [session.status]);

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Vaccination History
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Link href="/vaccination/schedule">
          <div className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
            <span>Schedule vaccination</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </div>
        </Link>
        <Link
          href={"/vaccination/uploadOld"}
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Upload old records</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </Link>
      </div>
      {vaccinations == null && (
        <div className="flex items-center justify-center mt-16">
          <Spinner color="primary" size="lg" className="" />
        </div>
      )}

      {vaccinations != null && (
        <>
          {vaccinations.length != 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 md:t-16 lg:max-w-6xl lg:mx-auto px-5">
              {vaccinations.map((vaccine, index) => (
                <VaccineCard
                  key={index}
                  vaccine={vaccine}
                  vaccinations={vaccinations}
                  setVaccinations={setVaccinations}
                />
              ))}
            </div>
          )}
          {vaccinations.length == 0 && <ScheduleFirstVaccination />}
        </>
      )}
    </div>
  );
}

export default VaccinationHistory;
