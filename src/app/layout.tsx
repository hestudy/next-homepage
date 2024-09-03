import "@/styles/globals.css";
import "@fontsource/anton";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next HomePage",
  description: "Next HomePage | All in one place",
  keywords: ["Next", "HomePage", "All in one place"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "h-screen overflow-hidden bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TooltipProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </TooltipProvider>
        <Toaster></Toaster>
      </body>
    </html>
  );
}
