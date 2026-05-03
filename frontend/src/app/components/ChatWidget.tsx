"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useState } from "react";

type ChatMessage = {
  id: number;
  author: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    author: "assistant",
    text: "Hi! Ask me about my projects, architecture or tech stack.",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextMessage = draft.trim();
    if (!nextMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        author: "user",
        text: nextMessage,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-4 w-[calc(100vw-2.5rem)] max-w-96 rounded-3xl border border-[rgba(168,213,186,0.28)] bg-[rgba(15,23,42,0.52)] p-5 shadow-[0_22px_55px_rgba(15,23,42,0.22)] backdrop-blur-[16px]">
          <div className="mb-4 flex justify-between gap-4">
            <div className="min-w-0">
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

          <div className="mb-4 flex max-h-64 flex-col gap-3 overflow-y-auto rounded-2xl border border-[rgba(208,244,222,0.18)] bg-[rgba(208,244,222,0.08)] p-4 text-sm leading-6 text-[var(--living-text)]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.author === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl bg-[var(--living-sage)] px-3 py-2 text-[var(--living-dark-text)]"
                    : "max-w-[90%] rounded-2xl border border-[rgba(208,244,222,0.16)] bg-[rgba(15,23,42,0.28)] px-3 py-2"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              className="min-w-0 flex-1 rounded-xl border border-[rgba(208,244,222,0.25)] bg-[rgba(15,23,42,0.35)] px-4 py-3 text-sm text-[var(--living-text)] outline-none transition placeholder:text-slate-400 focus:border-[rgba(208,244,222,0.55)] focus:shadow-[0_0_0_3px_rgba(168,213,186,0.12)]"
              placeholder="Ask anything..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button
              type="submit"
              className="rounded-xl border border-[rgba(208,244,222,0.56)] bg-[var(--living-sage)] px-4 text-sm font-semibold text-[var(--living-dark-text)] shadow-[0_10px_24px_rgba(168,213,186,0.2)] transition hover:-translate-y-0.5 hover:bg-[rgba(208,244,222,0.95)] hover:shadow-[0_14px_30px_rgba(208,244,222,0.24)] motion-reduce:hover:translate-y-0"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className="relative ml-auto flex h-28 w-28 items-center justify-center border-none bg-transparent p-0 shadow-none ring-0 transition hover:-translate-y-0.5 hover:scale-105 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <span
          aria-hidden="true"
          className="ai-pet-particle-layer absolute inset-0 pointer-events-none"
        >
          <span className="ai-pet-particle" />
          <span className="ai-pet-particle" />
          <span className="ai-pet-particle" />
          <span className="ai-pet-particle" />
          <span className="ai-pet-particle" />
          <span className="ai-pet-particle" />
          <span className="ai-pet-particle" />
          <span className="ai-pet-particle" />
        </span>
        <Image
          src="/images/ai-pet-transparent.png"
          alt=""
          width={96}
          height={96}
          className="relative z-10 h-20 w-20 select-none object-contain pointer-events-none"
          priority
        />
      </button>
    </div>
  );
}
