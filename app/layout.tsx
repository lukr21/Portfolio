import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const SITE_DESCRIPTION =
  "Electrical Engineering student at UPenn and Hardware Engineer Intern at SubVysion. IC/VLSI design, robotics, custom gearboxes, and the software to control them.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lucaskrippendorff.com"),
  title: {
    default: "Lucas Krippendorff — Portfolio",
    template: "%s · Lucas Krippendorff",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Lucas Krippendorff — Portfolio",
    description: SITE_DESCRIPTION,
    url: "https://lucaskrippendorff.com",
    siteName: "Lucas Krippendorff",
    type: "website",
    images: [{ url: "/assets/img/og-logo.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
