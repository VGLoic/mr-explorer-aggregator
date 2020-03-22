import { User, GitlabUser } from "../../user";

interface Namespace {
  id: number;
  name: string;
  fullPath: string;
}

interface Project {
  id: number;
  description?: string;
  name: string;
  pathWithNamespace: string;
  namespace: Namespace;
  createdAt: string;
}

interface MergeRequest {
  id: number;
  iid: number;
  projectId: number;
  title: string;
  description: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  mergedBy: User | null;
  mergedAt: string | null;
  targetBranch: string;
  sourceBranch: string;
  assignee: User | null;
  author: User;
  userNotesCount: number;
  webUrl: string;
}

// DEPRECATED
interface ApprovalRule {
  id: number;
  name: string;
  eligibleApprovers: User[];
  approvalsRequired: number;
  approvedBy: User[];
}
// DEPRECATED
interface ApprovalState {
  rules: ApprovalRule[];
}

interface Note {
  id: number;
  type: string | null;
  body: string;
  author: User;
  createdAt: string;
  resolved: boolean;
}

export { Namespace, Project, MergeRequest, Note };
