import { isAfter } from "date-fns";
import { Context } from "./context/context";
import { User } from "./dataSources/user";
import { Project, MergeRequest, Note } from "./dataSources/project";
import {
  ProjectConnection,
  MergeRequestConnection,
  Reviews,
} from "./common/response.types";
import {
  toProjectConnection,
  toMergeRequestConnection,
  toReviews,
} from "./common/response.mappers";
import { configService } from "./config/config.service";
import { MrStates } from "./common/mr-constants";

const resolvers = {
  MrStates: {
    OPENED: MrStates.Opened,
    CLOSED: MrStates.Closed,
    MERGED: MrStates.Merged,
    LOCKED: MrStates.Locked,
    ALL: MrStates.All,
  },
  Query: {
    currentUser: async (_, __, { dataSources }: Context): Promise<User> => {
      return dataSources.userAPI.getCurrentUser();
    },
    searchProjects: async (
      _,
      {
        search,
        first,
        after,
      }: { search: string; first: number; after: number },
      { dataSources }: Context
    ): Promise<ProjectConnection> => {
      if (first > parseInt(configService.get("pageLimit"))) {
        throw new Error("Ooops, that much quantity is not supported yet :(");
      }
      const projects: Project[] = await dataSources.projectAPI.getUserProjects(
        search,
        after
      );
      return toProjectConnection(first, projects);
    },
    project: async (
      _,
      { projectId }: { projectId: string },
      { dataSources }: Context
    ): Promise<Project> => {
      return dataSources.projectAPI.getProjectById(projectId);
    },
  },
  Project: {
    users: async (
      { id: projectId }: Project,
      __,
      { dataSources }: Context
    ): Promise<User[]> => {
      return dataSources.projectAPI.getProjectUsers(projectId.toString());
    },
    mergeRequests: async (
      { id: projectId }: Project,
      {
        first,
        fromDate,
        toDate,
        after,
        mrState,
      }: {
        first: number;
        fromDate: string;
        toDate?: string;
        after?: string;
        mrState: MrStates;
      },
      { dataSources }: Context
    ): Promise<MergeRequestConnection> => {
      if (first > parseInt(configService.get("pageLimit"))) {
        throw new Error("Ooops, that much quantity is not supported yet :(");
      }

      let effectiveAfter: string = fromDate;

      if (after) {
        const afterDateFormat = new Date(after);
        const fromDateFormat = new Date(fromDate);

        if (toDate) {
          const toDateFormat = new Date(toDate);
          if (isAfter(afterDateFormat, toDateFormat)) {
            throw new Error("cursor cannot be after the toDate");
          }
        }

        if (isAfter(fromDateFormat, afterDateFormat)) {
          throw new Error("fromDate cannot be after the cursor");
        }
        effectiveAfter = after;
      }

      const mergeRequests: MergeRequest[] = await dataSources.projectAPI.getProjectMergeRequests(
        projectId.toString(),
        mrState,
        effectiveAfter
      );
      return toMergeRequestConnection(first, mergeRequests, toDate);
    },
  },
  MergeRequest: {
    approvedBy: async (
      { projectId, iid }: MergeRequest,
      __,
      { dataSources }: Context
    ): Promise<User[]> => {
      return dataSources.projectAPI.getMergeRequestApprovers(
        projectId.toString(),
        iid.toString()
      );
    },
    reviews: async (
      { projectId, iid, author }: MergeRequest,
      __,
      { dataSources }: Context
    ): Promise<Reviews> => {
      const notes: Note[] = await dataSources.projectAPI.getMergeRequestNotes(
        projectId.toString(),
        iid.toString()
      );
      return toReviews(notes, author.id);
    },
  },
  User: {
    projects: async (_, __, { dataSources }: Context): Promise<Project[]> => {
      return dataSources.projectAPI.getUserProjects();
    },
  },
};

export { resolvers };
