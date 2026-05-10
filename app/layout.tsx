import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Socialism 2026 — Adelaide",
  description: "The 2026 Adelaide Socialism Conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-brand-red-dark text-brand-cream">
        {children}
      </body>
    </html>
  );
}
