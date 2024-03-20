import { Icon } from "@iconify/react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

function Schedule() {
  return (
    <div className="pb-16">
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10 lg:mt-16">
        Schedule an appointment
      </h1>
      <p className="text-sm text-neutral-500 text-center mt-3">
        Doctor at your home, at your time - its that simple!
      </p>

      <div className="max-w-4xl px-6 lg:px-0 mx-auto h-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select radius="none" label="Choose pet">
            <SelectItem key="Laddoo" value="Laddoo">
              Laddoo
            </SelectItem>
            <SelectItem key="Judo" value="Judo">
              Judo
            </SelectItem>
            <SelectItem key="Max" value="Max">
              Max
            </SelectItem>
          </Select>
          <Select radius="none" label="Choose doctor">
            <SelectItem key="Laddoo" value="Laddoo">
              Dr. Laddoo
            </SelectItem>
            <SelectItem key="Judo" value="Judo">
              Dr. Judo
            </SelectItem>
            <SelectItem key="Max" value="Max">
              Dr. Max
            </SelectItem>
          </Select>
          <Input
            label="Date"
            defaultValue={new Date().toISOString().split("T")[0]}
            type="date"
            radius="none"
            classNames={{
              input: "text-white w-fit md:w-full",
            }}
          />
          <Input
            classNames={{
              input: "text-white w-fit md:w-full",
            }}
            defaultValue="12:00"
            label="Time"
            type="time"
            radius="none"
          />
        </div>
        <div className="md:flex items-center justify-between mt-10">
          <div className="flex items-center space-x-1 shrink-0">
            <Icon icon="lets-icons:time-atack-light" width="24" height="24" />
            <p className="text-sm text-neutral-500">
              You appointment is capped to 15 minutes
            </p>
          </div>
          <Button
            className="px-10 w-full mt-10 md:mt-0 md:w-fit bg-black text-white rounded-md"
            radius="none"
          >
            Submit request
          </Button>
        </div>

        <div className="mt-24">
          <h3 className="text-base font-semibold text-neutral-700">
            <Icon
              icon="mingcute:love-line"
              width="28"
              height="28"
              className="inline-block -translate-y-[2px] mr-2"
            />
            Things to remember
          </h3>

          <ul className="mt-4 space-y-3">
            <li className="flex items-start space-x-2">
              <Icon icon="bx:bx-check" width="24" height="24" />
              <p className="text-sm text-neutral-500">
                Please make sure to be available at the time of appointment
              </p>
            </li>
            <li className="flex items-start space-x-2">
              <Icon icon="bx:bx-check" width="24" height="24" />
              <p className="text-sm text-neutral-500">
                You cannot delete an appointment, but cancel it if needed.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
