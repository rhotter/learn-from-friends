// page.tsx

import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import { prisma } from "@/utils/prisma";
import { Person, Stage, Topic } from "@prisma/client";
import { FinalizeTopicsButton } from "@/components/FinalizeTopicsButton";
import { TopicPreferences } from "@/components/TopicPreferences";
import { getStage } from "@/utils/getStage";
import { TopicSubmissions } from "@/components/TopicSubmissions";
import { getPeoplePreferences } from "@/utils/getPeoplePreferences";
import { FormGroups } from "./FormGroups";

export interface TopicWithTeacher extends Topic {
  teacher: Person;
}

async function getTopics(eventId: number) {
  // query
  const topics = await prisma.topic.findMany({
    where: {
      eventId: eventId,
    },
    include: {
      teacher: true,
    },
  });
  return topics;
}

async function getExperimentName(eventId: number) {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  return event?.name;
}

export default async function Page({ params }: { params: { id: number } }) {
  const eventId = Number(params.id);

  const [topics, stage, eventName, peoplePreferences] = await Promise.all([
    getTopics(eventId),
    getStage(eventId),
    getExperimentName(eventId),
    getPeoplePreferences(eventId),
  ]);

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
  <div>
    {stage == Stage.SELECTIONS
      ? "Topic selection link (same as before)"
      : "Topic submission link"}
    :{" "}
    <Link
      href={`/event/${id}/topic`}
      className="text-slate-600 hover:text-slate-500 font-semibold"
    >{`exp.dev/${id}/topic`}</Link>
  </div>
);
