import { createDewormer } from "@/prisma/dewormer";

export default async function handler(req, res) {
  let medicines = await fetch(
    "https://script.google.com/macros/s/AKfycbx9Hk4xPEdFVSBg0THF6P_UAHDx93BuwuHjsFqnk3-JzojEUTypWaqyZGl971BBOJaHwQ/exec"
  );
  medicines = await medicines.json();
  medicines = medicines?.medicines;

  for (let i = 0; i < medicines.length; i++) {
    try {
      await createDewormer(medicines[i].name, medicines[i].type);
      console.log("Created dewormer: " + (i + 1) + " of " + medicines.length);
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).json("Transfer API");
}
