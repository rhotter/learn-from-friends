import Link from "next/link";
import React from "react";

import { prisma } from "@/utils/prisma";
import { NewExperiment } from "./NewExperiment";

// @ts-ignore async component
export const MyLearningExperiments: React.FC = async () => {
  const experiments = await prisma.experiment.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <h1>My Learning Experiments</h1>
      <div className="flex flex-col gap-2">
        {experiments.map((experiment) => (
          <Experiment
            id={experiment.id}
            name={experiment.name}
            date={experiment.date}
          />
        ))}
        <NewExperiment />
      </div>
    </div>
  );
};

const Experiment: React.FC<{
  id: number;
  name: string;
  date: Date;
}> = ({ name, date, id }) => (
  <Link href={`/experiments/${id}`}>
    <div className="border p-4 border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
      <h3 className="mb-2">{name}</h3>
      <p className="text-gray-500">{date.toDateString()}</p>
    </div>
  </Link>
);
