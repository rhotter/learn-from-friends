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
import { Loader } from "./Loader";
import { useIsAdmin } from "@/app/event/[id]/AdminContext";

export const FinalizeTopicsButton = ({ eventId }: { eventId: number }) => {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          Finalize topics
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you ready to finalize the topics?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You'll lock in the topics, and topic selections will open.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              setIsLoading(true);
              e.preventDefault();
              const stage = await setStage(eventId, Stage.SELECTIONS);
              router.refresh();
            }}
          >
            <Loader isLoading={isLoading}>Finalize topics</Loader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
