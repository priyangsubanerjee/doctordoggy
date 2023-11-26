import { createBreed, getBreeds } from "@/prisma/breed";
import axios from "axios";

export default async function handler(req, res) {
  //   let url =
  //     "https://script.googleusercontent.com/macros/echo?user_content_key=r2u49iCIVzNga5twpkqnPSf7cdSlRjWu4rE-Z45LGp9n0g-DnM_XWop6DWNAmEoKXgeshIrjCMfmsbCmwVm26GS31nAE4kWMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPZLrnH-BkIWPlUxGYH7b52UdsZ-hBwomtibrD7pcaF1NDRr5NQbsz3NWJI0Uu462XXgNJ5Swsww5d4zsxFzWt2OZXtVRW5O99z9Jw9Md8uu&lib=Mwy8V1r6IO08Cj6VKUglojGY7IXld9P0u";

  //   console.log("List requested");

  //   let breeds = await axios.get(url);
  //   breeds = breeds.data.breeds;

  //   console.log("List retrieved");

  //   for (let i = 0; i < breeds.length; i++) {
  //     let breed = breeds[i];
  //     try {
  //       await createBreed(breed.name, breed.type);
  //       console.log("created: ", i);
  //     } catch (error) {
  //       console.log(error, i);
  //     }
  //   }

  let breeds = await getBreeds();
  res.status(200).json({ breeds });
}
