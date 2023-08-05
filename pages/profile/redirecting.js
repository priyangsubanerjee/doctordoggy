import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Redirecting() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return <div>redirecting...</div>;
}

export default Redirecting;
