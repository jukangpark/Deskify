import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navigation from "./components/layout/Navigation";
import Feed from "./components/layout/Feed";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deskify",
  description:
    "Deskify is a social networking platform where people showcase and share their personalized desk setups with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/DeskifyLogo.png" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          <div className="flex">
            {/* Navigation 이 fixed 이기 때문에 div 요소로 영역을 잡기 위함임 */}
            <div className="w-[0px] sm:w-[100px] md:w-[240px]">
              <Navigation />
            </div>
            <Feed>{children}</Feed>
          </div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
