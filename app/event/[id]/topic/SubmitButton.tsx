// submit topics
"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";

export const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
  <>
    <Button type="submit">
      <Loader isLoading={isLoading}>Submit</Loader>
    </Button>
  </>
);
