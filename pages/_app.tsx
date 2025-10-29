import type { AppProps } from "next/app";
import "@/styles/globals.css"; // ✅ keep your global Tailwind + CSS vars
import { AppProvider } from "../context/AppContext"; // ✅ add provider for theme + language

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}