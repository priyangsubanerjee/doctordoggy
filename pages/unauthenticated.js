import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { signIn } from "next-auth/react";
import React from "react";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
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

function Unauthenticated() {
  return (
    <div className="min-h-screen h-fit px-6 py-8 lg:py-20 lg:px-[100px]">
      <h1 className="text-3xl font-bold font-popins text-neutral-800">
        You are not logged in.
      </h1>
      <p className="text-sm mt-4 text-neutral-500">
        To provide an extra layer of security, we require you to log in before
        you can access this page.
      </p>
      <button
        onClick={() => signIn("google")}
        className="mt-10 text-sm bg-neutral-100 px-3 py-2 lg:py-3 lg:px-6 text-black rounded flex items-center space-x-3"
      >
        <iconify-icon height="20" icon="devicon:google"></iconify-icon>
        <span>Get Started</span>
      </button>
    </div>
  );
}

export default Unauthenticated;
