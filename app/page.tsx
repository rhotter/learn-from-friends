import React from "react";

import { AllEvents } from "./AllEvents";
import { NewEvent } from "@/components/NewEvent";

export const revalidate = 0; // dynamic page

export default async function Page() {
  return (
    <main>
      <div className="font-mono text-sm">
        <div className="flex justify-between items-center pb-4">
          <div className="text-2xl font-semibold font-mono">Events</div>
          <NewEvent />
        </div>
        {/* @ts-ignore async component */}
        <AllEvents />
      </div>
    </main>
  );
}
