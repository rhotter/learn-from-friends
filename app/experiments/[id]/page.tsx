import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import { TopicSubmissions } from "../../../components/TopicSubmissions";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export interface Topic {
  name: string;
  topic: string;
}

async function getTopics() {
  const res = await fetch(`http://localhost:3000/api/experiment_topics`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const topics: Topic[] = await res.json();
  return topics;
}

export default async function Page({ params }: { params: { id: number } }) {
  const topics = await getTopics();

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
