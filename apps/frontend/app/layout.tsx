import type { Metadata } from 'next';
import './globals.css'; 

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Organize Your Life with TaskFlow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">{children}</body>
    </html>
  );
}