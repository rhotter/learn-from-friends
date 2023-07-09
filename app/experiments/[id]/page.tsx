// NextJS page that renders a single experiment
// takes in the experiment id

// Path: app/experiments/[id].tsx

import { Layout } from "@/components/basic-layout";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <Layout>
      <h1>Experiment {params.id}</h1>
    </Layout>
  );
}
