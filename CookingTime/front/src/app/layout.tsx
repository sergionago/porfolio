import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "CookingTime",
  description: "Save your recipes like your grandma",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script src="https://kit.fontawesome.com/17361583c9.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
