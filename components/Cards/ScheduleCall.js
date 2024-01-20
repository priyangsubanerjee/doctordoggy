import { Button } from "@nextui-org/react";
import React from "react";

function ScheduleCall({ close }) {
  return (
    <div className="fixed inset-0 h-full w-full bg-black/50 z-50 flex items-center justify-center">
      <div className="p-8 bg-white rounded-md w-[500px] max-w-[450px]">
        <h1 className="text-2xl font-semibold">Schedule a call</h1>
        <p className="text-sm text-neutral-600 mt-2 leading-6">
          Please select a date and time for the call according to your comfort.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="date"
              className="text-xs font-medium text-neutral-700"
            >
              Date
            </label>
            <input
              defaultValue={new Date().toISOString().slice(0, 10)}
              type="date"
              name="date"
              id="date"
              className="border border-neutral-200 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="time"
              className="text-xs font-medium text-neutral-700"
            >
              Time
            </label>
            <input
              defaultValue="13:30"
              type="time"
              name="time"
              id="time"
              className="border border-neutral-200 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col space-y-1 col-span-2">
            <label
              htmlFor="time"
              className="text-sm font-medium text-neutral-700"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-neutral-200 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col space-y-1 col-span-2">
            <label
              htmlFor="time"
              className="text-sm font-medium text-neutral-700"
            >
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="border border-neutral-200 rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button onClick={() => close()} className="text-sm hover:underline">
            Cancel
          </button>
          <Button className="bg-blue-600 text-sm text-white px-4 py-2 rounded-md">
            Schedule call
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCall;
