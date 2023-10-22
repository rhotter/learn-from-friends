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

  // Delete the pereson for this topic
  await prisma.person.deleteMany({
    where: {
      topicId: Number(topicId),
    },
  });

  // Delete the topic
  const topic = await prisma.topic.delete({
    where: {
      id: Number(topicId),
    },
  });

  return NextResponse.json(topic);
}
