import prisma from "@/utils/prisma";
import { Stage } from "@prisma/client";
import { NextResponse } from "next/server";

interface NewTopicInput {
  eventId: string;
  personName: string;
  topic: string;
}

export async function POST(req: Request) {
  const newTopicParams: NewTopicInput = await req.json();

  // Check if event is still taking topic submissions
  const event = await prisma.event.findUnique({
    where: {
      id: Number(newTopicParams.eventId),
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
      name: newTopicParams.personName,
      eventId: Number(newTopicParams.eventId),
      topic: {
        create: {
          name: newTopicParams.topic,
          eventId: Number(newTopicParams.eventId),
        },
      },
    },
  });

  return NextResponse.json(person);
}
