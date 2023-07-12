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

  return NextResponse.json(experiment);
}
