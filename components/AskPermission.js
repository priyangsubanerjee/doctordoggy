import React from "react";

function AskPermission() {
  const askPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (result) {
        console.log("User Choice", result);
        if (result !== "granted") {
          console.log("No notification permission granted!");
        } else {
          console.log("Notification permission granted!");
        }
      });
    }
  };
  return (
    <div className="p-6">
      <div className="border p-8 rounded-xl space-x-8">
        <button>Remind later</button>
        <button onClick={() => askPermission()}>Allow </button>
      </div>
    </div>
  );
}

export default AskPermission;
