"use client";

import { Loader2 } from "lucide-react";

export const Loader = ({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text: string;
}) => (isLoading ? <Loader2 className="animate-spin" /> : <span>text</span>);
