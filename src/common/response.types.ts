import { Project, MergeRequest, Note } from "../dataSources/project";
import { User } from "src/dataSources/user";

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

interface Reviews {
  notes: Note[];
  reviewedBy: User[];
}

export {
  ProjectPageInfo,
  ProjectEdge,
  ProjectConnection,
  MergeRequestPageInfo,
  MergeRequestEdge,
  MergeRequestConnection,
  Reviews,
};
