import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Redirect() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.url) {
      window.open(router.query.url.toString(), "_self");
    }
  }, []);
  return <div>Redirecting...</div>;
}

export default Redirect;
