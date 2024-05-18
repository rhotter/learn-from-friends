import { Stage } from "@prisma/client";
import { TopicSubmission } from "./TopicSubmission";
import { getStage } from "@/utils/getStage";
import { TopicSelection } from "./TopicSelection";
import prisma from "@/utils/prisma";
import Link from "next/link";

export const revalidate = 0; // dynamic page

const getEvent = async (eventId: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  return event;
};

export default async function Page({ params }: { params: { id: any } }) {
  const eventId = Number(params.id);
  const event = await getEvent(eventId);

  const stage = await getStage(eventId);

  return (
    <div>
      {event && (
        <div className="pb-2 text-gray-500">
          <Link
            className="hover:underline"
            href={`/event/${eventId}`}
            prefetch={false}
          >
            {event.name}
          </Link>{" "}
        </div>
      )}
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
