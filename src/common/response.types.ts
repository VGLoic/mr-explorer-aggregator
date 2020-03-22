import { Project, MergeRequest } from "../dataSources/project";

interface ProjectPageInfo {
  hasNextPage: boolean;
  endCursor: number | null;
}

interface ProjectEdge {
  cursor: number;
  node: Project;
}

interface ProjectConnection {
  edges: ProjectEdge[];
  pageInfo: ProjectPageInfo;
}

interface MergeRequestPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface MergeRequestEdge {
  cursor: string;
  node: MergeRequest;
}

interface MergeRequestConnection {
  edges: MergeRequestEdge[];
  pageInfo: MergeRequestPageInfo;
}

export {
  ProjectPageInfo,
  ProjectEdge,
  ProjectConnection,
  MergeRequestPageInfo,
  MergeRequestEdge,
  MergeRequestConnection,
};
