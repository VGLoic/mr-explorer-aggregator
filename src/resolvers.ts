import { Context } from "./context/context";
import { User } from "./dataSources/user";
import { Project, MergeRequest } from "./dataSources/project";

const resolvers = {
    Query: {
        currentUser: async (
            _,
            __,
            { dataSources }: Context
        ): Promise<User> => {
            return dataSources.userAPI.getCurrentUser();
        },
        searchProjects: async (
            _,
            { search }: { search: string },
            { dataSources } : Context
        ): Promise<Project[]> => {
            return dataSources.projectAPI.getUserProjects(search);
        },
        project: async (
            _,
            { projectId }: { projectId: string },
            { dataSources }: Context
        ): Promise<Project> => {
            return dataSources.projectAPI.getProjectById(projectId);
        }
    },
    Project: {
        users: async (
            { id: projectId }: Project,
            __,
            { dataSources }: Context
        ): Promise<User[]> => {
            return dataSources.projectAPI.getProjectUsers(projectId.toString());
        },
        mergeRequests: async(
            { id: projectId }: Project,
            __,
            { dataSources }: Context
        ): Promise<MergeRequest[]> => {
            return dataSources.projectAPI.getProjectMergeRequests(projectId.toString());
        }
    },
    User: {
        projects: async (
            _,
            __,
            { dataSources } : Context
        ): Promise<Project[]> => {
            return dataSources.projectAPI.getUserProjects();
        }
    }
}

export { resolvers };