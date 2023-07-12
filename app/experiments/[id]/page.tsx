import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import { prisma } from "@/utils/prisma";
import { Person, Stage, Topic } from "@prisma/client";
import { FinalizeTopicsButton } from "@/components/FinalizeTopicsButton";
import { TopicPreferences } from "@/components/TopicPreferences";
import { getStage } from "@/utils/getStage";
import { UndoStageButton } from "./UndoStageButton";
import { Button } from "@/components/ui/button";
import { TopicSubmissions } from "@/components/TopicSubmissions";

export interface TopicWithTeacher extends Topic {
  teacher: Person;
}

async function getTopics(experimentId: number) {
  // query
  const topics = await prisma.topic.findMany({
    where: {
      experimentId: experimentId,
    },
    include: {
      teacher: true,
    },
  });
  return topics;
}

async function getExperimentName(experimentId: number) {
  const experiment = await prisma.experiment.findUnique({
    where: {
      id: experimentId,
    },
  });
  return experiment?.name;
}

async function getPeoplePreferences(experimentId: number) {
  const peoplePreferences = await prisma.person.findMany({
    where: {
      experimentId,
    },
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
  });
  return peoplePreferences;
}

export default async function Page({ params }: { params: { id: number } }) {
  const experimentId = Number(params.id);

  const [topics, stage, experimentName, peoplePreferences] = await Promise.all([
    getTopics(experimentId),
    getStage(experimentId),
    getExperimentName(experimentId),
    getPeoplePreferences(experimentId),
  ]);

  return (
    <Layout>
      <h1>{experimentName} Experiment</h1>
      {stage == Stage.SELECTIONS && (
        <div className="my-4">
          It's now time for people to select the topics they want to learn!
        </div>
      )}
      <TopicLink id={experimentId} stage={stage} />
      <div className="my-8">
        {stage == Stage.SELECTIONS ? (
          <>
            <FormTeamsButton experimentId={experimentId} />
            <UndoStageButton experimentId={experimentId} />
          </>
        ) : (
          <FinalizeTopicsButton experimentId={experimentId} />
        )}
      </div>
      <TopicSubmissions topics={topics} />
      <TopicPreferences peoplePreferences={peoplePreferences} />
    </Layout>
  );
}

const FormTeamsButton = ({ experimentId }: { experimentId: number }) => (
  <Button>Form teams</Button>
);

const TopicLink = ({ id, stage }: { id: number; stage: Stage | undefined }) => (
  <div>
    {stage == Stage.SELECTIONS
      ? "Topic selection link (same as before)"
      : "Topic submission link"}
    :{" "}
    <Link
      href={`/experiments/${id}/topic`}
      className="text-slate-600 hover:text-slate-500 font-semibold"
    >{`exp.dev/${id}/topic`}</Link>
  </div>
);
