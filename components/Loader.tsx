"use client";

import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export const Loader = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) => (isLoading ? <Loader2 className="animate-spin" /> : <>{children}</>);
