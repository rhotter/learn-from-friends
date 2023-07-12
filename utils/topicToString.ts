import { TopicWithTeacher } from "@/app/experiments/[id]/page";

export const topicToString = (topic: TopicWithTeacher) => {
  return `${topic.name} (${topic.teacher.name})`;
};
