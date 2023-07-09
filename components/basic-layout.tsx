import Link from "next/link";
import React, { ReactNode } from "react";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="">
      <Nav />
      <div className="p-4">{children}</div>
    </div>
  );
};

const Nav: React.FC = () => (
  <div className="w-full border-b p-4">
    <Link href="/">
      <h2 className="text-lg font-semibold cursor-pointer">
        Learning Experiment
      </h2>
    </Link>
  </div>
);
