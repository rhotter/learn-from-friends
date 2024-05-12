import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

interface PreferenceInput {
  personId: number;
  eventId: number;
  choices: number[]; // An array of topicIds, where the index represents the rank
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
      topicId,
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

  // Upsert each choice
  const preferences = await Promise.all(
    preferenceInput.choices.map((choice, index) =>
      upsertPreference(
        preferenceInput.personId,
        preferenceInput.eventId,
        choice,
        index + 1 // rank starts from 1
      )
    )
  );

  return NextResponse.json({
    alreadySubmitted,
    preferences,
  });
}
