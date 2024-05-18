"use client";

import { useIsAdmin } from "@/app/event/[id]/AdminContext";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export const AdminQrCode = ({
  message,
  route,
  baseUrl,
}: {
  message: string;
  route: string;
  baseUrl: string;
}) => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="mt-8 mx-auto max-w-sm border border-orange-300 p-4 bg-orange-100/50 rounded-md">
      {message}
      <br />
      <div className="flex justify-center mt-4">
        <Link href={`/${route}`}>
          <QRCodeSVG value={`${baseUrl}/${route}`} />
        </Link>
      </div>
    </div>
  );
};
