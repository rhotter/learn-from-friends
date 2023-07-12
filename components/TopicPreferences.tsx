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

interface PersonPreferences extends Person {
  preferences: PreferenceWithTopic[];
}

const getTopicOfRank = (preferences: PreferenceWithTopic[], rank: number) => {
  const preference = preferences.find((preference) => preference.rank == rank);
  if (preference) {
    return topicToString(preference.topic);
  }
  return "";
};

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
          {peoplePreferences.map((person, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{person.name}</TableCell>
              <TableCell>{getTopicOfRank(person.preferences, 1)}</TableCell>
              <TableCell>{getTopicOfRank(person.preferences, 2)}</TableCell>
              <TableCell>{getTopicOfRank(person.preferences, 3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
