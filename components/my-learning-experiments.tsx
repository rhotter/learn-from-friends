import Link from "next/link";
import React, { ReactNode } from "react";
import { Mail, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const MyLearningExperiments: React.FC = () => {
  return (
    <div className="mt-4">
      <h1>My Learning Experiments</h1>
      <NewExperiment />
      <div className="flex flex-col gap-2">
        <Experiment
          id={1}
          name="School 2.0 Learning Experiment"
          date={new Date("2022-09-01")}
        />
        <Experiment
          id={2}
          name="LXM Learning Experiment"
          date={new Date("2022-08-01")}
        />
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

const NewExperiment: React.FC = () => (
  <Button className="mb-4">
    <Plus className="mr-2 h-4 w-4" /> New Experiment
  </Button>
);
