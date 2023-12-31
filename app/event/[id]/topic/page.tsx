import { Stage } from "@prisma/client";
import { TopicSubmission } from "./TopicSubmission";
import { getStage } from "@/utils/getStage";
import { TopicSelection } from "./TopicSelection";

export const revalidate = 0; // dynamic page

export default async function Page({ params }: { params: { id: any } }) {
  const eventId = Number(params.id);

  const stage = await getStage(eventId);

  return (
    <div>
      {stage == Stage.SELECTIONS ? (
        <>
          {/* @ts-expect-error Server Component */}
          <TopicSelection eventId={eventId} />
        </>
      ) : (
        <TopicSubmission eventId={eventId} />
      )}
    </div>
  );
}
