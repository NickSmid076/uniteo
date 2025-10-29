"use client";

import { motion } from "framer-motion";
import { memo } from "react";

type Props = {
  label: string;
  selected?: boolean;
  onClick: () => void;
};

function OptionButtonBase({ label, selected, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`w-full text-left px-5 py-4 rounded-2xl text-sm sm:text-base font-medium transition-all duration-300
        shadow-[0_2px_6px_rgba(0,0,0,0.15)]
        ${
          selected
            ? "bg-primary text-black shadow-[0_0_24px_rgba(0,191,165,0.35)]"
            : "bg-[#262A38] text-foreground/90 hover:bg-[#2E3240]"
        }`}
    >
      {label}
    </motion.button>
  );
}

export default memo(OptionButtonBase);