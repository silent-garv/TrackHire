/**
 * Root Layout
 * Provides the base HTML structure and global styling with MUI Theme
 * Server Component - runs only on the server
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutClient } from "./layout-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Job Tracker",
  description:
    "Track your job applications and manage your job search journey",
  keywords: "job tracker, job applications, career management",
  creator: "Your Name",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
