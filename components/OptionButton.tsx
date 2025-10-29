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
      className={`w-full text-left px-4 py-3 rounded-2xl border transition
        ${selected ? "border-[#00BFA5] bg-[#00BFA5]/10" : "border-white/10 hover:bg-white/5"}`}
    >
      {label}
    </button>
  );
}

export default memo(OptionButtonBase);