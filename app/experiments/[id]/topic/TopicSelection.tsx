// submit topics
import { TopicSelectionForm } from "./TopicSelectionForm";
import { prisma } from "@/utils/prisma";

const getNames = async (experimentId: number) => {
  const people = await prisma.person.findMany({
    where: {
      experimentId,
    },
  });
  return people.map((person) => ({
    label: person.name,
    value: person.id,
  }));
};

const getTopics = async (experimentId: number) => {
  const topics = await prisma.topic.findMany({
    where: {
      experimentId,
    },
  });
  return topics.map((topic) => ({
    label: topic.name,
    value: topic.id,
  }));
};

export const TopicSelection = async ({
  experimentId,
}: {
  experimentId: number;
}) => {
  const [names, topics] = await Promise.all([
    getNames(experimentId),
    getTopics(experimentId),
  ]);
  return (
    <div className="mx-auto">
      <h1>Topic Selection</h1>
      <div className="mb-8 text-slate-500 text-sm">
        <div className="mb-2">
          Now it's time to pick what topics you want to learn!
        </div>
      </div>
      <TopicSelectionForm names={names} topics={topics} />
    </div>
  );
};
