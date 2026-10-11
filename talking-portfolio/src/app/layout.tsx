import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shivaramreddy.dev"),
  title: "Shivaram Reddy | Full Stack Developer & Computer Science Student",
  description: "Personal portfolio of Shivaram Reddy. B.Tech Computer Science student at NNRG building full-stack web applications, AI-powered systems, and computer vision software.",
  keywords: [
    "Shivaram Reddy",
    "Full Stack Developer",
    "Computer Science",
    "NNRG",
    "AI",
    "Python",
    "React",
    "FastAPI",
    "Portfolio"
  ],
  authors: [{ name: "Shivaram Reddy", url: "https://github.com/shivaramreddy78" }],
  creator: "Shivaram Reddy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shivaramreddy.dev",
    title: "Shivaram Reddy | Full Stack Developer & Computer Science Student",
    description: "Personal portfolio of Shivaram Reddy. B.Tech Computer Science student at NNRG building full-stack web applications, AI-powered systems, and computer vision software.",
    siteName: "Shivaram Reddy Portfolio",
    images: [
      {
        url: "/character.png",
        width: 1200,
        height: 630,
        alt: "Shivaram Reddy Portfolio Avatar"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivaram Reddy | Full Stack Developer",
    description: "B.Tech Computer Science student building full-stack web applications and AI-driven platforms.",
    images: ["/character.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Shivaram"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://shivaramreddy.dev/#person",
      "name": "Shivaram Reddy",
      "jobTitle": "Full-Stack Developer",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Nalla Narasimha Reddy Education Society's Group of Institutions"
      },
      "url": "https://shivaramreddy.dev",
      "sameAs": [
        "https://github.com/shivaramreddy78",
        "https://linkedin.com/in/shivaram-reddy-enukonda-a11a14332"
      ],
      "knowsAbout": [
        "Python",
        "React",
        "FastAPI",
        "TypeScript",
        "Tailwind CSS",
        "OpenCV",
        "Generative AI"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://shivaramreddy.dev/#website",
      "url": "https://shivaramreddy.dev",
      "name": "Shivaram Reddy — Portfolio",
      "author": {
        "@id": "https://shivaramreddy.dev/#person"
      }
    }
  ]
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/character.png" type="image/png" />
        <link rel="apple-touch-icon" href="/character.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden antialiased bg-paper text-ink selection:bg-ink selection:text-paper font-sans">
        {children}
      </body>
    </html>
  );
}
