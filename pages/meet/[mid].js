/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function OnlineMeet() {
  const router = useRouter();
  const session = useSession();
  const [authenticated, setAuthenticated] = useState(false);
  const [constEnded, setConstEnded] = useState(false);

  const startCon = async (element) => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    );
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID),
      process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET,
      router.query.mid,
      session.data.user.email,
      session.data.user.name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      preJoinViewConfig: {
        title: "Online Consultation",
      },

      onLeaveRoom: () => {
        setConstEnded(true);
        router.push("/appointments");
      },
    });
  };

  const CheckSessionMid = async () => {
    const mid = router.query.mid;
    if (!mid) {
      router.push("/appointments");
    } else {
      let checkReq = await axios.post("/api/appointments/v-code", {
        code: mid,
        email: session.data.user.email,
      });
      if (!checkReq.data.success) {
        router.push("/appointments");
      } else {
        setAuthenticated(true);
      }
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      CheckSessionMid();
    }
  }, [session.status]);

  return (
    <div>
      {authenticated && (
        <div
          className="h-full w-full fixed inset-0 z-30 bg-white"
          ref={startCon}
        />
      )}
      {constEnded && <div className="fixed inset-0 bg-white z-50"></div>}
    </div>
  );
}

export default OnlineMeet;
