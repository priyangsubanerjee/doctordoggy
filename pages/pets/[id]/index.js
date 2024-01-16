/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPetById } from "@/prisma/pet";
import { Icon } from "@iconify/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Switch,
} from "@nextui-org/react";
import calculateAge from "@/helper/age";
import Link from "next/link";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { getVaccineByPetId } from "@/prisma/vaccine";
import { getPrescriptionsByPetId } from "@/prisma/prescription";
import { getPathologyReportsByPetId } from "@/prisma/pathology";
import { getDewormingsByPetId } from "@/prisma/deworming";
import toast from "react-hot-toast";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let customCode = 100;
  let pet = null;
  let isParent = false;
  let vaccinations = [];
  let prescriptions = [];
  let pathologyReports = [];
  let dewormings = [];
  if (session) {
    pet = await getPetById(context.params.id);
    pet = await JSON.parse(JSON.stringify(pet));
    if (pet) {
      vaccinations = await getVaccineByPetId(pet.id);
      vaccinations = await JSON.parse(JSON.stringify(vaccinations));
      prescriptions = await getPrescriptionsByPetId(pet.id);
      prescriptions = await JSON.parse(JSON.stringify(prescriptions));
      pathologyReports = await getPathologyReportsByPetId(pet.id);
      pathologyReports = await JSON.parse(JSON.stringify(pathologyReports));
      dewormings = await getDewormingsByPetId(pet.id);
      dewormings = await JSON.parse(JSON.stringify(dewormings));

      if (session?.user?.email == pet.parentEmail) {
        isParent = true;
      }
      if (!pet.isPublic) {
        if (pet.parentEmail !== session?.user?.email) {
          customCode = 101;
          pet = null;
        }
      }
    } else {
      customCode = 102;
    }
  }
  return {
    props: {
      session,
      pet,
      vaccinations,
      isParent,
      customCode,
      prescriptions,
      pathologyReports,
      dewormings,
    }, // will be passed to the page component as props
  };
}

