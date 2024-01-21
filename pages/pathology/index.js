/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
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

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let pathologyReports = [];

//   if (session) {
//     pathologyReports = await getPathologyReportsByEmail(session?.user?.email);
//     pathologyReports = JSON.parse(JSON.stringify(pathologyReports));
//   }

//   return {
//     props: {
//       pathologyReports,
//     },
//   };
// }

function Pathology() {
  const session = useSession();
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [pathologyReports, setPathologyReports] = React.useState([]);

  useEffect(() => {
    if (session.status == "authenticated") {
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

  const PathologyCard = ({ report }) => {
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={report.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <p className="text-xs ml-2 text-neutral-500">{report.name}</p>
          <p className="ml-auto mr-2 flex items-center space-x-1"></p>
          <Dropdown>
            <DropdownTrigger>
              <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
                <Icon height={20} icon="pepicons-pencil:dots-y" />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                switch (key) {
                  case "delete":
                    window.location.href = `/pathology/${report.id}/delete?redirect=${window.location}`;
                    break;
                  case "certificate":
                    window.location.href = `/pathology/${report.id}/`;
                    break;
                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem key="certificate">Certificate</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete record
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-3">
          <h1 className="text-base font-semibold text-neutral-700">
            {report.testName}
          </h1>
          <div className="flex items-center mt-3">
            <Icon icon="solar:calendar-line-duotone" />
            <p className="text-sm text-neutral-500 ml-2">
              <span className="text-neutral-700">
                {new Date(report.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };
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
              <PathologyCard key={index} report={report} />
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
