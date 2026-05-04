import type { DashboardStat, Owner, Proposal } from "../types/quorum";

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 1,
    to: "GDQP2...K7X3",
    amount: "5,000",
    token: "USDC",
    approvals: 2,
    threshold: 3,
    status: "pending",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    to: "GBVNR...M2F9",
    amount: "12,500",
    token: "XLM",
    approvals: 3,
    threshold: 3,
    status: "ready",
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    to: "GCXKT...P1A4",
    amount: "800",
    token: "USDC",
    approvals: 3,
    threshold: 3,
    status: "executed",
    createdAt: "1 day ago",
  },
  {
    id: 4,
    to: "GHMWQ...T9B2",
    amount: "250",
    token: "USDC",
    approvals: 1,
    threshold: 3,
    status: "expired",
    createdAt: "3 days ago",
  },
];

export const OWNERS: Owner[] = [
  { address: "GDQP2...K7X3", label: "You" },
  { address: "GBVNR...M2F9", label: "Signer 2" },
  { address: "GCXKT...P1A4", label: "Signer 3" },
];

export const BASE_DASHBOARD_STATS: DashboardStat[] = [
  { label: "Vault Balance", value: "$48,200", sub: "USDC" },
  { label: "Threshold", value: "3 of 3", sub: "signers required" },
  { label: "Active", value: "0", sub: "proposals" },
  { label: "Executed", value: "12", sub: "all time" },
];
