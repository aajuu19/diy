import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import Providers from "@/components/core/Providers";
import clsx from "clsx";
import { Footer, Navigation } from "@/components/core";

const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={clsx(merriWeather.className, "text-neutral leading-7")}>
        <Providers>
          <Navigation />
          <main className="mt-20 py-14">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
