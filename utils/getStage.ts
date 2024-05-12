import prisma from "@/utils/prisma";
export const getStage = async (eventId: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  return event?.stage;
};
