// page.tsx

import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import { prisma } from "@/utils/prisma";
import { Person, Stage, Topic } from "@prisma/client";
import { FinalizeTopicsButton } from "@/components/FinalizeTopicsButton";
import { TopicPreferences } from "@/components/TopicPreferences";
import { TopicSubmissions } from "@/components/TopicSubmissions";
import { FormGroups } from "./FormGroups";
import { QRCodeSVG } from "qrcode.react";

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
  console.log(peoplePreferences);
  return { topics, stage, eventName, peoplePreferences };
}

export default async function Page({ params }: { params: { id: number } }) {
  const eventId = Number(params.id);

  const { topics, stage, eventName, peoplePreferences } = await getData(
    eventId
  );

  return (
    <Layout>
      <h1 className="font-serif">{eventName} Event</h1>
      {stage == Stage.SELECTIONS && (
        <div className="my-4">
          It's now time for people to select the topics they want to learn!
        </div>
      )}
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
    </Layout>
  );
}

const TopicLink = ({ id, stage }: { id: number; stage: Stage | undefined }) => (
  <div className="w-full">
    {stage == Stage.SELECTIONS
      ? "Topic selection link (same as before)"
      : "Topic submission link"}
    :{" "}
    <Link
      href={`/event/${id}/topic`}
      className="text-slate-600 hover:text-slate-500 font-semibold"
    >{`https://learnfromfriends.xyz/${id}/topic`}</Link>
    <div className="flex justify-center mt-4">
      <QRCodeSVG value={`https://learnfromfriends.xyz/${id}/topic`} />
    </div>
  </div>
);
