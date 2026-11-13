import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "go2ways — Intelligent AI Bot Assistant",
  description:
    "go2ways connects data, assets, people and workflows into one intelligent operational view.",
  icons: {
    icon: "/assets/img/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