function PetDashboard({
  pet,
  isParent,
  customCode,
  vaccinations,
  prescriptions,
  pathologyReports,
  dewormings,
}) {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(pet?.isPublic);
  const tabOptions = [
    "General",
    "Prescriptions",
    "Vaccinations",
    "Deworming",
    "Pathology",
  ];

  const [tabChooserOpen, setTabChooserOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await axios.post(
        "/api/pet/visibility",
        {
          id: pet?.id,
          isPublic: isPublic,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    })();
  }, [isPublic, pet?.id]);

  useEffect(() => {
    if (pet) {
      setPageLoaded(true);
    }
  }, [pet]);

  const Capitalize = (str) => {
    if (str == null) return "--";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const UpdateStatus = async (id, status) => {
    let { data } = await axios.post(
      "/api/deworming/update",
      { id, status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.deworming) {
      toast.success(data.message);
      router.reload();
    }
  };

  const DewormingCard = ({ deworming }) => {
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={deworming.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <p className="text-xs ml-2 text-neutral-500">{deworming.name}</p>
          <p
            style={{
              background: deworming.status == "DUE" ? "#000" : "rgb(37 99 235)",
            }}
            className="text-white text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2"
          >
            {deworming.status}
          </p>
          <Dropdown>
            <DropdownTrigger>
              <button className="hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
                <Icon height={20} icon="pepicons-pencil:dots-y" />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={deworming.status == "DUE" ? ["certificate"] : []}
              onAction={(key) => {
                switch (key) {
                  case "delete":
                    router.push(
                      `/deworming/${deworming.id}/delete?redirect=${window.location}`
                    );
                  case "done":
                    toast.loading("Updating status...");
                    UpdateStatus(deworming.id, "DONE");
                    break;
                  case "due":
                    toast.loading("Updating status...");
                    UpdateStatus(deworming.id, "DUE");
                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem key="certificate">Certificate</DropdownItem>
              {deworming.status == "DUE" ? (
                <DropdownItem key="done">Mark as done</DropdownItem>
              ) : (
                <DropdownItem key="due">Mark as due</DropdownItem>
              )}

              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete record
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-3">
          <h1 className="text-base font-semibold text-neutral-700">
            {deworming.medicineName}
          </h1>
          {deworming.status == "DONE" ? (
            <div className="flex items-center mt-3">
              <Icon icon="solar:calendar-line-duotone" />
              <p className="text-sm text-neutral-500 ml-2">
                Done on{" "}
                <span className="text-neutral-700">
                  {new Date(deworming.doneDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          ) : (
            <div className="flex items-center mt-3">
              <Icon icon="solar:calendar-line-duotone" />
              <p className="text-sm text-neutral-500 ml-2">
                Due on{" "}
                <span className="text-neutral-700">
                  {new Date(deworming.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          )}
          <div className="flex items-center mt-3">
            <Icon icon="icon-park-solid:medicine-bottle-one" />
            <p className="text-sm text-neutral-500 ml-2">{deworming.dosage}</p>
          </div>
        </div>
      </div>
    );
  };

  const VaccineCard = ({ vaccine }) => {
    return (
      <div className="border rounded-md p-4">
        <div className="flex items-center">
          <img
            src={vaccine.image}
            className="h-6 w-6 rounded-full object-cover"
            alt=""
          />
          <p className="text-xs ml-2 text-neutral-500">{vaccine.name}</p>
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
                (!isParent ? ["delete", "update"] : [],
                vaccine.status == "DUE" ? ["certificate"] : [])
              }
              onAction={(key) => {
                switch (key) {
                  case "certificate":
                    router.push(`/vaccination/${vaccine.id}/certificate`);
                    break;
                  case "delete":
                    router.push(
                      `/vaccination/${vaccine.id}/delete?redirect=${window.location}`
                    );
                    break;
                  case "update":
                    router.push(`/vaccination/${vaccine.id}/update`);
                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem key="certificate">Certificate</DropdownItem>

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
              disabledKeys={!isParent ? ["delete"] : []}
              onAction={(key) => {
                switch (key) {
                  case "delete":
                    window.location.href = `/prescription/${prescription.id}/delete?redirect=${window.location}`;
                    break;
                  case "certificate":
                    window.location.href = `/prescription/${prescription.id}/`;
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
              disabledKeys={!isParent ? ["delete"] : []}
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

  const TabChooser = ({}) => {
    if (tabChooserOpen) {
      return (
        <div className="fixed inset-0 z-20 bg-black/50 h-full w-full flex items-end">
          <div className="pb-6 bg-white w-full">
            <div className="p-7">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-slate-700">
                  Choose destination
                </h1>
                <button
                  onClick={() => setTabChooserOpen(false)}
                  className="h-7 w-7 rounded-full bg-neutral-100 flex items-center justify-center"
                >
                  <Icon icon="ic:round-close" />
                </button>
              </div>
              <p></p>

              <ul className="mt-6">
                {tabOptions.map((tab, index) => {
                  return (
                    <li key={index} className="mt-3">
                      <button
                        onClick={() => {
                          setSelectedTab(tab);
                          setTabChooserOpen(false);
                        }}
                        key={index}
                        className={`flex items-center justify-center h-full relative py-1 text-sm ${
                          selectedTab == tab
                            ? "text-slate-800"
                            : "text-slate-800/40"
                        }`}
                      >
                        {tab}
                        <div
                          className={`absolute inset-x-0 -bottom-[1px] h-[1px] ${
                            selectedTab == tab ? "bg-black" : "bg-black/0"
                          }`}
                        ></div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  };

  const Tabs = ({}) => {
    return (
      <>
        <div className="hidden lg:flex items-center justify-center space-x-8 h-16 border-b mt-8">
          {tabOptions.map((tab, index) => {
            return (
              <button
                onClick={() => setSelectedTab(tab)}
                key={index}
                className={`flex items-center justify-center h-full relative px-4 text-sm ${
                  selectedTab == tab ? "text-slate-800" : "text-slate-800/40"
                }`}
              >
                {tab}
                <div
                  className={`absolute inset-x-0 -bottom-[1px] h-[1px] ${
                    selectedTab == tab ? "bg-black" : "bg-black/0"
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
        <div className="flex lg:hidden items-center justify-between px-10 mt-10">
          <button
            onClick={() => {
              let index = tabOptions.indexOf(selectedTab);
              if (index == 0) {
                index = tabOptions.length - 1;
              } else {
                index--;
              }
              setSelectedTab(tabOptions[index]);
            }}
            className="text-neutral-500"
          >
            <Icon height={20} icon="uiw:left" />
          </button>
          <p
            onClick={() => setTabChooserOpen(true)}
            className="text-sm w-fit bg-neutral-100 px-5 py-1 rounded-full text-neutral-700 cursor-pointer"
          >
            {selectedTab}
          </p>
          <button
            onClick={() => {
              let index = tabOptions.indexOf(selectedTab);
              if (index == tabOptions.length - 1) {
                index = 0;
              } else {
                index++;
              }
              setSelectedTab(tabOptions[index]);
            }}
            className="text-neutral-500"
          >
            <Icon height={20} icon="uiw:right" />
          </button>
        </div>
      </>
    );
  };

  const ActiveTab = ({}) => {
    switch (selectedTab) {
      case "General":
        return <GeneralTab />;
      case "Vaccinations":
        return <VaccinationTab />;
      case "Prescriptions":
        return <PrescriptionTab />;
      case "Deworming":
        return <DewormingTab />;
      case "Pathology":
        return <PathologyTab />;
      default:
        return <GeneralTab />;
    }
  };

  const GeneralTab = ({}) => {
    return (
      <div className="max-w-3xl mx-3 lg:mx-auto pb-16 mt-10 lg:mt-7 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3">
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Name
            </span>
            <p>{pet?.name}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Species
            </span>
            <p>{Capitalize(pet?.species)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Breed
            </span>
            <p>{Capitalize(pet?.breed)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Age
            </span>
            <p>{calculateAge(pet?.dateOfBirth)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Colour
            </span>
            <p>{Capitalize(pet?.color)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Sex
            </span>
            <p>{Capitalize(pet?.sex)}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Date of birth
            </span>
            <p>{Capitalize(new Date(pet?.dateOfBirth).toDateString())}</p>
          </div>
          <div className="border h-16 rounded-md relative flex items-center px-4">
            <span className="absolute top-0 text-neutral-400 -translate-y-1/2 left-2 text-xs px-2 bg-white">
              Body weight
            </span>
            <p>{Capitalize(pet?.bodyWeight)} Kg</p>
          </div>
        </div>

        {isParent && (
          <>
            <div className="flex items-center justify-between mt-10 border rounded-md p-5">
              <div>
                <p className="text-neutral-800 text-base">Public profile?</p>
                <Link
                  href="/pets/register"
                  className="flex items-center text-blue-600 space-x-2 text-xs hover:underline mt-1"
                >
                  <span>Learn about public profiles</span>
                  <span className="translate-y-[1px]">
                    <Icon icon="formkit:right" />
                  </span>
                </Link>
              </div>
              <Switch
                isSelected={isPublic}
                onValueChange={() => setIsPublic(!isPublic)}
              />
            </div>
            <div className="p-5 rounded-md mt-24 border">
              <h1>Edit zone</h1>
              <p className="text-xs text-neutral-500 mt-2">
                Edit pet information
              </p>
              <Button
                radius="full"
                onPress={() => Router.push(`/pets/${pet?.id}/edit`)}
                className="px-6 py-2 bg-neutral-800 text-sm text-white mt-5"
              >
                Edit
              </Button>
            </div>
            <div className="p-5 rounded-md mt-5 border">
              <h1>Danger zone</h1>
              <p className="text-xs text-neutral-500 mt-2">
                This action is irreversible & will delete this pet completely.
              </p>
              <Button
                onPress={() => Router.push(`/pets/${pet?.id}/delete`)}
                radius="full"
                className="px-6 py-2 bg-red-600 text-sm text-white mt-5"
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  const VaccinationTab = ({}) => {
    return (
      <>
        <div className="max-w-3xl grid grid-cols-1 gap-2 lg:grid-cols-2 mx-5 lg:mx-auto pb-16 mt-10 lg:mt-7">
          {vaccinations.map((vaccine, index) => (
            <VaccineCard key={index} vaccine={vaccine} />
          ))}
        </div>
        {vaccinations.length == 0 && (
          <div className="max-w-3xl lg:mx-auto flex flex-col items-center justify-center">
            <p className="text-sm text-neutral-500">
              No vaccinations were scheduled for {pet.name}
            </p>
            {isParent && (
              <Button
                onPress={() => (window.location.href = "/vaccination/schedule")}
                className="rounded-md bg-black text-white mt-6 text-sm"
                radius="none"
              >
                Schedule vaccination
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  const PrescriptionTab = ({}) => {
    return (
      <>
        <div className="max-w-3xl grid grid-cols-1 gap-2 lg:grid-cols-2 mx-5 lg:mx-auto pb-16 mt-10 lg:mt-7">
          {prescriptions.reverse().map((prescription, index) => (
            <PrescriptionCard key={index} prescription={prescription} />
          ))}
        </div>

        {prescriptions.length == 0 && (
          <div className="max-w-3xl lg:mx-auto flex flex-col items-center justify-center">
            <p className="text-sm text-neutral-500">
              No prescriptions were uploaded for {pet.name}
            </p>
            {isParent && (
              <Button
                onPress={() => (window.location.href = "/prescription/upload")}
                className="rounded-md bg-black text-white mt-6 text-sm"
                radius="none"
              >
                Upload prescription
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  const DewormingTab = ({}) => {
    return (
      <>
        <div className="max-w-3xl grid grid-cols-1 gap-2 lg:grid-cols-2 mx-5 lg:mx-auto pb-16 mt-10 lg:mt-7">
          {dewormings.map((report, index) => (
            <DewormingCard key={index} deworming={report} />
          ))}
        </div>

        {dewormings.length == 0 && (
          <div className="max-w-3xl lg:mx-auto flex flex-col items-center justify-center">
            <p className="text-sm text-neutral-500">
              No dewormings were scheduled for {pet.name}
            </p>
            {isParent && (
              <Button
                onPress={() => (window.location.href = "/deworming/schedule")}
                className="rounded-md bg-black text-white mt-6 text-sm"
                radius="none"
              >
                Schedule deworming
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  const PathologyTab = ({}) => {
    return (
      <>
        <div className="max-w-3xl grid grid-cols-1 gap-2 lg:grid-cols-2 mx-5 lg:mx-auto pb-16 mt-10 lg:mt-7">
          {pathologyReports.map((report, index) => (
            <PathologyCard key={index} report={report} />
          ))}
        </div>

        {pathologyReports.length == 0 && (
          <div className="max-w-3xl lg:mx-auto flex flex-col items-center justify-center">
            <p className="text-sm text-neutral-500">
              No reports were uploaded for {pet.name}
            </p>
            {isParent && (
              <Button
                onPress={() => {
                  router.push(`/pathology/upload?redirect=${window.location}`);
                }}
                className="rounded-md bg-black text-white mt-6 text-sm"
                radius="none"
              >
                Upload pathology report
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  const QuickAction = ({}) => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <button className="bg-white hover:bg-neutral-200 h-8 w-8 flex items-center justify-center rounded-full outline-none">
            <Icon height={20} icon="ic:round-add" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            switch (key) {
              case "sd_v":
                window.location.href = `/vaccination/schedule?redirect=${window.location}`;
                break;
              case "up_p":
                window.location.href = `/prescription/upload?redirect=${window.location}`;
                break;
              case "up_path":
                window.location.href = `/pathology/upload?redirect=${window.location}`;
                break;
              case "up_de":
                window.location.href = `/deworming/schedule?redirect=${window.location}`;
                break;
              default:
                break;
            }
          }}
          aria-label="Static Actions"
        >
          <DropdownItem key="sd_v">Schedule vaccination</DropdownItem>
          <DropdownItem key="up_p">Upload prescription</DropdownItem>
          <DropdownItem key="up_de">Schedule deworming</DropdownItem>
          <DropdownItem key="up_path">Upload pathology report</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  if (pageLoaded) {
    if (customCode == 100) {
      return (
        <div className="pb-44">
          <div className="relative">
            <div className="h-48 lg:h-80 w-full overflow-hidden relative">
              <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-white z-10"></div>
              <img
                src={pet.image}
                className="object-cover w-full h-full blur-2xl opacity-50"
                alt=""
              />
            </div>
            <div className="absolute z-10 -bottom-12 lg:-bottom-8 left-1/2 -translate-x-1/2">
              <div className="relative">
                {isParent && (
                  <div className="absolute bottom-3 right-4">
                    <QuickAction />
                  </div>
                )}
                <img
                  src={pet.image}
                  className="h-36 lg:h-56 w-36 lg:w-56 rounded-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-center mt-20 lg:mt-16">
            {pet.name.split(" ")[0]}&apos;s{" "}
            <span className="opacity-60">
              {pet.sex == "male" ? "Palace" : "Castle"}
            </span>
          </h1>
          <p className="text-center mt-2 text-sm text-neutral-700">
            Goodest {pet.sex == "male" ? "boy" : "girl"} in the town !
          </p>
          <Tabs />
          <TabChooser />
          <ActiveTab />
        </div>
      );
    } else if (customCode == 101) {
      return (
        <div>
          <h1 className="text-3xl font-semibold text-center mt-20 lg:mt-16">
            This pet is currently private. Please ask the owner to make it
            public.
          </h1>
        </div>
      );
    } else if (customCode == 102) {
    }
  } else {
    return (
      <>
        <div className="mt-20">
          <div className="flex items-center justify-center space-x-2 mt-4 text-sm">
            <p>This page is currently loading, please wait.</p>
          </div>
          <div className="flex flex-col items-center justify-center mt-16">
            <Spinner size="lg" color="primary" />
          </div>
        </div>
      </>
    );
  }
}

export default PetDashboard;
