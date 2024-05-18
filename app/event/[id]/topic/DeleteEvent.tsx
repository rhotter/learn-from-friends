"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Stage } from "@prisma/client";
import { setStage } from "@/utils/setStage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import { useIsAdmin } from "@/app/event/[id]/AdminContext";

export const DeleteEvent = ({ eventId }: { eventId: number }) => {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="underline text-gray-500 text-sm cursor-pointer">
          Delete event
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this event?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              setIsLoading(true);
              e.preventDefault();
              const res = await fetch(`/api/event`, {
                body: JSON.stringify({ id: eventId }),
                method: "DELETE",
              });
              if (res.status === 200) {
                router.refresh();
              } else {
                const message = await res.json();
                console.error("Failed to delete event:", message);
                setIsLoading(false);
              }
            }}
          >
            <Loader isLoading={isLoading}>Delete</Loader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
