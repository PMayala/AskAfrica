/* eslint-disable camelcase */
import React from "react";

import "./globals.css";
import "../styles/prism.css";

import { Providers } from "./Providers";

import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-inter",
// });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk ",
});

export const metadata: Metadata = {
  title: "AskAfrica Q&A Platform",
  description:
    "A community-driven Q&A platform designed to address the digital divide by providing a localized and inclusive knowledge-sharing platform tailored for African communities.",
  icons: {
    icon: "/assets/images/Cocoa Pod Fill.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} custom-scrollbar`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
