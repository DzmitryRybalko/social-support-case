import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-6 sm:py-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
