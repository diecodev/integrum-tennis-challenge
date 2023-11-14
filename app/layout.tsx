import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { HeaderWrapper } from "@root/components/general/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tennis League",
  description: "Design and code by diecodev - using next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <HeaderWrapper />
          <div className="p-4 max-w-screen-xl mx-auto">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
