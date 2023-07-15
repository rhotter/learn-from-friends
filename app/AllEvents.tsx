import { NewEvent } from "@/components/NewEvent";
import { prisma } from "@/utils/prisma";
import Link from "next/link";

export const AllEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <Event
          id={event.id}
          name={event.name}
          date={event.date}
          key={event.id}
        />
      ))}
      <NewEvent />
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
