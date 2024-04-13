import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";


export const metadata: Metadata = {
    title: "Threads",
    description: "Discover the future of messaging with our Threads clone app, built on Next.js 14. Lightning-fast, intuitive, and scalable, it redefines collaboration. Experience seamless communication like never before."
}

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
 return (
    <ClerkProvider>
        <html lang="en">
            <body className={`${inter.className} flex`}>
                {children}
            </body>
        </html>
    </ClerkProvider>
 )   
}