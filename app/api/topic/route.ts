import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

interface NewTopicInput {
  experimentId: string;
  personName: string;
  topic: string;
}

export async function POST(req: Request) {
  const newTopic: NewTopicInput = await req.json();

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
