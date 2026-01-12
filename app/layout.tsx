"use client";

import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/src/StoreProvider";

import { usePathname } from "next/navigation";
import TopActions from "@/src/components/TopActions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showTopIcons = pathname !== "/" && pathname !== "/members";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <StoreProvider>
          <div className="min-h-screen">

            {/* Top bar (NOT sticky) */}
            {showTopIcons && (
              <header className="w-full absolute  pt-1">
               
                  <div className="flex items-center gap-2">

                    <TopActions />
                  </div>
              
              </header>
            )}

            {/* Page content */}
            <main className="px-2 sm:px-4">{children}</main>

          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
