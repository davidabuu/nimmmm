"use client";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/src/StoreProvider";
import { FiSearch, FiBell } from "react-icons/fi"; // Import icons from react-icons
import Link from "next/link";
import { usePathname } from "next/navigation";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative mb-2 min-h-screen">
          {/* Top-right icons */}
          {pathname !== "/" && ( // Conditionally render the icons
            <div className="absolute top-3 right-4 z-50 flex items-center">
              <button
                aria-label="Search"
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FiSearch className="text-xl" />
              </button>
              <Link href="/notification">
                <button
                  aria-label="Notifications"
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiBell className="text-xl" />
                </button>
              </Link>
            </div>
          )}

          {/* Main content */}
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
