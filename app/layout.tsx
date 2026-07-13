import type { Metadata } from "next";
import '../globals.css'; // Import global styles

export const metadata: Metadata = {
  title: "TranX Vault",
  description: "Privacy-first secure vault for sensitive information.",
};

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
