import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/shared/TopBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Threads",
    description: "Discover the future of messaging with our Threads clone app, built on Next.js 14. Lightning-fast, intuitive, and scalable, it redefines collaboration. Experience seamless communication like never before."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <main className="flex">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <RightSidebar />
        </main>
        <BottomBar />
        </body>
    </html>
  </ClerkProvider>
  );
}
