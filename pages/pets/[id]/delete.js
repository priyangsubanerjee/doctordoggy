/* eslint-disable @next/next/no-img-element */
import React from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getPetById } from "@/prisma/pet";
import { Button } from "@nextui-org/react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let pet = null;
  let isParent = false;
  if (session) {
    pet = await getPetById(context.params.id);
    pet = await JSON.parse(JSON.stringify(pet));
    if (pet) {
      if (session?.user?.email == pet.parentEmail) {
        isParent = true;
      }
      if (!pet.isPublic) {
        if (pet.parentEmail !== session?.user?.email) {
          pet = null;
        }
      }
    }
  }
  return {
    props: { session, pet, isParent }, // will be passed to the page component as props
  };
}

function Delete({ session, pet, isParent }) {
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  return (
    <div>
      <div className="flex items-center justify-center mt-16">
        <img
          src={pet?.image}
          className="h-36 w-36 rounded-full object-cover"
          alt=""
        />
      </div>
      <h1 className="text-center text-xl font-semibold text-neutral-800 mt-10">
        Are you sure you want to delete {pet?.name}&apos;s profile?
      </h1>
      <p className="text-sm text-neutral-500 text-center mt-3">
        This action cannot be undone. This will permanently delete the profile &
        all associated data.
      </p>
      <div className="flex items-center justify-center space-x-4 mt-6">
        <Button
          isDisabled={deleting}
          onPress={() => (window.location.href = `/pets/${pet.id}`)}
          radius="none"
          className="w-44 rounded-md"
        >
          Cancel
        </Button>
        <Button
          isLoading={deleting}
          onPress={async () => {
            if (isParent) {
              setDeleting(true);
              try {
                let deleteRequest = await axios.post(
                  "/api/pet/delete",
                  {
                    id: pet.id,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (deleteRequest.data.success) {
                  setDeleting(false);
                  toast.success("Pet deleted successfully");
                  router.push("/pets");
                } else {
                  setDeleting(false);
                  toast.error(deleteRequest.data.message);
                }
              } catch (error) {
                toast.error("Something went wrong");
              }
              setDeleting(false);
            }
          }}
          radius="none"
          className="w-44 rounded-md bg-rose-600 text-white"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default Delete;
