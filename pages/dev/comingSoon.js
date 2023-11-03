import { Button } from "@nextui-org/react";
import React from "react";

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="https://i.pinimg.com/originals/8b/35/fe/8b35fef55fba1a201c9c7a11d3ec3d64.gif"
        className="h-44 w-44 mx-auto rounded-full mt-20 lg:mt-16 object-cover"
        alt=""
      />
      <h1 className="text-2xl lg:text-3xl font-semibold text-center mt-10">
        These features will be available soon
      </h1>
      <p className="text-sm text-neutral-600 mt-3">
        Please check back later or contact us at database-doctordoggy@gmail.com
      </p>
      <Button
        onClick={() => (window.location.href = "/")}
        className="mt-8"
        radius="full"
      >
        Take me home
      </Button>
    </div>
  );
}

export default ComingSoon;
