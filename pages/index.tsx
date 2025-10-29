import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

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
  loading: () => (
    <div className="flex min-h-screen items-center justify-center text-lg text-gray-400">
      Loading Uniteo Quiz…
    </div>
  ),
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen flex flex-col items-center justify-center transition-colors duration-300`}
    >
      <Head>
        <title>Uniteo Quiz</title>
        <meta name="description" content="Discover your Uniteo archetype 🌿" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderControls />

      <main className="w-full max-w-3xl px-4 sm:px-8 py-12">
        <QuizContainer />
      </main>

      <footer className="w-full text-center text-sm text-white/40 py-6">
        Built with 🌿 Uniteo • Empowering growth through community and connection
      </footer>
    </div>
  );
}
