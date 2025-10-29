import { memo } from "react";

type Props = {
  label: string;
  selected?: boolean;
  onClick: () => void;
};

function OptionButtonBase({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-3.5 rounded-3xl border text-sm sm:text-base font-medium transition shadow-soft
        ${
          selected
            ? "border-primary bg-primary/10 text-primary"
            : "border-foreground/15 text-foreground/80 hover:bg-foreground/5"
        }`}
    >
      {label}
    </button>
  );
}

export default memo(OptionButtonBase);
