import axios from "axios";
import React, { useEffect, useState } from "react";

function IndexingPage() {
  const [pin, setPin] = useState("");

  const generateRandomPin = async () => {
    let alphabets =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345689";
    let alphanumneric6Pin = "";
    for (let i = 0; i < 6; i++) {
      alphanumneric6Pin += alphabets.charAt(
        Math.floor(Math.random() * alphabets.length)
      );
    }

    let checkPresent = await axios.post("/api/user/duplicatePin", {
      pin: alphanumneric6Pin.toUpperCase(),
    });

    if (checkPresent.data.success) {
      setPin(alphanumneric6Pin.toUpperCase());
    } else {
      generateRandomPin();
    }
  };

  useEffect(() => {
    generateRandomPin();
  }, []);

  return <div>{pin}</div>;
}

export default IndexingPage;
