import { MrStates } from "./mr-constants";

interface ProjectsInputs {
  search: string;
  first: number;
  after: number;
}

interface ProjectInputs {
  projectId: string;
}

interface MergeRequestsInputs {
  first: number;
  fromDate: string;
  toDate?: string;
  after?: string;
  mrState: MrStates;
}

export { ProjectsInputs, ProjectInputs, MergeRequestsInputs };
