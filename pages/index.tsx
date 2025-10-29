import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useApp } from "../context/AppContext";
import { getTranslation } from "../utils/i18n";

import HeaderControls from "../components/HeaderControls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamically import the main quiz (no SSR for speed and smoother hydration)
const QuizContainer = dynamic(() => import("../components/QuizContainer"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

function LoadingFallback() {
  const { language } = useApp();
  const message = getTranslation(language, "loading");
  return (
    <div className="flex min-h-screen items-center justify-center text-sm sm:text-base text-foreground/60">
      {message}
    </div>
  );
}

export default function Home() {
  const { language } = useApp();
  const pageTitle = getTranslation(language, "app_title");
  const metaDescription = getTranslation(language, "meta_description");
  const footerNote = getTranslation(language, "footer_note");

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen flex flex-col transition-colors duration-300`}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderControls />

      <main className="relative flex-1 w-full flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 mx-auto max-w-4xl rounded-[4rem] bg-gradient-to-br from-white/5 via-white/2 to-transparent blur-3xl opacity-40" />
        <div className="w-full max-w-3xl px-4 sm:px-8 py-12 relative">
          <QuizContainer />
        </div>
      </main>

      <footer className="w-full text-center text-xs sm:text-sm text-foreground/50 py-6">
        {footerNote}
      </footer>
    </div>
  );
}
