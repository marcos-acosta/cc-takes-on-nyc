import type { Metadata } from "next";
import "./globals.css";
import { AZARET } from "./fonts";

export const metadata: Metadata = {
  title: "CC vs. NYC",
  description: "Creative coding scavenger hunt for CCNYC's 2-year anniversary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={AZARET.className}>{children}</body>
    </html>
  );
}
