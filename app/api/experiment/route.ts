// make a new experiment

import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const experimentInput = await req.json();
  const experimentName = experimentInput.name;

  const experiment = await prisma.experiment.create({
    data: {
      name: experimentName,
    },
  });

  return NextResponse.json(experiment);
}
