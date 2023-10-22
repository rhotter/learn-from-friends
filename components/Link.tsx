// CustomLink.tsx
import React, { ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const Link: React.FC<CustomLinkProps> = ({ children, className, ...props }) => {
  return (
    <NextLink {...props} className={twMerge("hover:underline", className)}>
      {children}
    </NextLink>
  );
};

export default Link;
