/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useSession } from "next-auth/react";

function Onboarding() {
  const session = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0); // 0: phone, 1: zipcode, address, 2: success
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    phone: {
      message: "",
      isError: false,
    },
    zipcode: {
      message: "",
      isError: false,
    },
  });

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(2);
      handleConfetti();
      setIsLoading(false);
    }, 3000);
  };

  const stepForward = () => {
    if (step == 1) {
      handleSubmit();
    } else if (step == 2) {
      setIsVisible(false);
    } else if (step == 0) {
      if (phone.length == 0) {
        setErrors({
          ...errors,
          phone: {
            isError: true,
            message: "Phone number is required",
          },
        });
        return;
      } else if (phone.length < 10) {
        setErrors({
          ...errors,
          phone: {
            isError: true,
            message: "Phone number must be 10 digits",
          },
        });
        return;
      } else if (zipcode.length == 0) {
        setErrors({
          ...errors,
          zipcode: {
            isError: true,
            message: "Zipcode is required",
          },
        });
        return;
      } else {
        setStep(step + 1);
      }
    }
  };

  const remindeLater = () => {
    sessionStorage.setItem("remindLater", "true");
    setIsVisible(false);
  };

  useEffect(() => {
    if (session.status === "authenticated" && !session.data.onBoardingSuccess) {
      let remidLater = sessionStorage.getItem("remindLater");
      if (remidLater) {
        if (remidLater == "true") {
          return;
        }
      }
      setIsVisible(true);
    }
  }, [session.status]);

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 h-full w-full bg-black/70 z-30 flex justify-center pt-32">
          <div className="w-[500px] h-fit min-h-[450px] flex flex-col bg-white rounded-xl p-7">
            {step != 2 && (
              <>
                <p className="text-xs text-neutral-600">Good morning</p>
                <h1 className="font-semibold text-2xl mt-3">
                  Priyangsu Banerjee
                </h1>
                <p className="text-sm leading-6 mt-3 text-neutral-700">
                  Glad to have you onboard. We need some more information to get
                  you started.
                </p>
              </>
            )}

            <div className="mt-7 mb-14 space-y-4">
              {step == 0 ? (
                <>
                  <Input
                    value={phone}
                    type="tel"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors({
                        ...errors,
                        phone: {
                          isError: false,
                          message: "",
                        },
                      });
                    }}
                    isInvalid={errors.phone.isError}
                    errorMessage={errors.phone.message}
                    label="Phone"
                    radius="sm"
                    placeholder="Enter your phone number"
                  />
                  <Input
                    type="tel"
                    label="Zipcode"
                    value={zipcode}
                    onChange={(e) => {
                      setZipcode(e.target.value);
                      setErrors({
                        ...errors,
                        zipcode: {
                          isError: false,
                          message: "",
                        },
                      });
                    }}
                    isInvalid={errors.zipcode.isError}
                    errorMessage={errors.zipcode.message}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/711/711239.png"
                    className="h-20"
                    alt=""
                  />
                  <p className="text-2xl font-medium mt-8 text-neutral-800">
                    You are all set.
                  </p>
                  <p className="text-sm text-center text-neutral-600 leading-6 mt-3">
                    Glat to finally have you onboard. Explore the app and let us
                    know if you have any feedback. Till then happy parenting!
                  </p>
                </div>
              )}
            </div>

            <div className="mt-auto flex items-center">
              <button
                onClick={() => {
                  remindeLater();
                }}
                className={`text-sm text-blue-600 hover:underline 
                          ${step == 0 ? "block" : "hidden"}
              `}
              >
                Remind me later
              </button>
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
                isLoading={isLoading}
                onPress={() => stepForward()}
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
