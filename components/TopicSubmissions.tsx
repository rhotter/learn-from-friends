import { TopicWithTeacher } from "@/app/event/[id]/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopicSubmissionsProps {
  topics: TopicWithTeacher[];
}

export function TopicSubmissions({ topics }: TopicSubmissionsProps) {
  return (
    <div className="my-8">
      <h2 className="font-semibold mb-4">Topic Submissions</h2>
      {topics.length === 0 ? (
        <div className="text-slate-500 text-sm">
          No topics have been submitted yet.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Topic</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.map((topic, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {topic.teacher.name}
                </TableCell>
                <TableCell>{topic.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}