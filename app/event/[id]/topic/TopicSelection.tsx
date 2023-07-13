// submit topics
import { TopicSelectionForm } from "./TopicSelectionForm";
import { prisma } from "@/utils/prisma";

const getNames = async (eventId: number) => {
  const people = await prisma.person.findMany({
    where: {
      eventId,
    },
  });
  return people.map((person) => ({
    label: person.name,
    value: person.id,
  }));
};

const getTopics = async (eventId: number) => {
  const topics = await prisma.topic.findMany({
    where: {
      eventId,
    },
  });
  return topics.map((topic) => ({
    label: topic.name,
    value: topic.id,
  }));
};

export const TopicSelection = async ({ eventId }: { eventId: number }) => {
  const [names, topics] = await Promise.all([
    getNames(eventId),
    getTopics(eventId),
  ]);
  return (
    <div className="mx-auto">
      <h1>Topic Selection</h1>
      <div className="mb-8 text-slate-500 text-sm">
        <div className="mb-2">
          Now it's time to pick what topics you want to learn!
        </div>
      </div>
      <TopicSelectionForm names={names} topics={topics} eventId={eventId} />
    </div>
  );
};
