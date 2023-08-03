/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { set } from "mongoose";
import Link from "next/link";
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
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [onBoarding, setOnBoarding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

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
        if (data.user.phone == null) {
          document.getElementById("phoneInput").focus();
          return;
        }
        if (data.user.pincode == null) {
          document.getElementById("pincodeInput").focus();
          return;
        }

        setPhone(data.user.phone);
        setPincode(data.user.pincode);
        setAddress(data.user.address);
      }

      var resUpdate = await fetch("/api/user/updateLocal", {
        method: "POST",
        body: JSON.stringify({
          email: session.data.user.email,
        }),
      });

      var dataUpdate = await resUpdate.json();
      if (dataUpdate.success) {
        var resSaveCookie = await fetch("/api/user/saveToCookie", {
          method: "POST",
          body: JSON.stringify({
            name: session.data.user.name,
            email: session.data.user.email,
            phone: dataUpdate.user.phone,
            pincode: dataUpdate.user.pincode,
            address: dataUpdate.user.address,
          }),
        });

        var dataSaveCookie = await resSaveCookie.json();

        if (dataSaveCookie.success) {
          setPhone(dataUpdate.user.phone);
          setPincode(dataUpdate.user.pincode);
          setAddress(dataUpdate.user.address);
        }
      }
    } else {
      var resBackup = await fetch("/api/user/findBackup", {
        method: "POST",
        body: JSON.stringify({
          email: session.data.user.email,
        }),
      });

      var dataBackup = await resBackup.json();

      if (dataBackup.success) {
        if (dataBackup.user.phone == null) {
          document.getElementById("phoneInput").focus();
          return;
        } else if (dataBackup.user.pincode == null) {
          document.getElementById("pincodeInput").focus();
          return;
        }
        let resSaveCookie = await fetch("/api/user/saveToCookie", {
          method: "POST",
          body: JSON.stringify({
            name: session.data.user.name,
            email: session.data.user.email,
            phone: dataBackup.user.phone,
            pincode: dataBackup.user.pincode,
            address: dataBackup.user.address,
          }),
        });
        let dataSaveCookie = await resSaveCookie.json();
        if (dataSaveCookie.success) {
          router.push("/dashboard");
        } else {
          alert("Something went wrong, please try again");
        }
      } else {
        setOnBoarding(true);
        let resCreate = await fetch("/api/user/createDb", {
          method: "POST",
          body: JSON.stringify({
            email: session.data.user.email,
            name: session.data.user.name,
          }),
        });

        var dataCreate = await resCreate.json();
        if (dataCreate.success) {
          document.getElementById("phoneInput").focus();
        } else {
        }
      }
    }
  };

  const saveUser = async () => {
    if (phone == "" || pincode == "") {
      alert("Phone & pincode are mandatory fields");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/user/updateDb", {
      method: "POST",
      body: JSON.stringify({
        name: session.data.user.name,
        email: session.data.user.email,
        phone: phone.toString(),
        pincode: pincode.toString(),
        address: address,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Account updated successfully");
      await fetch("/api/user/saveToCookie", {
        method: "POST",
        body: JSON.stringify({
          name: session.data.user.name,
          email: session.data.user.email,
          phone: phone.toString(),
          pincode: pincode.toString(),
          address: address,
        }),
      });
      onBoarding
        ? router.push("/profile/onboardingSuccess")
        : router.push("/profile");
    }
    setLoading(false);
  };

  useEffect(() => {
    retrieveUser();
    if (router.query.edit == "true") {
      setEdit(true);
      document.getElementById("phoneInput").focus();
    }
  }, []);

  return (
    <div className="min-h-screen h-fit px-6 py-8 lg:py-16 lg:px-[100px]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-semibold text-neutral-800">
            {edit ? "Edit" : "Setup"} your{" "}
            <span className="text-pink-500">account</span>
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
            className="px-4 py-3 border w-full mt-2 rounded-none opacity-50"
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
            className="px-4 py-3 border w-full mt-2 rounded-none opacity-50"
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-3 border w-full mt-2"
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
            className="px-4 py-3 border w-full mt-2"
            placeholder="71XXXXX"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            name=""
            id="pincodeInput"
          />
        </div>
        <div className="lg:col-span-2">
          <label className="font-medium text-xs shrink-0 text-neutral-500">
            Address
          </label>
          <textarea
            name=""
            className="resize-none w-full h-full border px-4 py-3 mt-2"
            placeholder="Your address here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id=""
          ></textarea>
        </div>
      </div>

      <div className="mt-20 flex items-center space-x-3">
        <button
          disabled={loading}
          onClick={() => saveUser()}
          className="flex disabled:opacity-50 items-center justify-center space-x-2 w-fit lg:px-5 px-5 py-3 rounded bg-blue-500 text-white text-sm"
        >
          {loading ? (
            <iconify-icon height="24" icon="eos-icons:loading"></iconify-icon>
          ) : (
            <iconify-icon
              height="23"
              icon="icon-park-solid:check-one"
            ></iconify-icon>
          )}
          <span>Save changes & proceed</span>
        </button>
      </div>
    </div>
  );
}

export default Profile;
