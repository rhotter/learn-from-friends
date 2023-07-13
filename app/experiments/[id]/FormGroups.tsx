"use client";

import { useState } from "react";
import { UndoStageButton } from "./UndoStageButton";
import { FormGroupsButton } from "./FormGroupsButton";
import { Person, Topic } from "@prisma/client";
import { Groups } from "../Groups";

export interface TeachingBlock {
  block: string;
  presentations: Presentation[];
}

interface PersonWithTopic extends Person {
  topic: Topic;
}

interface Presentation {
  listeners: Person[];
  presenter: PersonWithTopic;
}

export const FormGroups = ({ experimentId }: { experimentId: number }) => {
  const [blocks, setBlocks] = useState<TeachingBlock[] | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  return (
    <>
      {status != "Optimal" && (
        <>
          <FormGroupsButton
            experimentId={experimentId}
            setBlocks={setBlocks}
            setStatus={setStatus}
          />
          <UndoStageButton experimentId={experimentId} />
        </>
      )}
      <Groups blocks={blocks} status={status} />
    </>
  );
};
