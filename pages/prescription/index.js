/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPrescriptionsByEmail } from "@/prisma/prescription";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FetchPrescriptions } from "@/hooks/fetch";
import { useRouter } from "next/router";
import UploadFirstPrescription from "@/components/Cards/UploadFirstPrescription";

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   let prescriptions = [];

//   if (session) {
//     //prescriptions = await getPrescriptionsByEmail(session?.user?.email);
//     //prescriptions = JSON.parse(JSON.stringify(prescriptions));
//   }

//   return {
//     props: {
//       session,
//       prescriptions,
//     },
//   };
// }

function Prescriptions() {
  const router = useRouter();
  let session = useSession();
  const [prescriptions, setPrescriptions] = React.useState(null);

  //   const fetchPrescriptions = async () => {
  //     let prescriptions = await axios.post(
  //       "/api/prescription/read",
  //       {
  //         email: session.data.user.email,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setPrescriptions(prescriptions.data.prescriptions);
  //   };

  useEffect(() => {
    if (session.status == "loading" || session.status == "unauthenticated")
      return;
    FetchPrescriptions(session?.data?.user?.email).then((data) => {
      setPrescriptions(data);
    });
  }, [session.status]);

  const PrescriptionCard = ({ prescription }) => {
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={prescription.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />

          <p className="text-xs ml-2 text-neutral-500">{prescription.name}</p>
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
                    router.push(`/prescription/${prescription.id}/delete`);
                    //window.location.href = `/prescription/${prescription.id}/delete`;
                    break;
                  case "certificate":
                    router.push(`/prescription/${prescription.id}/`);
                    //window.location.href = `/prescription/${prescription.id}/`;
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
          <Link href={`/prescription/${prescription.id}`}>
            <h1 className="text-base font-semibold text-neutral-700 hover:text-blue-600 cursor-pointer">
              {prescription.reasonOfVisit}
            </h1>
          </Link>
          <div className="flex items-center mt-3">
            <Icon icon="solar:calendar-line-duotone" />
            <p className="text-sm text-neutral-500 ml-2">
              <span className="text-neutral-700">
                {new Date(prescription.dateOfVisit).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-20 lg:mt-16">
        Prescription Respository
      </h1>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <Link href="/prescription/upload">
          <div className="flex items-center text-blue-600 space-x-2 text-sm hover:underline cursor-pointer">
            <span>Upload prescription</span>
            <span className="translate-y-[1px]">
              <Icon icon="formkit:right" />
            </span>
          </div>
        </Link>
        <a
          href={"/join-waitlist?ref=find-help"}
          rel="noreferrer noopener"
          className="flex items-center text-blue-600 space-x-2 text-sm hover:underline"
        >
          <span>Find more help</span>
          <span className="translate-y-[1px]">
            <Icon icon="formkit:right" />
          </span>
        </a>
      </div>

      {prescriptions == null ? (
        <>
          <div className="flex items-center justify-center mt-20">
            <Spinner color="primary" size="lg" className="" />
          </div>
        </>
      ) : (
        <>
          {prescriptions.length == 0 && <UploadFirstPrescription />}
          {prescriptions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 mt-10 lg:mt-16 max-w-6xl lg:mx-auto mx-5">
              {prescriptions.reverse().map((prescription, index) => (
                <PrescriptionCard key={index} prescription={prescription} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Prescriptions;
