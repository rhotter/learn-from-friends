"use client";

import { useIsAdmin } from "@/app/event/[id]/AdminContext";
import { TopicWithTeacher } from "@/app/event/[id]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Person, Preference } from "@prisma/client";
import ordinal from "ordinal";

interface PreferenceWithTopic extends Preference {
  topic: TopicWithTeacher;
}

export interface PersonPreferences extends Person {
  preferences: PreferenceWithTopic[];
}

export function TopicPreferences({
  peoplePreferences,
  numPreferences,
}: {
  peoplePreferences: PersonPreferences[];
  numPreferences: number;
}) {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="my-8 overflow">
      <h2 className="font-semibold mb-4">Preferences</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            {Array.from({ length: numPreferences }).map((_, index) => (
              <TableHead key={index}>{`${ordinal(
                index + 1
              )} choice`}</TableHead>
            ))}
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
                  <TableCell key={topic.id}>
                    {topic.topic.name}{" "}
                    <span className="text-gray-400">
                      ({topic.topic.teacher.name})
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
