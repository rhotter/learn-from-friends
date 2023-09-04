import { Loader } from "@/components/Loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    // center the div
    <div className="flex justify-center">
      <Loader isLoading={true}>{}</Loader>
    </div>
  );
}
