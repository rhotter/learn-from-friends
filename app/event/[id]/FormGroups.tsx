"use client";

import { useState } from "react";
import { UndoStageButton } from "./UndoStageButton";
import { FormGroupsButton } from "./FormGroupsButton";
import { Person, Topic } from "@prisma/client";
import { Groups } from "../Groups";
import { PersonPreferences } from "@/components/TopicPreferences";

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

export const FormGroups = ({
  eventId,
  peoplePreferences,
}: {
  eventId: number;
  peoplePreferences: PersonPreferences[];
}) => {
  const [blocks, setBlocks] = useState<TeachingBlock[] | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const isAllPeoplePreferencesFilled = peoplePreferences.every(
    (person) => person.preferences.length > 0
  );

  return (
    <>
      {status != "Optimal" && (
        <>
          <FormGroupsButton
            eventId={eventId}
            setBlocks={setBlocks}
            setStatus={setStatus}
            disabled={!isAllPeoplePreferencesFilled}
            peoplePreferences={peoplePreferences}
          />
          <UndoStageButton eventId={eventId} />
        </>
      )}
      <Groups blocks={blocks} status={status} />
    </>
  );
};
