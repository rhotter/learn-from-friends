import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import { prisma } from "@/utils/prisma";
import { Person, Stage, Topic } from "@prisma/client";
import { FinalizeTopicsButton } from "@/components/FinalizeTopicsButton";
import { TopicSubmissions } from "@/components/TopicSubmissions";
import { getStage } from "@/utils/getStage";
import { UndoStageButton } from "./UndoStageButton";
import { Button } from "@/components/ui/button";

export interface TopicWithTeacher extends Topic {
  teacher: Person;
}

async function getTopics(experimentId: number) {
  // query
  const topics = await prisma.topic.findMany({
    where: {
      experimentId: Number(experimentId),
    },
    include: {
      teacher: true,
    },
  });
  return topics;
}

export default async function Page({ params }: { params: { id: number } }) {
  const [topics, stage] = await Promise.all([
    getTopics(params.id),
    getStage(Number(params.id)),
  ]);

  const experimentId = params.id;

  return (
    <Layout>
      <h1>Experiment {experimentId}</h1>
      {stage == Stage.SELECTIONS && (
        <div className="my-4">
          It's now time for people to select the topics they want to learn!
        </div>
      )}
      <TopicLink id={experimentId} stage={stage} />
      <TopicSubmissions topics={topics} />
      {stage == Stage.SELECTIONS ? (
        <>
          <FormTeamsButton experimentId={experimentId} />
          <UndoStageButton experimentId={experimentId} />
        </>
      ) : (
        <FinalizeTopicsButton experimentId={experimentId} />
      )}
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
