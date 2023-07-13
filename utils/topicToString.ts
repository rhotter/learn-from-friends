import { TopicWithTeacher } from "@/app/event/[id]/page";

export const topicToString = (topic: TopicWithTeacher) => {
  return `${topic.name} (${topic.teacher.name})`;
};
