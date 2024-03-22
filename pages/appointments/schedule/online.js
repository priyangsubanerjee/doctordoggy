/* eslint-disable react-hooks/exhaustive-deps */
import RegisterFirstPet from "@/components/FirstAction/RegisterFirstPet";
import GlobalStates from "@/context/GlobalState";
import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";

function Schedule() {
  const session = useSession();
  const router = useRouter();
  const { updatedModal } = useContext(GlobalStates);
  const [pets, setPets] = React.useState([]);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [meetProps, setMeetProps] = React.useState({
    petId: null,
    doctorId: null,
    participants: [],
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    reason: "",
  });

  const doctorsStatic = [
    {
      id: "1as8qexi8nxn",
      name: "Dr. Mrinal Kanti Dey",
      specialization: "General Physician",
    },
    {
      id: "do0p9quwjhd83xb8",
      name: "Dr. Souradeep Adhikary",
      specialization: "General Physician",
    },
  ];

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/signin?next=/pets");
      return;
    } else if (session.status == "loading") {
      return;
    } else if (session.status == "authenticated") {
      (async () => {
        let petsRequest = await axios.post(
          "/api/pet/get",
          {
            email: session?.data?.user?.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (petsRequest.data.success) {
          setPets(petsRequest.data.pets);
          setPageLoaded(true);
        } else {
          toast.error(petsRequest.data.message);
        }
      })();
    }
  }, [session.status]);

  const handleSubmit = async () => {
    updatedModal(true, "Scheduling appointment");
    let payload = {
      petId: meetProps.petId,
      doctorId: meetProps.doctorId,
      parentEmail: session.data.user.email,
      date: meetProps.date,
      time: meetProps.time,
      reason: meetProps.reason,
    };

    let scheduleRequest = await axios.post(
      "/api/appointments/online/create",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (scheduleRequest.data.success) {
      updatedModal(false, "Scheduling appointment");
      toast.success(scheduleRequest.data.message);
      router.push("/appointments");
    } else {
      updatedModal(false, "Scheduling appointment");
      toast.error(scheduleRequest.data.message);
    }
  };

  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Schedule online appointment
      </h1>
      <p className="text-sm text-neutral-500 text-center mt-3">
        Doctor at your home, at your time - its that simple!
      </p>

      {pageLoaded ? (
        <>
          {pets.length == 0 ? (
            <RegisterFirstPet />
          ) : (
            <div className="max-w-4xl px-6 lg:px-0 mx-auto h-12 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  selectedKeys={meetProps.petId && [meetProps.petId]}
                  onChange={(e) => {
                    setMeetProps({
                      ...meetProps,
                      petId: e.target.value,
                    });
                  }}
                  radius="none"
                  label="Choose pet"
                >
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.name}>
                      {pet.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  radius="none"
                  selectedKeys={meetProps.doctorId && [meetProps.doctorId]}
                  onChange={(e) => {
                    setMeetProps({
                      ...meetProps,
                      doctorId: e.target.value,
                    });
                  }}
                  label="Choose doctor"
                >
                  {doctorsStatic.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Date"
                  value={meetProps.date}
                  onChange={(e) => {
                    setMeetProps({ ...meetProps, date: e.target.value });
                  }}
                  type="date"
                  radius="none"
                  classNames={{
                    input: "text-white w-fit md:w-full",
                  }}
                />
                <Input
                  classNames={{
                    input: "text-white w-fit md:w-full",
                  }}
                  value={meetProps.time}
                  onChange={(e) => {
                    setMeetProps({ ...meetProps, time: e.target.value });
                  }}
                  label="Time"
                  type="time"
                  radius="none"
                />
                <Textarea
                  className="md:col-span-2"
                  label="Reason for appointment (optional)"
                  radius="none"
                  onChange={(e) => {
                    setMeetProps({ ...meetProps, reason: e.target.value });
                  }}
                  value={meetProps.reason}
                />
              </div>
              <div className="md:flex items-center justify-between mt-10">
                <div className="flex items-center space-x-1 shrink-0">
                  <Icon
                    icon="lets-icons:time-atack-light"
                    width="24"
                    height="24"
                  />
                  <p className="text-sm text-neutral-500">
                    You appointment is capped to 15 minutes
                  </p>
                </div>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="px-10 w-full mt-10 md:mt-0 md:w-fit bg-black text-white rounded-md"
                  radius="none"
                >
                  Submit request
                </Button>
              </div>

              <div className="mt-24">
                <h3 className="text-base font-semibold text-neutral-700">
                  <Icon
                    icon="mingcute:love-line"
                    width="28"
                    height="28"
                    className="inline-block -translate-y-[2px] mr-2"
                  />
                  Things to remember
                </h3>

                <ul className="mt-4 space-y-3">
                  <li className="flex items-start space-x-2">
                    <Icon icon="bx:bx-check" width="24" height="24" />
                    <p className="text-sm text-neutral-500">
                      Please make sure to be available at the time of
                      appointment
                    </p>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon icon="bx:bx-check" width="24" height="24" />
                    <p className="text-sm text-neutral-500">
                      You cannot delete an appointment, but cancel it if needed.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-32">
          <Spinner size="lg" color="primary" />
        </div>
      )}
    </div>
  );
}

export default Schedule;
