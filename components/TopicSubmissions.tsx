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
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopicSubmissionsProps {
  topics: TopicWithTeacher[];
}

export function TopicSubmissions({ topics }: TopicSubmissionsProps) {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/topic-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topicId: id }),
      });
      if (!response.ok) {
        throw new Error("Error deleting topic");
      }
      // Reload the page after deleting
      router.refresh();
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-8">
      <h2 className="font-semibold mb-4">Topic Submissions</h2>
      {topics.length === 0 ? (
        <div className="text-gray-500 text-sm">
          No topics have been submitted yet.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-background">
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
                <TableCell>
                  <div className="flex justify-between items-center">
                    <span>{topic.name}</span>
                    <DeleteButton handleDelete={handleDelete} topic={topic} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

const DeleteButton = ({
  handleDelete,
  topic,
}: {
  handleDelete: (id: number) => Promise<void>;
  topic: TopicWithTeacher;
}) => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return <></>;
  }

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setIsDeleting(true);
        handleDelete(topic.id).then(() => setIsDeleting(true));
      }}
      className="text-gray-500/50 hover:text-gray-800 transition-colors duration-200"
    >
      {isDeleting ? <span>deleting...</span> : <XCircleIcon size={18} />}
    </button>
  );
};
