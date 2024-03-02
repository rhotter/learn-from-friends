import Link from "next/link";
import React from "react";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="">
      <Nav />
      <div className="px-4 py-8 max-w-xl mx-auto">{children}</div>
    </div>
  );
};

const Nav: React.FC = () => (
  <div className="w-full border-b p-4 text-primary-background">
    <Link href="/">
      <h2 className="cursor-pointer text-orange-500">collaborate with friends</h2>
    </Link>
  </div>
);
