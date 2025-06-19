// This file is required in the app directory and wraps all pages

import '../styles/global.css'; // or './globals.css' depending on your setup
import Navbar from '../components/Navbar'; // Adjust path as needed

export const metadata = {
  title: 'MyApp',
  description: 'A simple Next.js app with a navbar',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
