"use client";

import { motion } from "framer-motion";

export default function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.max(0, Math.min(100, (step / total) * 100));

  return (
    <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
      <motion.div
        className="progress-thumb"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </div>
  );
}
