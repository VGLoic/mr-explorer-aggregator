import { GitlabUser } from "../../user";

interface GitlabNamespace {
    id: number;
    name: string;
    full_path: string;
}

interface GitlabProject {
    id: number;
    description?: string;
    name: string;
    path_with_namespace: string;
    namespace: GitlabNamespace
}

interface GitlabMergeRequest {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    merged_by: GitlabUser | null;
    merged_at: string;
    target_branch: string;
    source_branch: string;
    assignee: GitlabUser | null;
    author: GitlabUser;
    user_notes_count: number;
    web_url: string;
}

interface GitlabApprovalRule {
    id: number;
    name: string;
    eligible_approvers: GitlabUser[];
    approvals_required: number;
    approved_by: GitlabUser[]
}

interface GitlabApprovalState {
    rules: GitlabApprovalRule[]
}

export {
    GitlabNamespace,
    GitlabProject,
    GitlabMergeRequest,
    GitlabApprovalRule,
    GitlabApprovalState
}