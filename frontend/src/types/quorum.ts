export type ProposalStatus = "pending" | "ready" | "executed" | "expired";

export type Proposal = {
  id: number;
  to: string;
  amount: string;
  token: string;
  approvals: number;
  threshold: number;
  status: ProposalStatus;
  createdAt: string;
};

export type Owner = {
  address: string;
  label: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  sub: string;
};
