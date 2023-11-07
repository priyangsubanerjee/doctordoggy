import axios from "axios";

export default async function FetchVaccinations(email) {
  let { data } = await axios.post(
    "/api/vaccine/read",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data.vaccinations;
}

export async function FetchPrescriptions(email) {
  let prescriptions = await axios.post(
    "/api/prescription/read",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return prescriptions.data.prescriptions;
}
