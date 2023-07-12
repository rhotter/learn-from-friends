import { Layout } from "@/components/basic-layout";
import { Stage } from "@prisma/client";
import { TopicSelection } from "./TopicSelection";
import { TopicSubmission } from "./TopicSubmission";
import { getStage } from "@/utils/getStage";

export default async function Page({ params }: { params: { id: number } }) {
  const experimentId = params.id;

  const stage = await getStage(experimentId);

  return (
    <Layout>
      {stage == Stage.SELECTIONS ? (
        <TopicSelection experimentId={experimentId} />
      ) : (
        <TopicSubmission experimentId={experimentId} />
      )}
    </Layout>
  );
}
