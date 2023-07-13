import { Stage } from "@prisma/client";

export const setStage = (eventId: number, stage: Stage) => {
  // tell the db that the topics are finalized
  const res = fetch("/api/event/stage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId,
      stage,
    }),
  });

  return res;
};
