import Image from "next/image";

const SubmittedPage = () => (
  <div>
    <div>Submitted!</div>
    {/* center the image */}
    <div className="flex justify-center mt-4">
      <Image src="/donkey.png" alt="donkey" width={220} height={400} />
    </div>
  </div>
);

export default SubmittedPage;
