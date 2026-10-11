import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SnazzyCash',
  description: 'A one-screen price fairness checker for small-business owners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
