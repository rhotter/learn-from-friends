"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TeachingBlock } from "./FormGroups";

export const FormGroupsButton = ({
  experimentId,
  setBlocks,
  setStatus,
}: {
  experimentId: number;
  setBlocks: (blocks: TeachingBlock[]) => void;
  setStatus: (status: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(`/api/groups`, {
        method: "POST",
        body: JSON.stringify({ experimentId }),
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
    <Button onClick={handleOnClick}>
      {isLoading ? "Forming groups..." : "Form groups"}
    </Button>
  );
};
