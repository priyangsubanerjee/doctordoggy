import React, { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { signIn, useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/unauthenticated",
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

function Feedback() {
  const session = useSession();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  return (
    <>
      <div className="min-h-screen h-fit px-6 py-8 lg:py-20 lg:px-[100px]">
        <h1 className="text-2xl lg:text-3xl font-bold font-popins text-neutral-800">
          Your feedback matters.
        </h1>
        <p className="text-sm mt-4 text-neutral-500 leading-6">
          We are always looking for ways to improve our service. If you have any
          suggestions or feedback, please let us know.
        </p>

        <div className="mt-16 lg:mt-20 lg:max-w-4xl">
          <p className="text-xs tracking-wide font-medium text-neutral-400">
            RATE US
          </p>
          <div className="mt-5 space-x-5 text-4xl lg:text-5xl">
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <span
                  onClick={() => setRating(item)}
                  className={`
                    ${
                      rating >= item
                        ? "text-yellow-400"
                        : "text-neutral-400 hover:text-neutral-500"
                    } cursor-pointer
                  `}
                  key={index}
                >
                  <iconify-icon icon="ic:outline-star"></iconify-icon>
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-16 lg:mt-20 lg:max-w-4xl">
          <p className="text-xs tracking-wide font-medium text-neutral-400">
            WRITE US
          </p>
          <textarea
            name=""
            className="border p-6 rounded-md w-full mt-5 resize-none text-sm"
            placeholder="Start typing..."
            id=""
            rows="10"
          ></textarea>
        </div>

        <div className="mt-10 flex items-center space-x-3">
          <button className="flex disabled:opacity-50 items-center justify-center space-x-2 w-fit lg:px-5 px-5 py-3 rounded-md bg-neutral-800 text-white text-sm">
            <iconify-icon
              height="20"
              icon="icon-park-solid:check-one"
            ></iconify-icon>

            <span>Submit feedback</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Feedback;
