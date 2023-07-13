import Link from "next/link";
import React, { ReactNode } from "react";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="">
      <Nav />
      <div className="px-4 py-8 max-w-lg mx-auto">{children}</div>
    </div>
  );
};

const Nav: React.FC = () => (
  <div className="w-full border-b p-4">
    <Link href="/">
      <h2
        className="cursor-pointer font-serif
      "
      >
        learn from friends
      </h2>
    </Link>
  </div>
);
