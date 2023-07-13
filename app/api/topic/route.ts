import { prisma } from "@/utils/prisma";
import { Stage } from "@prisma/client";
import { NextResponse } from "next/server";

interface NewTopicInput {
  eventId: string;
  personName: string;
  topic: string;
}

export async function POST(req: Request) {
  const newTopic: NewTopicInput = await req.json();

  // Check if event is still taking topic submissions
  const event = await prisma.event.findUnique({
    where: {
      id: Number(newTopic.eventId),
    },
  });

  if (event?.stage !== Stage.SUBMISSIONS) {
    return NextResponse.json(
      {
        error: "Event is not accepting topic submissions",
      },
      { status: 403 }
    );
  }

  // Create a new person
  const person = await prisma.person.create({
    data: {
      name: newTopic.personName,
      eventId: Number(newTopic.eventId),
    },
  });

  // Create a new topic with the person as the teacher
  const topic = await prisma.topic.create({
    data: {
      name: newTopic.topic,
      eventId: Number(newTopic.eventId),
      teacherId: person.id,
    },
  });

  return NextResponse.json(topic);
}
