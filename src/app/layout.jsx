import dynamic from "next/dynamic";

const ClientOnlyLayout = dynamic(() => import("@/components/common/ClientOnlyComps"), {
  ssr: false,
})

import Footer from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pakmart",
  description: "Created by Fahad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900`}>
        <ClientOnlyLayout />
        {children}
        <Footer />
      </body>
    </html>
  );
}
