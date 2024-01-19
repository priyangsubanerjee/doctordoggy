/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import React from "react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import toast from "react-hot-toast";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { getPathologyReportById } from "@/prisma/pathology";
import { getDewormingById } from "@/prisma/deworming";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let record = null;
  let isParent = false;
  if (session) {
    let { success, deworming } = await getDewormingById(context.params.did);
    record = success ? await JSON.parse(JSON.stringify(deworming)) : null;
    if (record) {
      if (session?.user?.email == record.parentEmail) {
        isParent = true;
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/deworming",
          },
        };
      }
    }
  }
  return {
    props: { session, record, isParent }, // will be passed to the page component as props
  };
}

function DeleteRecord({ record, isParent }) {
  console.log(record);
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  return (
    <div className="px-5 lg:px-0">
      <div className="w-16 h-16 mx-auto bg-red-50 rounded-lg mt-16 flex items-center justify-center">
        <Icon icon="mdi-light:delete" height={30} className="text-red-500" />
      </div>
      <h1 className="text-center text-xl font-semibold text-neutral-800 mt-5">
        Are you sure you want to delete this record?
      </h1>
      <p className="text-sm text-neutral-500 text-center mt-3 leading-6">
        This action cannot be undone. This will permanently delete the profile &
        all associated data.
      </p>
      <div className="flex items-center justify-center space-x-4 mt-6">
        <Button
          isDisabled={deleting}
          onPress={() =>
            (window.location.href = router.query.redirect
              ? router.query.redirect
              : `/deworming`)
          }
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
                  "/api/deworming/delete",
                  {
                    id: record.id,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (deleteRequest.data.success) {
                  toast.success(deleteRequest.data.message);
                  router.push(
                    router.query.redirect ? router.query.redirect : "/deworming"
                  );
                } else {
                  setDeleting(false);
                  toast.error(deleteRequest.data.message);
                }
              } catch (error) {
                setDeleting(false);
                toast.error("Something went wrong");
              }
            } else {
              toast.error("You are not authorized to perform this action");
            }
          }}
          radius="none"
          className="w-44 rounded-md bg-red-500 text-white"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default DeleteRecord;
