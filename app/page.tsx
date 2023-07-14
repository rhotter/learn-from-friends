import { Layout } from "@/components/basic-layout";
import Link from "next/link";
import React from "react";

import { prisma } from "@/utils/prisma";
import { NewEvent } from "@/components/NewEvent";
import { Event } from "@prisma/client";

export default async function Page() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <main>
      <Layout>
        <MyLearningEvent events={events} />
      </Layout>
    </main>
  );
}

// @ts-ignore async component
const MyLearningEvent = ({ events }: { events: Event[] }) => {
  return (
    <div>
      <h1>My Learning Events</h1>
      <div className="flex flex-col gap-2">
        {events.map((event) => (
          <Event id={event.id} name={event.name} date={event.date} />
        ))}
        <NewEvent />
      </div>
    </div>
  );
};

const Event: React.FC<{
  id: number;
  name: string;
  date: Date;
}> = ({ name, date, id }) => (
  <Link href={`/event/${id}`}>
    <div className="border p-4 border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
      <h3 className="mb-2">{name}</h3>
      <p className="text-gray-500">{date.toDateString()}</p>
    </div>
  </Link>
);
