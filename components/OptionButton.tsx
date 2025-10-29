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
      aria-pressed={selected}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`option-button${selected ? " selected" : ""}`}
    >
      {label}
    </motion.button>
  );
}

export default memo(OptionButtonBase);
