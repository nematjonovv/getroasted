import type { Metadata } from "next";
import "../style/globals.css";
import { QueryProvider } from "../shared/lib/QueryProvider";
import { DM_Sans, Syne } from 'next/font/google'
import { NotificationProvider } from "../shared/lib/NotificationProvider";
export const metadata: Metadata = {
  title: "Get Roasted | Home",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
};

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

const dmsans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmsans.variable} bg-(--bg)`}>
        <NotificationProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
