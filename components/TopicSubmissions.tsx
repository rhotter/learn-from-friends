import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Topic } from "../app/experiments/[id]/page";

interface TopicSubmissionsProps {
  topics: Topic[];
}

export function TopicSubmissions({ topics }: TopicSubmissionsProps) {
  return (
    <div className="my-4">
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
              <TableCell className="font-medium">{topic.name}</TableCell>
              <TableCell>{topic.topic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
