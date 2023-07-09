// NextJS page that renders a single experiment
// takes in the experiment id

import { Layout } from "@/components/basic-layout";
import Link from "next/link";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <Layout>
      <h1>Experiment {params.id}</h1>
      <div>
        Topic submission link:{" "}
        <Link
          href={`/experiments/${params.id}/topic`}
          className="text-slate-600 hover:text-slate-500 font-semibold"
        >{`exp.dev/${params.id}/topic`}</Link>
      </div>
    </Layout>
  );
}
