"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[calc(100vw-3rem)] max-w-80 rounded-3xl border border-[rgba(168,213,186,0.28)] bg-[rgba(15,23,42,0.52)] p-5 shadow-[0_22px_55px_rgba(15,23,42,0.22)] backdrop-blur-[16px]">
          <div className="mb-4 flex justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[var(--living-text)]">
                AI Assistant
              </h3>
              <p className="mt-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--living-mint)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--living-mint)] shadow-[0_0_12px_rgba(208,244,222,0.45)]" />
                Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-lg border border-[rgba(208,244,222,0.18)] bg-[rgba(208,244,222,0.08)] text-[var(--living-muted)] transition hover:bg-[rgba(208,244,222,0.16)] hover:text-[var(--living-text)]"
              aria-label="Close chat"
            >
              x
            </button>
          </div>

          <div className="mb-4 rounded-2xl border border-[rgba(208,244,222,0.18)] bg-[rgba(208,244,222,0.08)] p-4 text-sm leading-6 text-[var(--living-text)]">
            Hi! Ask me about my projects, architecture or tech stack.
          </div>

          <input
            className="w-full rounded-xl border border-[rgba(208,244,222,0.25)] bg-[rgba(15,23,42,0.35)] px-4 py-3 text-sm text-[var(--living-text)] outline-none transition placeholder:text-slate-400 focus:border-[rgba(208,244,222,0.55)] focus:shadow-[0_0_0_3px_rgba(168,213,186,0.12)]"
            placeholder="Ask anything..."
          />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full border border-[rgba(208,244,222,0.56)] bg-[linear-gradient(135deg,#A8D5BA,#D0F4DE,#FDE2E4)] text-sm font-black tracking-[0.08em] text-[var(--living-dark-text)] shadow-[0_14px_35px_rgba(168,213,186,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(208,244,222,0.3)] motion-reduce:hover:translate-y-0"
        aria-label="Open chat"
      >
        AI
      </button>
    </div>
  );
}
