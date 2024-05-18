// make a new event

import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const eventInput = await req.json();
  const eventName = eventInput.name;

  const event = await prisma.event.create({
    data: {
      name: eventName,
    },
  });

  return NextResponse.json(event);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    const event = await prisma.event.delete({
      where: {
        id: Number(id),
      },
      include: {
        preferences: true,
        people: true,
        topics: true,
      },
    });
    return NextResponse.json({ message: "Event deleted successfully", event });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
