import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

interface PreferenceInput {
  personId: number;
  eventId: number;
  firstChoice: number;
  secondChoice: number;
  thirdChoice: number;
}

const upsertPreference = async (
  personId: number,
  eventId: number,
  topicId: number,
  rank: number
) => {
  return await prisma.preference.upsert({
    where: {
      personId_rank_eventId: {
        personId,
        eventId,
        rank,
      },
    },
    update: {
      rank,
    },
    create: {
      personId,
      eventId,
      topicId,
      rank,
    },
  });
};

export async function POST(req: Request) {
  const preferenceInput: PreferenceInput = await req.json();

  // check if the person has already submitted preferences for this event
  const existingPreferences = await prisma.preference.findMany({
    where: {
      personId: preferenceInput.personId,
      eventId: preferenceInput.eventId,
    },
  });

  const alreadySubmitted = existingPreferences.length > 0;

  const firstPreference = await upsertPreference(
    preferenceInput.personId,
    preferenceInput.eventId,
    preferenceInput.firstChoice,
    1
  );

  const secondPreference = await upsertPreference(
    preferenceInput.personId,
    preferenceInput.eventId,
    preferenceInput.secondChoice,
    2
  );

  const thirdPreference = await upsertPreference(
    preferenceInput.personId,
    preferenceInput.eventId,
    preferenceInput.thirdChoice,
    3
  );

  return NextResponse.json({
    alreadySubmitted,
    preferences: [firstPreference, secondPreference, thirdPreference],
  });
}
