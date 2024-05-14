import Link from "@/components/Link";
import prisma from "@/utils/prisma";

export const AllEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    cacheStrategy: {
      ttl: 60,
      swr: 60,
    },
  });

  return (
    <div className="flex flex-col gap-4">
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
  <span className="before:content-['•'] before:mr-2 mb-2 text-foreground">
    <Link href={`/event/${id}`} className="hover:text-gray-500">
      <span className="underline" style={{ textDecorationColor: "gray" }}>
        {name}
      </span>
    </Link>
    <span className="text-gray-500"> ({formatDate(date)})</span>
  </span>
);

const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
