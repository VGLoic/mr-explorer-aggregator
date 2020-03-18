import { Project, MergeRequest } from "../dataSources/project";

interface PageInfo {
    hasNextPage: boolean;
}

interface ProjectEdge {
    cursor: number;
    node: Project;
}

interface ProjectConnection {
    edges: ProjectEdge[],
    pageInfo: PageInfo
}

interface MergeRequestEdge {
    cursor: string;
    node: MergeRequest;
}

interface MergeRequestConnection {
    edges: MergeRequestEdge[];
    pageInfo: PageInfo;
}

export {
    PageInfo,
    ProjectEdge,
    ProjectConnection,
    MergeRequestEdge,
    MergeRequestConnection
};