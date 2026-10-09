import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivaram Reddy | Full Stack Developer",
  description: "Personal portfolio of Shivaram Reddy. Full Stack Developer & AI/ML Enthusiast.",
};

export const viewport = {
  themeColor: "#f4f2ee"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
