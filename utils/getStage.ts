import { prisma } from "@/utils/prisma";

export const getStage = async (experimentId: number) => {
  const experiment = await prisma.experiment.findUnique({
    where: {
      id: experimentId,
    },
  });
  return experiment?.stage;
};
