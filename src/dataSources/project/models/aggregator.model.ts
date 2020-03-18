import { User } from "../../user";

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

interface ApprovalRule {
    id: number;
    name: string;
    eligibleApprovers: User[];
    approvalsRequired: number;
    approvedBy: User[]
}

interface ApprovalState {
    rules: ApprovalRule[]
}

export { Namespace, Project, MergeRequest, ApprovalRule, ApprovalState }