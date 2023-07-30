import { signOut } from "next-auth/react";
import React from "react";

function Profile() {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export default Profile;
