import { prisma } from "@/utils/prisma";
import { Stage } from "@prisma/client";
import { NextResponse } from "next/server";

interface StageInput {
  experimentId: string;
  stage: Stage;
}

export async function POST(req: Request) {
  const stageInput: StageInput = await req.json();

  // update the experiment
  const experiment = await prisma.experiment.update({
    where: {
      id: Number(stageInput.experimentId),
    },
    data: {
      stage: stageInput.stage,
    },
  });

  if (stageInput.stage === Stage.SUBMISSIONS) {
    // whipe out all the preferences for this experiment
    await prisma.preference.deleteMany({
      where: {
        experimentId: Number(stageInput.experimentId),
      },
    });
  }

  return NextResponse.json(experiment);
}
