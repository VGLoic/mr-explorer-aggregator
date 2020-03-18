import { Project, MergeRequest } from "../dataSources/project";
import { ProjectConnection, ProjectEdge, MergeRequestConnection, MergeRequestEdge } from "./response.types";

const toProjectConnection = (first: number, projects: Project[]): ProjectConnection => {
    const hasNextPage = projects.length > first;

    const edges: ProjectEdge[] = projects.map(toProjectEdge).slice(0, first);
    
    return {
        edges,
        pageInfo: {
            hasNextPage
        }
    }
}

const toProjectEdge = (project: Project): ProjectEdge => {
    return {
        cursor: project.id,
        node: project
    };
}

const toMergeRequestConnection = (first: number, mergeRequests: MergeRequest[]): MergeRequestConnection => {
    const hasNextPage = mergeRequests.length > first;
    
    const edges: MergeRequestEdge[] = mergeRequests.map(toMergeRequestEdge).slice(0, first);

    return {
        edges,
        pageInfo: {
            hasNextPage
        }
    };
}

const toMergeRequestEdge = (mergeRequest: MergeRequest): MergeRequestEdge => {
    return {
        cursor: mergeRequest.createdAt,
        node: mergeRequest
    };
}

export { toProjectConnection, toProjectEdge, toMergeRequestConnection, toMergeRequestEdge }