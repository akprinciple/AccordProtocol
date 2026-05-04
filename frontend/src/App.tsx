import { useMemo, useState } from "react";
import { CreateProposalModal } from "./components/CreateProposalModal";
import { BASE_DASHBOARD_STATS, MOCK_PROPOSALS, OWNERS } from "./data/mockData";
import { DashboardPage } from "./pages/DashboardPage";
import { HistoryPage } from "./pages/HistoryPage";

type Page = "dashboard" | "history";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [showCreate, setShowCreate] = useState(false);
  const [connected, setConnected] = useState(false);

  const activeProposals = proposals.filter((proposal) =>
    ["pending", "ready"].includes(proposal.status)
  );
  const historyProposals = proposals.filter((proposal) =>
    ["executed", "expired"].includes(proposal.status)
  );

  const dashboardStats = useMemo(
    () =>
      BASE_DASHBOARD_STATS.map((stat) =>
        stat.label === "Active" ? { ...stat, value: activeProposals.length.toString() } : stat
      ),
    [activeProposals.length]
  );

  const handleApprove = (id: number) => {
    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id !== id) return proposal;
        const newApprovals = proposal.approvals + 1;

        return {
          ...proposal,
          approvals: newApprovals,
          status: newApprovals >= proposal.threshold ? "ready" : "pending",
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-xs font-bold text-black">
              Q
            </div>
            <span className="font-semibold tracking-tight">Quorum</span>
            <span className="text-xs text-zinc-600 font-mono hidden sm:block">testnet</span>
          </div>

          <nav className="flex items-center gap-1">
            {(["dashboard", "history"] as Page[]).map((navPage) => (
              <button
                key={navPage}
                type="button"
                onClick={() => setPage(navPage)}
                className={`text-sm px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  page === navPage ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {navPage}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setConnected(!connected)}
            className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors ${
              connected
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            {connected ? "GDQP2...K7X3" : "Connect Wallet"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {page === "dashboard" ? (
          <DashboardPage
            activeProposals={activeProposals}
            owners={OWNERS}
            dashboardStats={dashboardStats}
            onApprove={handleApprove}
            onCreateProposal={() => setShowCreate(true)}
          />
        ) : (
          <HistoryPage historyProposals={historyProposals} onApprove={handleApprove} />
        )}
      </main>

      {showCreate && <CreateProposalModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
