/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import calculateAge from "@/helper/age";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  Spinner,
  Switch,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import VaccineCard from "@/components/Cards/VaccineCard";
import DewormingCard from "@/components/Cards/DewormingCard";
import PrescriptionCard from "@/components/Cards/PrescriptionCard";
import PathologyCard from "@/components/Cards/PathologyCard";

function Profile() {
  const session = useSession();
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [shareMenuOpen, setShareMenuOpen] = React.useState(false);
  const [pet, setPet] = React.useState({
    name: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [vaccinations, setVaccinations] = React.useState([]);
  const [prescriptions, setPrescriptions] = React.useState([]);
  const [dewormings, setDewormings] = React.useState([]);
  const [pathologyReports, setPathologyReports] = React.useState([]);
  const [isPublic, setIsPublic] = React.useState(false);
  const [isParent, setIsParent] = React.useState(false);
  const [isAllowed, setIsAllowed] = React.useState(false);
  const [petDoesNotExist, setPetDoesNotExist] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("General");
  const [tabChooserOpen, setTabChooserOpen] = React.useState(false);
  const [confirmDelete, setconfirmDelete] = React.useState(false);

  const [tabOptions, setTabOptions] = React.useState([
    "General",
    "Vaccinations",
    "Prescriptions",
    "Deworming",
    "Pathology",
  ]);

  const router = useRouter();

  const LPD = async () => {
    let petRequest = await axios.post(
      "/api/pet/getbyid",
      {
        id: router.query.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    petRequest.data.success ? setPet(petRequest.data.pet) : setPet({});
    if (petRequest.data.pet?.isPublic) {
      setIsPublic(true);
    }
    if (petRequest.data.pet?.parentEmail == session.data.user.email) {
      setIsParent(true);
    }
    setPageLoaded(true);
    let vaccinationRequest = await axios.post(
      "/api/vaccine/getByPetId",
      {
        id: router.query.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    vaccinationRequest.data.success
      ? setVaccinations(vaccinationRequest.data.vaccines)
      : setVaccinations([]);
    let dewormingRequest = await axios.post(
      "/api/deworming/getByPetId",
      {
        id: router.query.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dewormingRequest.data.success
      ? setDewormings(dewormingRequest.data.dewormings)
      : setDewormings([]);
    let prescriptionRequest = await axios.post(
      "/api/prescription/getByPetId",
      {
        id: router.query.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    prescriptionRequest.data.success
      ? setPrescriptions(prescriptionRequest.data.prescriptions)
      : setPrescriptions([]);
    let pathologyRequest = await axios.post(
      "/api/pathology/getByPetId",
      {
        id: router.query.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    pathologyRequest.data.success
      ? setPathologyReports(pathologyRequest.data.reports)
      : setPathologyReports([]);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      (async () => {
        let petExistsRequest = await axios.post(
          "/api/pet/exists",
          {
            id: router.query.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!petExistsRequest.data.exists) {
          setPetDoesNotExist(true);
          setPageLoaded(true);
        } else {
          let petProfileVisibilityRequest = await axios.post(
            "/api/pet/read_vis",
            {
              id: router.query.id,
              email: session.data.user.email,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (petProfileVisibilityRequest.data.success) {
            if (!petProfileVisibilityRequest.data.isParent) {
              if (petProfileVisibilityRequest.data.isPublic) {
                setIsAllowed(true);
                LPD();
              } else {
                setPageLoaded(true);
                setIsAllowed(false);
              }
            } else {
              setIsAllowed(true);
              LPD();
            }
          }
        }
      })();
    }
  }, [router.query.id, session.status]);

  const UPV = async () => {
    toast.loading("Updating profile visibility...");
    setIsPublic(!isPublic);
    await axios.post(
      "/api/pet/visibility",
      {
        id: pet?.id,
        isPublic: !isPublic,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.remove();
    toast.success("Profile visibility updated");
  };

  const handleConfirmDeletePet = async () => {
    setLoading(true);
    toast.loading("Deleting pet...");
    try {
      let deleteRequest = await axios.post(
        "/api/pet/delete",
        {
          id: router.query.id,
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
        router.push("/pets");
      } else {
        toast.error(deleteRequest.data.message);
        setLoading(false);
        setconfirmDelete(false);
      }
    } catch (error) {
      toast.remove();
      toast.error(error.message);
      setLoading(false);
      setconfirmDelete(false);
    }
  };

  const Capitalize = (str) => {
    if (str == null || str == "" || str == undefined) return "--";
    return str.charAt(0).toUpperCase() + str.slice(1);
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

  const TabsCusom = ({}) => {
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
      <div className="max-w-3xl px-3 mx-auto pb-16 mt-10 lg:mt-7 ">
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
            onValueChange={() => {
              UPV();
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-3 mt-6">
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
      </div>
    );
  };

  const VaccinationTab = ({}) => {
    return (
      <>
        <div className="max-w-3xl grid grid-cols-1 gap-2 md:grid-cols-2 px-3 mx-auto pb-16 mt-10 lg:mt-7">
          {vaccinations.map((vaccine, index) => (
            <VaccineCard
              key={index}
              vaccine={vaccine}
              setVaccinations={setVaccinations}
              vaccinations={vaccinations}
            />
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
        <div className="max-w-3xl grid grid-cols-1 gap-2 md:grid-cols-2 px-3 mx-auto pb-16 mt-10 lg:mt-7">
          {prescriptions.reverse().map((prescription, index) => (
            <PrescriptionCard
              prescriptions={prescriptions}
              setPrescriptions={setPrescriptions}
              key={index}
              prescription={prescription}
            />
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
        <div className="max-w-3xl grid grid-cols-1 gap-2 md:grid-cols-2 px-3 mx-auto pb-16 mt-10 lg:mt-7">
          {dewormings.map((report, index) => (
            <DewormingCard
              key={index}
              deworming={report}
              dewormings={dewormings}
              setDewormings={setDewormings}
            />
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
        <div className="max-w-3xl grid grid-cols-1 gap-2 md:grid-cols-2 px-3 mx-auto pb-16 mt-10 lg:mt-7">
          {pathologyReports.map((report, index) => (
            <PathologyCard
              key={index}
              pathology={report}
              pathologies={pathologyReports}
              setPathologies={setPathologyReports}
            />
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
                router.push(
                  `/vaccination/schedule?redirect=${window.location}`
                );
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

  const ShareProfile = async () => {
    if (navigator.share) {
      try {
        navigator.share({
          title: `Check out ${pet.name}'s profile on Doctor Doggy: https://doctordoggy.vet/pets/${pet.id} & stay updated with ${pet.name}'s health & wellness`,
          text: `https://doctordoggy.vet/pets/${pet.id}`,
        });
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `https://doctordoggy.vet/pets/${pet.id}`
        );
        toast.success("Link copied to clipboard");
      } catch (error) {}
    }
  };

  const ConfirmDeleteModal = () => {
    return (
      <>
        {confirmDelete && (
          <div className="fixed inset-0 h-full :w-full z-50 bg-slate-200/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white -translate-y-20 md:translate-y-0 rounded-md shadow-md px-5 md:px-10 py-7 h-fit w-full max-w-[95%] md:max-w-[450px]">
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 text-red-700 bg-red-50 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="font-semibold text-xl text-center mt-4">
                Delete this pet ?
              </h1>
              <p className="text-xs text-neutral-500 text-center leading-6 mt-2">
                Are you sure you want to delete this pet? This is an
                irreversible action and will delete this record permanently.
              </p>
              <div className="grid grid-cols-2 mt-7 gap-2">
                <Button
                  onPress={() => setconfirmDelete(false)}
                  radius="none"
                  className="rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  radius="none"
                  className="rounded-md bg-red-600"
                  color="danger"
                  onPress={() => handleConfirmDelete()}
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

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      toast.loading("Deleting pathology...");
      let deleteRequest = await axios.post(
        "/api/pet/delete",
        {
          id: router.query.id,
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
        setLoading(false);
        setconfirmDelete(false);
        router.push("/pets");
      } else {
        toast.error(deleteRequest.data.message);
        setLoading(false);
        setconfirmDelete(false);
      }
    } catch (error) {
      toast.remove();
      toast.error(error.message);
      setLoading(false);
      setconfirmDelete(false);
    }
  };

  return (
    <div className="pb-20">
      {pageLoaded ? (
        <>
          {petDoesNotExist ? (
            <div className="flex flex-col items-center justify-center mt-16">
              <Icon icon="teenyicons:lock-solid" height={24} />
              <h2 className="text-2xl font-semibold mt-5">Profile not found</h2>
              <p className="text-sm text-neutral-500 mt-3">
                This pet&apos;s profile does not exist or has been deleted. If
                you think this is a mistake, please contact us.
              </p>
            </div>
          ) : (
            <>
              {isAllowed ? (
                <>
                  <div className="relative">
                    <div className="h-48 lg:h-80 w-full overflow-hidden relative">
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-white z-10"></div>
                      <img
                        src={pet.image}
                        className="object-cover w-full h-full blur-2xl opacity-50"
                        alt=""
                      />
                    </div>
                    <div className="absolute z-10 -bottom-0 lg:bottom-0 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        {isParent && (
                          <div className="absolute bottom-2 right-0 lg:bottom-3 lg:right-4">
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
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mt-5 lg:mt-6">
                    {pet.name.split(" ")[0]}&apos;s{" "}
                    <span className="opacity-60">
                      {pet.sex == "male" ? "Palace" : "Castle"}
                    </span>
                  </h1>
                  <p className="text-center mt-2 text-sm text-neutral-700">
                    Goodest {pet.sex == "male" ? "boy" : "girl"} in the town !
                  </p>
                  <div className="flex items-center justify-center px-10 gap-3 mt-8 max-w-sm mx-auto">
                    <Tooltip delay={500} content="Share pet profile">
                      <Button
                        onPress={() => setShareMenuOpen(true)}
                        isIconOnly
                        className="h-12 w-12 border text-neutral-600 hover:text-blue-600 bg-transparent rounded-md flex items-center justify-center"
                      >
                        <Icon height={26} icon="basil:forward-solid" />
                      </Button>
                    </Tooltip>
                    {isParent && (
                      <>
                        <Tooltip delay={500} content="Edit pet profile">
                          <Button
                            onPress={() => router.push(`/pets/${pet.id}/edit`)}
                            isIconOnly
                            className="h-12 w-12 border text-neutral-600 hover:text-blue-600 bg-transparent rounded-md flex items-center justify-center"
                          >
                            <Icon height={22} icon="basil:edit-outline" />
                          </Button>
                        </Tooltip>
                        <Tooltip delay={500} content="Delete pet profile">
                          <Button
                            onPress={() => setconfirmDelete(true)}
                            isIconOnly
                            className="h-12 w-12 border text-neutral-600 hover:text-red-600 bg-transparent rounded-md flex items-center justify-center"
                          >
                            <Icon height={22} icon="basil:trash-solid" />
                          </Button>
                        </Tooltip>
                      </>
                    )}
                  </div>
                  {shareMenuOpen && (
                    <div className="fixed inset-0 h-full w-full bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-[97%] md:w-[500px] max-w-[500px] bg-white shadow-lg rounded-lg relative">
                        <button
                          onClick={() => setShareMenuOpen(false)}
                          className="absolute right-5 top-5 h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center"
                        >
                          <Icon icon="mingcute:close-fill" height={12} />
                        </button>
                        <div className="px-7 py-6">
                          <h1 className="text-xl font-semibold">
                            Share profile
                          </h1>
                          <p className="text-sm text-neutral-500 mt-2 tracking-wide">
                            Please make sure public profile is enabled.
                          </p>
                          <div className="mt-5 grid grid-cols-2 gap-2">
                            <div className="flex flex-col cursor-pointer items-center justify-center rounded-md bg-neutral-50 hover:bg-neutral-100 p-2">
                              <Icon
                                height={28}
                                icon="fluent:arrow-download-20-filled"
                              />
                              <p className="text-xs text-neutral-500 mt-2">
                                Save as pdf
                              </p>
                            </div>
                            <div
                              onClick={() => ShareProfile()}
                              className="flex flex-col cursor-pointer items-center justify-center rounded-md bg-neutral-50 hover:bg-neutral-100 p-2"
                            >
                              <Icon height={28} icon="system-uicons:forward" />
                              <p className="text-xs text-neutral-500 mt-2">
                                Share public link
                              </p>
                            </div>
                            {/* <div className="flex flex-col cursor-pointer items-center justify-center rounded-md bg-neutral-50 hover:bg-neutral-100 p-2">
                            <Icon height={28} icon="maki:doctor" />
                            <p className="text-xs text-neutral-500 mt-2">
                              Share with doctor
                            </p>
                          </div> */}
                          </div>
                          <div className="mt-5">
                            <p className="text-xs text-neutral-500 mt-2 leading-6">
                              <span className="text-neutral-700">Note:</span>{" "}
                              The pdf will include all the information about
                              your pet including vaccinations, dewormings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <div className="overflow-x-auto px-7 mt-7">
                    <div className="w-fit mx-auto">
                      <Tabs
                        s
                        selectedKey={selectedTab}
                        onSelectionChange={setSelectedTab}
                      >
                        {tabOptions.map((tab, index) => {
                          return <Tab key={tab} title={tab} />;
                        })}
                      </Tabs>
                    </div>
                  </div> */}
                  <TabsCusom />
                  <TabChooser />
                  <ActiveTab />
                  <ConfirmDeleteModal />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center mt-16">
                  <Icon icon="teenyicons:lock-solid" height={24} />
                  <h2 className="text-2xl font-semibold mt-5">
                    Profile not public
                  </h2>
                  <p className="text-sm text-neutral-500 mt-3">
                    This pet&apos;s profile is not public yet, ask the owner to
                    make it public.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="relative flex items-center justify-center py-40">
          <Spinner color="default" size="lg" />
        </div>
      )}
    </div>
  );
}

export default Profile;
