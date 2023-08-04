/* eslint-disable react-hooks/exhaustive-deps */
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { encrypt } from "@/helper/crypto";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { toast } from "react-hot-toast";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

function Profile() {
  const session = useSession();
  const [mode, setMode] = useState("view");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  const retrieveUser = async () => {
    if (getCookie("user")) {
      var token = getCookie("user");
      var res = await fetch("/api/user/decode", {
        method: "POST",
        body: JSON.stringify({
          token: token,
        }),
      });
      var data = await res.json();
      if (data.success) {
        setPhone(data.user.phone);
        setPincode(data.user.pincode);
        setAddress(data.user.address);
      }
      let resUpdate = await fetch("/api/user/updateLocal", {
        method: "POST",
        body: JSON.stringify({
          email: session.data.user.email,
        }),
      });
      let dataUpdate = await resUpdate.json();
      if (dataUpdate.success) {
        let resSaveCookie = await fetch("/api/user/saveToCookie", {
          method: "POST",
          body: JSON.stringify({
            name: session.data.user.name,
            email: session.data.user.email,
            phone: dataUpdate.user.phone,
            pincode: dataUpdate.user.pincode,
            address: dataUpdate.user.address,
          }),
        });
        let dataSaveCookie = await resSaveCookie.json();
        if (dataSaveCookie.success) {
          setPhone(dataUpdate.user.phone);
          setPincode(dataUpdate.user.pincode);
          setAddress(dataUpdate.user.address);
        }
      }
    } else {
      router.push("/profile/setup");
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  return (
    <div className="min-h-screen h-fit px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
            Your <span className="text-pink-500">account</span>
          </h2>
        </div>
        <p className="text-[11px] lg:text-xs text-neutral-500 mt-1">
          Manage your account preferences.
        </p>
      </div>

      <div className="mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 lg:max-w-4xl gap-4 lg:gap-6">
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Name •{" "}
            <span className="text-blue-400 font-normal">
              You can&apos;t change your name
            </span>
          </label>
          <input
            type="text"
            readOnly={true}
            className="px-4 py-3 border w-full mt-2 opacity-50 outline-none rounded"
            value={session.data.user.name}
            placeholder="Your name"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Email •{" "}
            <span className="text-blue-400 font-normal">
              You can&apos;t change your email
            </span>
          </label>
          <input
            type="text"
            readOnly={true}
            className="px-4 py-3 border w-full mt-2 rounded-none opacity-50 outline-none"
            value={session.data.user.email}
            placeholder="Your name"
            name=""
            id=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Phone <span className="text-red-500 ml-1 text-xl">*</span>
          </label>
          <input
            id="phoneInput"
            type="tel"
            readOnly={true}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-3 border w-full mt-2  outline-none rounded"
            placeholder="Phone number"
            name=""
          />
        </div>
        <div>
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Pincode <span className="text-red-500 ml-1 text-xl">*</span>
          </label>
          <input
            type="tel"
            readOnly={true}
            className="px-4 py-3 border w-full mt-2 outline-none rounded"
            placeholder="71XXXXX"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div className="lg:col-span-2">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Address
          </label>
          <textarea
            name=""
            readOnly={true}
            className="resize-none w-full h-full border px-4 py-3 mt-2 outline-none rounded"
            placeholder="Your address here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id=""
          ></textarea>
        </div>
      </div>

      <div className="border border-neutral-200 rounded-md p-8 mt-28 lg:max-w-4xl">
        <h2 className="text-xl font-semibold">Update account</h2>
        <p className="text-xs mt-2 text-neutral-500 leading-5">
          You can update your account details here.
        </p>
        <button
          className="text-white bg-neutral-800 px-6 py-2 rounded mt-7 text-sm shadow-md"
          onClick={async () => {
            router.push("/profile/setup?edit=true");
          }}
        >
          Edit account details
        </button>
      </div>

      <div className="border border-red-200 rounded-md p-8 mt-8 lg:max-w-4xl">
        <h2 className="text-xl font-semibold">Danger zone</h2>
        <p className="text-xs mt-2 text-neutral-500 leading-5">
          This action is irreversible. You will be logged out of your current
          device.
        </p>
        <button
          className="text-white bg-red-500 px-6 py-2 rounded mt-7 text-sm shadow-md"
          onClick={async () => {
            await signOut();
            deleteCookie("user");
            router.push("/");
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
