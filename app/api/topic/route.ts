import { prisma } from "@/utils/prisma";
import { Stage } from "@prisma/client";
import { NextResponse } from "next/server";

interface NewTopicInput {
  experimentId: string;
  personName: string;
  topic: string;
}

export async function POST(req: Request) {
  const newTopic: NewTopicInput = await req.json();

  // Check if experiment is still taking topic submissions
  const experiment = await prisma.experiment.findUnique({
    where: {
      id: Number(newTopic.experimentId),
    },
  });

  if (experiment?.stage !== Stage.SUBMISSIONS) {
    return NextResponse.json(
      {
        error: "Experiment is not accepting topic submissions",
      },
      { status: 403 }
    );
  }

  // Create a new person
  const person = await prisma.person.create({
    data: {
      name: newTopic.personName,
      experimentId: Number(newTopic.experimentId),
    },
  });

  // Create a new topic with the person as the teacher
  const topic = await prisma.topic.create({
    data: {
      name: newTopic.topic,
      experimentId: Number(newTopic.experimentId),
      teacherId: person.id,
    },
  });

  return NextResponse.json(topic);
}
