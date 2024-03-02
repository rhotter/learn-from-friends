"use client";

import { useIsAdmin } from "./AdminContext";

export const TopicSelectionsInstructions = () => {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <div className="my-4">
      It's now time for people to select the topics they want to collaborate on!
    </div>
  );
};
