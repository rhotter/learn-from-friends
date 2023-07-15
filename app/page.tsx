import { Layout } from "@/components/basic-layout";
import React from "react";

import { AllEvents } from "./AllEvents";

export const revalidate = 0; // dynamic page

export default async function Page() {
  return (
    <main>
      <Layout>
        <div>
          <h1>Learning Events</h1>
          {/* @ts-ignore async component */}
          <AllEvents />
        </div>
      </Layout>
    </main>
  );
}
