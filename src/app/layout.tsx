import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Yanone_Kaffeesatz } from "next/font/google";
import Header from "@/components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const yanone = Yanone_Kaffeesatz({
  subsets: ["latin"],
  variable: "--font-yanone",
});

export const metadata: Metadata = {
  title: "GreenGoods",
  description: "Purchase green products and win vouchers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${yanone.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
