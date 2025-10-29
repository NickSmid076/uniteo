import { useState } from "react";
import type { ChangeEvent } from "react";

type Props = {
  onStart: (payload: { name: string; age: string; email: string }) => void;
};

export default function IntroForm({ onStart }: Props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim() && age.trim() && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="w-full max-w-md bg-[var(--background)] text-[var(--foreground)] rounded-2xl border border-white/10 p-6 shadow-soft">
      <h1 className="text-2xl font-semibold">Let’s personalize it 🌿</h1>
      <p className="text-sm text-white/70 mt-1">
        We’ll send your result and early access.
      </p>

      <div className="mt-6 space-y-3">
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
          placeholder="First name"
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
          placeholder="Age"
          inputMode="numeric"
          value={age}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAge(event.target.value)}
        />
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />
      </div>

      <button
        disabled={!valid}
        onClick={() => onStart({ name, age, email })}
        className={`mt-6 w-full px-6 py-3 rounded-2xl font-medium transition
          ${valid ? "bg-[#00BFA5] text-black hover:bg-[#00BFA5]/90" : "bg-white/10 text-white/50 cursor-not-allowed"}`}
      >
        Start →
      </button>
    </div>
  );
}
