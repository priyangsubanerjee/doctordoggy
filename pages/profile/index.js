import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { encrypt } from "@/helper/crypto";
import { getCookie } from "cookies-next";

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
            readOnly={mode == "view"}
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
            readOnly={mode == "view"}
            className="px-4 py-3 border w-full mt-2"
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
            readOnly={mode == "view"}
            className="resize-none w-full h-full border px-4 py-3 mt-2"
            placeholder="Your address here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id=""
          ></textarea>
        </div>
      </div>

      <div className="mt-20">
        {mode == "edit" && (
          <button
            onClick={async () => {
              if (phone == "" || pincode == "") {
                alert("Phone & pincode are mandatory fields");
                return;
              }
              let res = await fetch("/api/user/save", {
                method: "POST",
                body: JSON.stringify({
                  name: session.data.user.name,
                  email: session.data.user.email,
                  phone: phone,
                  pincode: pincode,
                  address: address,
                }),
              });
              let data = await res.json();
              if (data.success) {
                router.push("/");
              }
            }}
            className="flex items-center justify-center space-x-2 w-full lg:w-fit lg:px-5 px-5 py-4 rounded bg-blue-500 text-white text-sm"
          >
            <iconify-icon
              height="20"
              icon="icon-park-solid:check-one"
            ></iconify-icon>
            <span>Save changes & proceed</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
