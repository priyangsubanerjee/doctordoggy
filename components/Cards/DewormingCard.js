/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

function DewormingCard({ deworming, dewormings, setDewormings }) {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = React.useState(false);
  const [confirmDelete, setconfirmDelete] = React.useState(false);

  const UDS = async (id, status) => {
    toast.loading("Updating deworming status...");
    let updateRequest = await axios.post(
      "/api/deworming/update",
      { id, status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.remove();
    if (updateRequest.data.success) {
      toast.success(updateRequest.data.message);
      setDewormings(
        dewormings.map((d) => {
          if (d.id == id) {
            d.status = status == "DONE" ? "DONE" : "DUE";
            d.doneDate = status == "DONE" ? new Date().toISOString() : null;
          }
          return d;
        })
      );
    } else {
      toast.error(updateRequest.data.message);
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
                Delete this deworming ?
              </h1>
              <p className="text-xs text-neutral-500 text-center leading-6 mt-2">
                Are you sure you want to delete this deworming record? This is
                an irreversible action and will delete this record permanently.
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
      toast.loading("Deleting deworming record...");
      let deleteRequest = await axios.post(
        "/api/deworming/delete",
        {
          id: deworming.id,
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
        setDewormings(dewormings.filter((d) => d.id != deworming.id));
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
          className="text-white bg-neutral-800 text-xs px-4 py-1 rounded-full font-medium ml-auto mr-2"
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
                  setconfirmDelete(true);
                  break;
                case "done":
                  UDS(deworming.id, "DONE");
                  break;
                case "due":
                  UDS(deworming.id, "DUE");
                  break;
                default:
                  break;
              }
            }}
            aria-label="Static Actions"
          >
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
      <ConfirmDeleteModal />
    </div>
  );
}

export default DewormingCard;
