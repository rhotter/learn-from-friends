import Link from "next/link";
import React from "react";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="p-6 sm:p-8 my-0 max-w-xl mx-4 sm:mx-auto bg-white rounded-xl">
        {children}
      </div>
    </div>
  );
};

const Nav: React.FC = () => (
  <div className="w-full p-4 text-primary-background ">
    <Link href="/">
      <h2 className="cursor-pointer text-orange-500">
        <span className="bg-white px-4 py-2 rounded-md">
          learn from friends
        </span>
      </h2>
    </Link>
  </div>
);
