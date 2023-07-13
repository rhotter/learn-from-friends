"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TeachingBlock } from "./FormGroups";
import { Loader } from "@/components/Loader";
import { ChevronRight } from "lucide-react";

export const FormGroupsButton = ({
  eventId,
  setBlocks,
  setStatus,
  disabled,
}: {
  eventId: number;
  setBlocks: (blocks: TeachingBlock[]) => void;
  setStatus: (status: string) => void;
  disabled?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(`/api/groups`, {
        method: "POST",
        body: JSON.stringify({ eventId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultJson = await result.json();
      setBlocks(resultJson.results);
      setStatus(resultJson.status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleOnClick} disabled={disabled}>
      <Loader isLoading={isLoading}>
        Form groups
        <ChevronRight className="ml-2 h-4 w-4" />
      </Loader>
    </Button>
  );
};
