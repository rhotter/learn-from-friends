// page.tsx

import { prisma } from "@/utils/prisma";
import { Person, Stage, Topic } from "@prisma/client";
import { FinalizeTopicsButton } from "@/components/FinalizeTopicsButton";
import { TopicPreferences } from "@/components/TopicPreferences";
import { TopicSubmissions } from "@/components/TopicSubmissions";
import { FormGroups } from "./FormGroups";
import { QRCodeSVG } from "qrcode.react";
import { TopicSelectionsInstructions } from "./TopicSelectionsInstructions";
import Link from "@/components/Link";

export interface TopicWithTeacher extends Topic {
  teacher: Person;
}

async function getData(eventId: number) {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      topics: {
        include: {
          teacher: true,
        },
      },
      people: {
        include: {
          preferences: {
            include: {
              topic: {
                include: {
                  teacher: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return event;
}

export default async function Page({ params }: { params: { id: number } }) {
  const eventId = Number(params.id);

  const event = await getData(eventId);

  if (!event) return <div>Event not found</div>;
  return (
    <div>
      <h1>{event.name} Event</h1>
      {event.stage == Stage.SELECTIONS && <TopicSelectionsInstructions />}
      <TopicLink id={eventId} stage={event.stage} />
      <div className="my-8">
        {event.stage == Stage.SELECTIONS ? (
          <FormGroups eventId={eventId} peoplePreferences={event.people} />
        ) : (
          <FinalizeTopicsButton eventId={eventId} />
        )}
      </div>
      {event.stage == Stage.SELECTIONS && (
        <TopicPreferences
          peoplePreferences={event.people}
          numPreferences={event.numPreferences}
        />
      )}
      <TopicSubmissions topics={event.topics} />
    </div>
  );
}

const TopicLink = ({ id, stage }: { id: number; stage: Stage | undefined }) => {
  const baseUrl = "https://learnfromfriends.xyz";
  const route = `event/${id}/topic`;
  return (
    <div className="mx-auto max-w-sm border border-orange-200 p-4 bg-orange-200/50 rounded-md">
      {stage == Stage.SELECTIONS
        ? "Select topics at (same as before)"
        : "Submit topics at"}
      <br />
      <Link
        href={`/${route}`}
        className="font-semibold"
      >{`${baseUrl}/${route}`}</Link>
      <div className="flex justify-center mt-4">
        <Link href={`/${route}`}>
          <QRCodeSVG value={`${baseUrl}/${route}`} />
        </Link>
      </div>
    </div>
  );
};
