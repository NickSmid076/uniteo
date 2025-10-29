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
    <div className="w-full max-w-md mx-auto rounded-3xl border border-foreground/10 bg-background/90 px-5 py-6 sm:px-7 sm:py-8 shadow-soft backdrop-blur">
      <h1 className="text-2xl font-semibold sm:text-3xl">Let’s personalize it 🌿</h1>
      <p className="text-sm sm:text-base text-foreground/60 mt-2">
        We’ll send your result and early access.
      </p>

      <div className="mt-6 space-y-4">
        <input
          className="w-full bg-white/8 dark:bg-white/5 border border-foreground/10 rounded-2xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/70 transition"
          placeholder="First name"
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          autoComplete="given-name"
        />
        <input
          className="w-full bg-white/8 dark:bg-white/5 border border-foreground/10 rounded-2xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/70 transition"
          placeholder="Age"
          inputMode="numeric"
          value={age}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAge(event.target.value)}
        />
        <input
          className="w-full bg-white/8 dark:bg-white/5 border border-foreground/10 rounded-2xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary/70 transition"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          autoComplete="email"
        />
      </div>

      <button
        disabled={!valid}
        onClick={() => onStart({ name, age, email })}
        className={`mt-7 w-full px-6 py-3 rounded-full font-semibold transition shadow-soft
          ${
            valid
              ? "bg-primary text-black hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/60"
              : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
          }`}
      >
        Start →
      </button>
    </div>
  );
}
