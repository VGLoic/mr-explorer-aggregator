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
    pathWithNamespace
    namespace: Namespace;
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

export { Namespace, Project, MergeRequest }