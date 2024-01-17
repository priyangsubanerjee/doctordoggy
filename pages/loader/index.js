import prisma from "@/prisma/prisma";
import React from "react";

export async function getStaticProps() {
  const pets = await prisma.pet.findMany({
    where: {
      parentEmail: "devpriyangsu@gmail.com",
    },
  });

  return {
    props: {
      pets: JSON.parse(JSON.stringify(pets)),
    },
  };
}

function index({ pets }) {
  return (
    <div>
      {pets.map((pet, i) => {
        return <div key={i}>{pet.name}</div>;
      })}
    </div>
  );
}

export default index;
