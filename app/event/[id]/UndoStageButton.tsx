"use client";
import { Stage } from "@prisma/client";
import { setStage } from "@/utils/setStage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/Loader";

export const UndoStageButton = ({ eventId }: { eventId: number }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mt-2">
      <Loader isLoading={isLoading}>
        <a
          className="cursor-pointer text-gray-400 hover:text-gray-500  text-xs"
          onClick={async (e) => {
            setIsLoading(true);
            e.preventDefault();
            const stage = await setStage(eventId, Stage.SUBMISSIONS);
            router.refresh();
          }}
        >
          Undo topic finalization
        </a>
      </Loader>
    </div>
  );
};
