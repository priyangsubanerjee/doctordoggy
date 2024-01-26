/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { getPathologyReportsByEmail } from "@/prisma/pathology";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import UploadFirstPathology from "@/components/FirstAction/UploadFirstPathology";
import PathologyCard from "@/components/Cards/PathologyCard";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin?next=/pathology",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       auth: true,
//     },
//   };
// }

function Pathology() {
  const session = useSession();
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [pathologyReports, setPathologyReports] = React.useState([]);

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/signin?next=/vaccination");
      return;
    } else if (session.status == "loading") {
      return;
    } else if (session.status == "authenticated") {
      (async () => {
        let pathologyRequest = await axios.post(
          "/api/pathology/get",
          {
            email: session?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        pathologyRequest.data.success
          ? setPathologyReports(pathologyRequest.data.reports)
          : null;

        setPageLoaded(true);
      })();
    }
  }, [session.status]);

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Pathology Respository
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Link href="/pathology/upload">
          <div className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
            <span>Upload report</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </div>
        </Link>
        <a
          href={"/vaccination/schedule"}
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Find more help</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
      </div>
      {pageLoaded ? (
        <>
          {pathologyReports.length == 0 && <UploadFirstPathology />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 md:mt-16 max-w-6xl lg:mx-auto mx-5">
            {pathologyReports.map((report, index) => (
              <PathologyCard
                key={index}
                pathology={report}
                pathologies={pathologyReports}
                setPathologies={setPathologyReports}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <Spinner size="lg" color="primary" />
        </div>
      )}
    </div>
  );
}

export default Pathology;
