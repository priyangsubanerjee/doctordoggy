import axios from "axios";

export const sendNotification = async (message) => {
  await axios.post(
    "/api/message/custom",
    {
      message: message,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
