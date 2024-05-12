import { Layout } from "@/components/basic-layout";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn from friends",
  description: "Learn things from friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
