import { prisma } from "@/utils/prisma";

export async function getPeoplePreferences(eventId: number) {
  const peoplePreferences = await prisma.person.findMany({
    where: {
      eventId,
    },
    include: {
      preferences: {
        include: {
          topic: {
            include: {
              teacher: true,
            },
          },
        },
      },
    },
  });
  return peoplePreferences;
}
