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
import ScheduleFirstVaccination from "@/components/Cards/ScheduleFirstVaccination";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [vaccinations, setVaccinations] = React.useState(null);
  const [confirmDeleteVaccination, setconfirmDeleteVaccination] =
    React.useState("");

  const handleConfirmDeleteVaccination = async () => {
    toast.loading("Deleting vaccination...");
    try {
      let deleteRequest = await axios.post(
        "/api/vaccine/delete",
        {
          id: confirmDeleteVaccination,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.remove();
      if (deleteRequest.data.success) {
        toast.success(deleteRequest.data.message);
        setVaccinations(
          vaccinations.filter(
            (vaccine) => vaccine.id != confirmDeleteVaccination
          )
        );
        setconfirmDeleteVaccination("");
      } else {
        toast.error(deleteRequest.data.message);
        setconfirmDeleteVaccination("");
        setLoading(false);
      }
    } catch (error) {
      toast.remove();
      toast.error(error.message);
      setconfirmDeleteVaccination("");
      setLoading(false);
    }
  };

  const ConfirmDeleteVaccineModal = () => {
    return (
      <>
        {confirmDeleteVaccination.length > 0 && (
          <div className="fixed inset-0 h-full :w-full z-50 bg-neutral-200/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white -translate-y-32 md:translate-y-0 rounded-lg shadow-md px-10 py-10 w-full max-w-[90%] md:max-w-[450px]">
              <h1 className="text-2xl font-semibold text-center">
                Delete this vaccination ?
              </h1>
              <p className="text-sm mt-2 text-neutral-500 leading-6 text-center">
                This action is irreversible and will delete this record.
              </p>
              <div className="grid grid-cols-2 mt-7 gap-2">
                <Button
                  onPress={() =>
                    setconfirmDeleteVaccination({
                      open: false,
                      id: null,
                    })
                  }
                  radius="none"
                  className="rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  radius="none"
                  className="rounded-md bg-red-600"
                  color="danger"
                  onPress={() =>
                    handleConfirmDeleteVaccination(confirmDeleteVaccination.id)
                  }
                  isLoading={loading}
                  isDisabled={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    if (session.status == "loading" || session.status == "unauthenticated")
      return;

    FetchVaccinations(session.data.user.email).then((data) => {
      setVaccinations(data);
    });
  }, [session.status]);

  const VaccineCard = ({ vaccine }) => {
    console.log(vaccine, session.data.user.email);
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={vaccine.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <p className="text-xs ml-2 text-neutral-800">{vaccine.name}</p>
          <p
            style={{
              background: vaccine.status == "DUE" ? "#000" : "rgb(37 99 235)",
            }}
            className="text-white text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2"
          >
            {vaccine.status}
          </p>
          <Dropdown>
            <DropdownTrigger>
              <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
                <Icon height={20} icon="pepicons-pencil:dots-y" />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={
                vaccine.parentEmail != session.data.user.email
                  ? ["delete", "update"]
                  : []
              }
              onAction={(key) => {
                switch (key) {
                  case "certificate":
                    router.push(`/vaccination/${vaccine.id}/certificate`);
                    break;
                  case "delete":
                    setconfirmDeleteVaccination(vaccine.id);
                    break;
                  case "update":
                    router.push(`/vaccination/${vaccine.id}/update`);
                    break;

                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              {vaccine.status == "DONE" && (
                <DropdownItem key="certificate">Certificate</DropdownItem>
              )}
              <DropdownItem key="update">Update record</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete record
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-3">
          <Link href={`/vaccination/${vaccine.id}/certificate`}>
            <h1 className="text-base hover:text-blue-600 font-semibold text-neutral-700">
              {vaccine.vaccineName}
            </h1>
          </Link>
          <div className="flex items-center mt-3">
            <Icon icon="solar:calendar-line-duotone" />
            <p className="text-sm text-neutral-500 ml-2">
              Due on{" "}
              <span className="text-neutral-700">
                {new Date(vaccine.dueDate).toLocaleDateString("en-US", {
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
                <VaccineCard key={index} vaccine={vaccine} />
              ))}
            </div>
          )}
          {vaccinations.length == 0 && <ScheduleFirstVaccination />}
          <ConfirmDeleteVaccineModal />
        </>
      )}
    </div>
  );
}

export default VaccinationHistory;
