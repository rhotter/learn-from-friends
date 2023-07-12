import { Layout } from "@/components/basic-layout";
import { Stage } from "@prisma/client";
import { TopicSubmission } from "./TopicSubmission";
import { getStage } from "@/utils/getStage";
import { TopicSelection } from "./TopicSelection";

export default async function Page({ params }: { params: { id: number } }) {
  const experimentId = Number(params.id);

  const stage = await getStage(experimentId);

  return (
    <Layout>
      {stage == Stage.SELECTIONS ? (
        <>
          {/* @ts-expect-error Server Component */}
          <TopicSelection experimentId={experimentId} />
        </>
      ) : (
        <TopicSubmission experimentId={experimentId} />
      )}
    </Layout>
  );
}
