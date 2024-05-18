import React from "react";

import { AllEvents } from "./AllEvents";
import { NewEvent } from "@/components/NewEvent";
import Link from "next/link";

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
        <CodeLinks />
      </div>
    </main>
  );
}

const CodeLinks = () => {
  return (
    <div className="pt-8">
      <div className="w-full border-t border-gray-300 mb-8"></div>
      <div className="flex justify-center">
        <Link
          href="https://github.com/rhotter/learn-from-friends"
          className="text-gray-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          source code
        </Link>
      </div>
    </div>
  );
};
