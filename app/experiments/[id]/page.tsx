import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import { prisma } from "@/utils/prisma";
import { Person, Stage, Topic } from "@prisma/client";
import { FinalizeTopicsButton } from "@/components/FinalizeTopicsButton";
import { TopicSubmissions } from "@/components/TopicSubmissions";

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

const getStage = async (experimentId: number) => {
  const experiment = await prisma.experiment.findUnique({
    where: {
      id: Number(experimentId),
    },
  });
  return experiment?.stage;
};

export default async function Page({ params }: { params: { id: number } }) {
  const [topics, stage] = await Promise.all([
    getTopics(params.id),
    getStage(params.id),
  ]);

  return (
    <Layout>
      <h1>Experiment {params.id}</h1>
      {stage == Stage.SELECTIONS && (
        <div className="my-4">
          It's now time for people to select the topics they want to learn!
        </div>
      )}
      <TopicLink id={params.id} stage={stage} />

      <TopicSubmissions topics={topics} />
      <FinalizeTopicsButton experimentId={params.id} />
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
      href={`/experiments/${id}/topic`}
      className="text-slate-600 hover:text-slate-500 font-semibold"
    >{`exp.dev/${id}/topic`}</Link>
  </div>
);
