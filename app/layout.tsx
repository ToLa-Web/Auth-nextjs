import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Auth App",
  description: "Auth and CRUD operations with Laravel and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Toaster/>
          <Navbar/>
        {children}
        </AppProvider>
      </body>
    </html>
  );
}
