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
