"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-80 mb-4 rounded-3xl border border-purple-700 bg-[#090d18] p-5 shadow-2xl">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm text-green-400">Online</p>
            </div>
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 text-sm text-gray-300 mb-4">
            Hi! Ask me about my projects, architecture or tech stack.
          </div>

          <input
            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none"
            placeholder="Ask anything..."
          />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
      >
        💬
      </button>
    </div>
  );
}