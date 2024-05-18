import Link from "next/link";
import React from "react";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="pb-4">
      <Nav />
      <div className="p-6 sm:p-8 my-0 max-w-xl mx-4 sm:mx-auto bg-white rounded-xl">
        {children}
      </div>
    </div>
  );
};

const Nav: React.FC = () => (
  <div className="w-full p-4 text-primary-background ">
    <Link href="/" className="hover:underline">
      <h2 className="cursor-pointer">
        <span className="bg-white px-4 py-2 rounded-md font-mono">
          learn from friends
        </span>
      </h2>
    </Link>
  </div>
);
