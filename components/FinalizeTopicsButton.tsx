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

export const FinalizeTopicsButton = ({
  experimentId,
}: {
  experimentId: number;
}) => {
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
            onClick={() => setStage(experimentId, Stage.SELECTIONS)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
