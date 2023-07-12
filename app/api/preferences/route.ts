import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

interface PreferenceInput {
  personId: number;
  experimentId: number;
  firstChoice: number;
  secondChoice: number;
  thirdChoice: number;
}

export async function POST(req: Request) {
  const preferenceInput: PreferenceInput = await req.json();

  const preferences = await prisma.preference.createMany({
    data: [
      {
        personId: preferenceInput.personId,
        experimentId: preferenceInput.experimentId,
        topicId: preferenceInput.firstChoice,
        rank: 1,
      },
      {
        personId: preferenceInput.personId,
        experimentId: preferenceInput.experimentId,
        topicId: preferenceInput.secondChoice,
        rank: 2,
      },
      {
        personId: preferenceInput.personId,
        experimentId: preferenceInput.experimentId,
        topicId: preferenceInput.thirdChoice,
        rank: 3,
      },
    ],
  });

  return NextResponse.json(preferences);
}
