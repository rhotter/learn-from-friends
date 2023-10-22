import { TeachingBlock } from "@/app/event/[id]/FormGroups";
import { getPeoplePreferences } from "@/utils/getPeoplePreferences";
import { prisma } from "@/utils/prisma";
import { Person } from "@prisma/client";
import { NextResponse } from "next/server";

interface Response {
  costAchieved: number;
  status: string;
  results: TeachingBlock[];
}

export async function POST(req: Request) {
  const input = await req.json();
  const eventId = Number(input.eventId);

  // input optionally has an excludePresenterId field
  const excludePresenterId = input.excludePresenterId
    ? Number(input.excludePresenterId)
    : null;

  const peoplePreferences = await getPeoplePreferences(eventId);
  const peopleWithTopics = await prisma.person.findMany({
    where: {
      eventId,
    },
    include: {
      topic: true,
    },
  });

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error(`No event found with id ${eventId}`);
  }

  const idToPerson = new Map(
    peopleWithTopics.map((person) => [person.id, person])
  );

  const url = "https://learning-exp-api.vercel.app/solve";

  const data = {
    preferences: peoplePreferences.map((person) => ({
      name: person.id,
      out: person.preferences.map((pref) => pref.topic.teacher.id),
    })),
    n_blocks: 2,
    weights: Array.from({ length: event.numPreferences }, (_, i) => i + 1),
    low_priority_weight: 10,
    exclude_presenters: excludePresenterId ? [excludePresenterId] : [],
    first_time_people: [],
  };

  const headers = { "Content-Type": "application/json" };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseJson = await response.json();
  // console.log("responseJson");
  // console.log(JSON.stringify(responseJson, null, 2));

  const result = {
    costAchieved: responseJson.cost_achieved,
    status: responseJson.status,
    results: responseJson.results.map((block: any) => ({
      block: block.block,
      presentations: block.presentations.map((presentation: any) => ({
        presenter: idToPerson.get(Number(presentation.presenter)),
        listeners: presentation.listeners.map((id: number | string) =>
          idToPerson.get(Number(id))
        ),
      })),
    })),
  } as Response;

  // // console.log the nested results
  // console.log("response results");

  // console.log(JSON.stringify(result.results, null, 2));

  return NextResponse.json(result);
}
