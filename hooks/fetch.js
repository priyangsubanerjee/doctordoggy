import axios from "axios";

export async function FetchVaccinations(email) {
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

export async function FetchPets(email) {
  let pets = await axios.post(
    "/api/pet/read",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return pets.data.pets;
}

export async function FetchDewormings(email) {
  let dewormings = await axios.post(
    "/api/deworming/read",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return dewormings.data.dewormings;
}
