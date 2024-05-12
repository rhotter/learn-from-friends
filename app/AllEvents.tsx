import Link from "@/components/Link";
import { NewEvent } from "@/components/NewEvent";
import prisma from "@/utils/prisma";
import { formatDistanceToNow } from "date-fns";

export const AllEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    cacheStrategy: {
      ttl: 60,
      swr: 60,
    },
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
    </div>
  );
};

const Event: React.FC<{
  id: number;
  name: string;
  date: Date;
}> = ({ name, date, id }) => (
  <Link href={`/event/${id}`} className="hover:no-underline">
    <div className="border p-4 border-secondary-background rounded-lg hover:bg-primary-foreground cursor-pointer">
      <h3 className="mb-2 text-foreground">{name}</h3>
      <p className="text-gray-500">{formatDate(date)}</p>
    </div>
  </Link>
);

const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
