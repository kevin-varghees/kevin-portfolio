import { useState } from "react";
import { User } from "lucide-react";
import { profile } from "../data";

/** Grayscale portrait. Drop your photo at public/kevin.jpg to replace the placeholder. */
export function Portrait({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-end bg-gradient-to-b from-neutral-300 to-neutral-400 text-neutral-500 ${className}`}
        role="img"
        aria-label="Photo placeholder"
      >
        <User className="mb-2 h-3/5 w-3/5" strokeWidth={1} />
        <span className="mb-6 px-4 text-center text-[11px] font-semibold uppercase tracking-widest">
          Add your photo
          <br />
          public/kevin.jpg
        </span>
      </div>
    );
  }

  return (
    <img
      src={profile.photo}
      alt={`Portrait of ${profile.name}`}
      onError={() => setFailed(true)}
      className={`object-cover object-top grayscale ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
