import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Provider from "./provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "AI Study Bro",
  description: "Your AI-powered study companion",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>
            {children}
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
