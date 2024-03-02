// submit topics
import { TopicSelectionForm } from "./TopicSelectionForm";
import { prisma } from "@/utils/prisma";

const getData = async (eventId: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      people: true,
      topics: {
        include: {
          teacher: true,
        },
      },
    },
  });
  return event;
};

export const TopicSelection = async ({ eventId }: { eventId: number }) => {
  const event = await getData(eventId);
  if (!event) return <div>Event not found</div>;

  const topics = event.topics.map((topic) => ({
    label: topic.name,
    value: topic.id,
    person: topic.teacher,
  }));

  const names = event.people.map((person) => ({
    label: person.name,
    value: person.id,
  }));

  return (
    <div className="mx-auto">
      <h1>Topic Selection</h1>
      <div className="mb-8 text-gray-500 text-sm">
        <div className="mb-2">Let's analyze our own personalities and see how we can become better people!</div>
      </div>
      <TopicSelectionForm
        names={names}
        topics={topics}
        eventId={eventId}
        numPreferences={event.numPreferences}
      />
    </div>
  );
};
