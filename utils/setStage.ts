import { Stage } from "@prisma/client";

export const setStage = (experimentId: number, stage: Stage) => {
  // tell the db that the topics are finalized
  const res = fetch("/api/experiment/stage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      experimentId,
      stage,
    }),
  });

  return res;
};
