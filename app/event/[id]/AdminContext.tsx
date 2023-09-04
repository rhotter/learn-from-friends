import React from "react";
import { useSearchParams } from "next/navigation";

export const AdminContext = React.createContext(false);

export function useIsAdmin() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams!.get("admin") === "true";
  return isAdmin;
}
