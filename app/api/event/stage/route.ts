import { prisma } from "@/utils/prisma";
import { Stage } from "@prisma/client";
import { NextResponse } from "next/server";

interface StageInput {
  eventId: string;
  stage: Stage;
}

export async function POST(req: Request) {
  const stageInput: StageInput = await req.json();

  // update the event
  const event = await prisma.event.update({
    where: {
      id: Number(stageInput.eventId),
    },
    data: {
      stage: stageInput.stage,
    },
  });

  if (stageInput.stage === Stage.SUBMISSIONS) {
    // whipe out all the preferences for this event
    await prisma.preference.deleteMany({
      where: {
        eventId: Number(stageInput.eventId),
      },
    });
  }

  return NextResponse.json(event);
}
