import { useState } from "react";

export function CreateProposalModal({ onClose }: { onClose: () => void }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("USDC");

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">New Proposal</h2>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5">Recipient Address</label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="G..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-zinc-400 block mb-1.5">Amount</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="w-28">
              <label className="text-xs text-zinc-400 block mb-1.5">Token</label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-500"
              >
                <option>USDC</option>
                <option>XLM</option>
                <option>EURC</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-zinc-500 mb-4">
              Requires <span className="text-zinc-300 font-medium">3 of 3</span> approvals to execute
            </p>
            <button
              type="button"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
