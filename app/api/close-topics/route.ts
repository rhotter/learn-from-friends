import { prisma } from "@/utils/prisma";
import { Stage } from "@prisma/client";
import { NextResponse } from "next/server";

interface CloseTopicInput {
  experimentId: string;
}

export async function POST(req: Request) {
  const closeTopics: CloseTopicInput = await req.json();

  // update the experiment
  const experiment = await prisma.experiment.update({
    where: {
      id: Number(closeTopics.experimentId),
    },
    data: {
      stage: Stage.SELECTIONS,
    },
  });

  return NextResponse.json(experiment);
}
