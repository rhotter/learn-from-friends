"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  // get query parameter
  const searchParams = useSearchParams();
  const pageType = searchParams?.get("type");

  return (
    <div>
      <div>
        Submitted!{" "}
        {pageType === "submit" && (
          <Link href={`/event/${params.id}`} className="underline">
            View all topic submissions
          </Link>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Image src="/donkey.png" alt="donkey" width={220} height={400} />
      </div>
    </div>
  );
};

export default Page;
