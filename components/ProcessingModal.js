/* eslint-disable @next/next/no-img-element */
import GlobalStates from "@/context/GlobalState";
import React, { useContext, useEffect } from "react";

function ProcessingModal() {
  const { procesingModalOpen, processingModalMessage, updatedModal } =
    useContext(GlobalStates);

  useEffect(() => {
    procesingModalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [procesingModalOpen]);

  return (
    <>
      {procesingModalOpen && (
        <div className="fixed inset-0 h-full w-full bg-black/50 flex items-center justify-center z-40">
          <div className="w-[95%] lg:w-[450px] bg-white rounded-lg overflow-hidden">
            <img
              src="https://cdn.dribbble.com/users/2054184/screenshots/6335402/framesequence-dog.gif"
              alt=""
              className="max-h-[250px] w-full object-cover"
            />
            <div className="flex flex-col items-center justify-center py-8">
              <h1 className="text-xl font-semibold text-neutral-700">
                One moment please...
              </h1>
              <p className="mt-3 text-sm text-neutral-500">
                {processingModalMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProcessingModal;
