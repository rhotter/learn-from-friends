"use client";
import { Stage } from "@prisma/client";
import { setStage } from "@/utils/setStage";
import { useRouter } from "next/navigation";

export const UndoStageButton = ({ experimentId }: { experimentId: number }) => {
  const router = useRouter();

  return (
    <div className="mt-2">
      <a
        className="cursor-pointer text-slate-400 hover:text-slate-500  text-xs"
        onClick={async (e) => {
          e.preventDefault();
          const stage = await setStage(experimentId, Stage.SUBMISSIONS);
          router.refresh();
        }}
      >
        Undo topic finalization
      </a>
    </div>
  );
};
