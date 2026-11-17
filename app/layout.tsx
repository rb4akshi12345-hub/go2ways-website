import type { Metadata } from "next";
import "./globals.css";
import "./homepage.css";
import "./industries.css";
import "./company.css";
import "./contact.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "go2ways — Enterprise Asset Management & Technology Solutions",
  description:
    "Engineering smarter enterprise operations through IBM Maximo, MAS migration, enterprise integration, cloud infrastructure, and 24/7 managed support.",
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
