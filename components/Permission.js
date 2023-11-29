import React from "react";

function Permission() {
  const askPermission = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        document.getElementById("error").innerHTML = permission;
      } catch (error) {
        document.getElementById("error").innerHTML = error;
      }
    }
  };
  return (
    <div className="p-6">
      <div className="border p-8 rounded-xl space-x-8 max-w-lg">
        <button>Remind later</button>
        <button onClick={() => askPermission()}>Allow </button>
        <p id="error"></p>
      </div>
    </div>
  );
}

export default Permission;
