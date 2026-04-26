"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[calc(100vw-3rem)] max-w-80 rounded-3xl border border-cyan-300/20 bg-[#06101d]/90 p-5 shadow-[0_0_42px_rgba(34,211,238,0.16)] backdrop-blur-xl">
          <div className="mb-4 flex justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white">AI Assistant</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
              aria-label="Close chat"
            >
              x
            </button>
          </div>

          <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
            Hi! Ask me about my projects, architecture or tech stack.
          </div>

          <input
            className="w-full rounded-xl border border-cyan-300/15 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
            placeholder="Ask anything..."
          />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full border border-cyan-200/40 bg-gradient-to-br from-cyan-400/80 via-blue-500/80 to-fuchsia-500/80 text-sm font-black tracking-[0.08em] text-white shadow-[0_0_34px_rgba(34,211,238,0.34)] transition hover:scale-105 motion-reduce:hover:scale-100"
        aria-label="Open chat"
      >
        AI
      </button>
    </div>
  );
}
