import { prisma } from "@/utils/prisma";

export async function getPeoplePreferences(experimentId: number) {
  const peoplePreferences = await prisma.person.findMany({
    where: {
      experimentId,
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
