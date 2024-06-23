import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import ToastProvider from "./ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catchy URL - URL Shortener and Customizer by Khilfienite",
  description: "Shorten URL and customize links with catchy, descriptive, and expressive way to make attract people clicking your links.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-200"}>
        <header>
          <div className="flex justify-center align-middle bg-white">
            <Link href={process.env.LOCAL_DOMAIN || ''}>
              <Image
              title="Catchy URL - URL Shortener and Customizer by KhilfiKhairulAmin"
                src="/catchyUrl.png"
                alt="Catchy URL Logo"
                width={235}
                height={37}
                priority
                className=" mt-3 mb-2"
              />
            </Link>
          </div>
          <hr className=" border-gray-300 border-2" />
        </header>
        <main>
          <div className="flex justify-center mt-10 w-full">
          <ToastProvider>
            {children}
          </ToastProvider>
          </div>
        </main>
        <footer>
          <div className="flex justify-center w-full">
            <p className="text-sm text-gray-500 text-center mt-4">
              Created by <Link href="https://github.com/KhilfiKhairulAmin">KhilfiKhairulAmin</Link> for <Link href="https://github.com/iZERITH">iZERITH</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
