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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
