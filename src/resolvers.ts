import { Context } from "./context/context";
import { User } from "./dataSources/user";
import { Project, MergeRequest, ApprovalState } from "./dataSources/project";
import { ProjectConnection } from "./common/response.types";
import { toProjectConnection } from "./common/response.mappers";
import { configService } from "./config/config.service";

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
            { search, first, after }: { search: string, first: number, after: number },
            { dataSources } : Context
        ): Promise<ProjectConnection> => {
            if (first > parseInt(configService.get("pageLimit"))) {
                throw new Error("Ooops, that much quantity is not supported yet :(");
            }
            const projects: Project[] = await dataSources.projectAPI.getUserProjects(search, after);
            return toProjectConnection(first, projects);
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
    MergeRequest: {
        approvalState: async (
            { projectId, iid }: MergeRequest,
            __,
            { dataSources }: Context
        ): Promise<ApprovalState> => {
            return dataSources.projectAPI.getMergeRequestApprovalState(
                projectId.toString(),
                iid.toString()
            );
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