/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";
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
import UploadFirstPrescription from "@/components/FirstAction/UploadFirstPrescription";
import PrescriptionCard from "@/components/Cards/PrescriptionCard";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin?next=/prescription",
        permanent: false,
      },
    };
  }

  return {
    props: {
      auth: true,
    },
  };
}

function Prescriptions() {
  const router = useRouter();
  let session = useSession();
  const [prescriptions, setPrescriptions] = React.useState(null);

  useEffect(() => {
    if (session.status == "loading" || session.status == "unauthenticated")
      return;
    FetchPrescriptions(session?.data?.user?.email).then((data) => {
      setPrescriptions(data);
    });
  }, [session.status]);

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
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
                <PrescriptionCard
                  prescriptions={prescriptions}
                  setPrescriptions={setPrescriptions}
                  key={index}
                  prescription={prescription}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Prescriptions;
