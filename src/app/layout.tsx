import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-[100dvh] w-[100dvw] overflow-hidden">{children}</body>
    </html>
  );
}
