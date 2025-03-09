import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

import Navbar from "@/components/Navbar";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function App({ Component, pageProps }: AppProps) {
  return <div className="flex min-h-screen flex-col">
      <main className={roboto.variable}>
      <Navbar />
      
      <Component {...pageProps} />;
      </main>
    </div>
}
