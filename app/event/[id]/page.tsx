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

  const topics = event!.topics;
  const peoplePreferences = event!.people;
  const stage = event!.stage;
  const eventName = event!.name;
  return { topics, stage, eventName, peoplePreferences };
}

export default async function Page({ params }: { params: { id: number } }) {
  const eventId = Number(params.id);

  const { topics, stage, eventName, peoplePreferences } = await getData(
    eventId
  );

  return (
    <div>
      <h1>{eventName} Event</h1>
      {stage == Stage.SELECTIONS && <TopicSelectionsInstructions />}
      <TopicLink id={eventId} stage={stage} />
      <div className="my-8">
        {stage == Stage.SELECTIONS ? (
          <FormGroups eventId={eventId} peoplePreferences={peoplePreferences} />
        ) : (
          <FinalizeTopicsButton eventId={eventId} />
        )}
      </div>
      {stage == Stage.SELECTIONS && (
        <TopicPreferences peoplePreferences={peoplePreferences} />
      )}
      <TopicSubmissions topics={topics} />
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
        <QRCodeSVG value={`${baseUrl}/${route}`} />
      </div>
    </div>
  );
};
