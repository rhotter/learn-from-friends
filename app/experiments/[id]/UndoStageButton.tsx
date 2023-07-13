"use client";
import { Stage } from "@prisma/client";
import { setStage } from "@/utils/setStage";

export const UndoStageButton = ({ experimentId }: { experimentId: number }) => {
  // get router

  return (
    <div className="mt-2">
      <a
        className="cursor-pointer text-slate-400 hover:text-slate-500  text-xs"
        onClick={(e) => {
          setStage(experimentId, Stage.SUBMISSIONS);
          // reset the page
          window.location.reload();
        }}
      >
        Undo topic finalization
      </a>
    </div>
  );
};
