// submit topics
"use client";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";

export const SubmitButton = ({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) => (
  <Button type="submit">
    <Loader isLoading={isLoading} text="Submit" />
  </Button>
);
