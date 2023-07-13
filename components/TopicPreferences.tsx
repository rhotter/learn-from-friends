import { TopicWithTeacher } from "@/app/experiments/[id]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { topicToString } from "@/utils/topicToString";
import { Person, Preference } from "@prisma/client";

interface PreferenceWithTopic extends Preference {
  topic: TopicWithTeacher;
}

export interface PersonPreferences extends Person {
  preferences: PreferenceWithTopic[];
}

export function TopicPreferences({
  peoplePreferences,
}: {
  peoplePreferences: PersonPreferences[];
}) {
  return (
    <div className="my-8 overflow">
      <h2 className="font-semibold mb-4">Preferences</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>First choice</TableHead>
            <TableHead>Second choice</TableHead>
            <TableHead>Third choice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {peoplePreferences.map((person, index) => {
            const topicsRanked = person.preferences.sort(
              (a, b) => a.rank - b.rank
            );
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{person.name}</TableCell>
                {topicsRanked.map((topic) => (
                  <TableCell>
                    {topic.topic.name}{" "}
                    <span className="text-slate-400">
                      by {topic.topic.teacher.name}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
