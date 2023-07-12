// submit topics
"use client";
import { Button } from "@/components/ui/button";

export const SubmitButton = ({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) => <Button type="submit">{isLoading ? "Submitting..." : "Submit"}</Button>;
