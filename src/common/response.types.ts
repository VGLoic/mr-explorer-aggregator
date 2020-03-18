import { Project } from "../dataSources/project";

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

export {
    PageInfo,
    ProjectEdge,
    ProjectConnection
};