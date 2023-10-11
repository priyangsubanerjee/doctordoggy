import { Icon } from "@iconify/react";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import confetti from "canvas-confetti";

function Onboarding() {
  // TODO : Add database logic to check if the user has filled phone & zipcode

  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0); // 0: phone, 1: zipcode, address, 2: success

  const handleConfetti = () => {
    confetti({
      particleCount: 400,
      spread: 100,
      origin: {
        y: 0.65,
        x: 0.63,
      },
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 h-full w-full bg-black/70 z-30 flex justify-center pt-32">
          <div className="w-[500px] h-fit min-h-[450px] flex flex-col bg-white rounded-xl p-7">
            <p className="text-xs text-neutral-600">Good morning</p>
            <h1 className="font-semibold text-2xl mt-3">Priyangsu Banerjee</h1>
            <p className="text-sm leading-6 mt-3 text-neutral-700">
              Glad to have you onboard. We need some more information to get you
              started.
            </p>

            <div className="mt-7 mb-14 space-y-4">
              {step == 0 ? (
                <>
                  <Input
                    //isInvalid={true}
                    // errorMessage="Please enter a valid email"
                    label="Phone"
                    radius="sm"
                    placeholder="Enter your phone number"
                  />
                  <Input
                    label="Zipcode"
                    radius="sm"
                    placeholder="Enter your area pincode"
                  />
                </>
              ) : step == 1 ? (
                <div>
                  <Textarea
                    label="Address (Optional)"
                    radius="sm"
                    placeholder="Enter your address"
                  />
                </div>
              ) : (
                <>Success</>
              )}
            </div>

            <div className="mt-auto flex items-center">
              <Button
                onClick={() => {
                  step > 0 ? setStep(step - 1) : null;
                }}
                color="default"
                radius="full"
                className={step == 0 || step == 2 ? "hidden" : ""}
              >
                Back
              </Button>
              <Button
                onPress={() => {
                  step == 2 ? handleConfetti() : setStep(step + 1);
                }}
                radius="full"
                color="primary"
                className="ml-auto"
              >
                {step == 1 ? "Done" : step == 2 ? "Close" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Onboarding;
