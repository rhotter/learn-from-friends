import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

// Delete a topic
export async function POST(req: Request) {
  const { topicId } = await req.json();
  console.log({ topicId });

  // Delete the topic
  const topic = await prisma.topic.delete({
    where: {
      id: Number(topicId),
    },
  });

  return NextResponse.json(topic);
}
