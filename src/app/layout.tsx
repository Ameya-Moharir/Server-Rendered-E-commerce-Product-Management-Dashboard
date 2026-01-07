import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-commerce Admin Dashboard',
  description: 'Server-side rendered admin dashboard for managing e-commerce products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            {children}
            <Toaster position="top-right" />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
