import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import { TopicSubmissions } from "../../../components/TopicSubmissions";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/utils/prisma";
import { Person, Topic } from "@prisma/client";

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
  const topics = await getTopics(params.id);

  return (
    <Layout>
      <h1>Experiment {params.id}</h1>
      <TopicSubmissionLink id={params.id} />
      <TopicSubmissions topics={topics} />
      <Button>
        Finalize topics
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </Layout>
  );
}

const TopicSubmissionLink = ({ id }: { id: number }) => (
  <div>
    Topic submission link:{" "}
    <Link
      href={`/experiments/${id}/topic`}
      className="text-slate-600 hover:text-slate-500 font-semibold"
    >{`exp.dev/${id}/topic`}</Link>
  </div>
);
