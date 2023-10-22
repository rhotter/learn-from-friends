import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

// Delete a topic
export async function POST(req: Request) {
  const { topicId } = await req.json();

  // Delete the preferences for this topic
  await prisma.preference.deleteMany({
    where: {
      topicId: Number(topicId),
    },
  });

  // find the people to delete
  const people = await prisma.person.findMany({
    where: {
      topic: {
        id: Number(topicId),
      },
    },
  });

  // Delete the topic
  const topic = await prisma.topic.delete({
    where: {
      id: Number(topicId),
    },
  });

  // Delete the people
  await prisma.person.deleteMany({
    where: {
      id: {
        in: people.map((person) => person.id),
      },
    },
  });

  return NextResponse.json(topic);
}
