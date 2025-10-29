"use client";

import { motion } from "framer-motion";

export default function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, Math.round((step / total) * 100));

  return (
    <div
      className="relative w-full h-2 rounded-full overflow-hidden bg-white/[0.06] dark:bg-white/[0.05] backdrop-blur-sm"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      {/* Background subtle glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "inset 0 0 12px rgba(0,191,165,0.08)",
        }}
      />

      {/* Progress fill */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#00BFA5] to-[#00d3b9] shadow-[0_0_16px_rgba(0,191,165,0.4)]"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Glow reflection overlay */}
      <div
        aria-hidden
        className="absolute top-0 left-0 h-full w-full rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
      />
    </div>
  );
}