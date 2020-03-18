import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { configService } from '../../config/config.service';
import { GitlabProject, Project, GitlabMergeRequest, MergeRequest, GitlabApprovalState, ApprovalState } from "./models";
import { gitlabProjectToProject, gitlabMrToMr, gitlabApprovalStateToApprovalState } from "./mappers";
import { User, GitlabUser, gitlabUserToUser } from '../user';

export class ProjectAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `https://gitlab.com/api/v4/projects`;
    }

    willSendRequest(request: RequestOptions): void {
        request.headers.set('Authorization', `Bearer ${this.context.accessToken}`);
        if (!request.params.get("per_page")){
            const pageLimit: number = parseInt(configService.get("pageLimit"));
            request.params.set("per_page", pageLimit.toString());
        }
    }

    async getUserProjects(search: string = "", after: number = 0): Promise<Project[]> {
        try {
            const gitlabProjects: GitlabProject[] = await this.get(
                "/",
                {
                    pagination: "keyset",
                    id_after: after,
                    order_by: "id",
                    sort: "asc",
                    membership: true,
                    search,
                    min_access_level: 30
                }
            );
            return gitlabProjects.map(gitlabProjectToProject);
        } catch (err) {
            console.log("err: ", err)
        }
    }

    async getProjectById(projectId: string): Promise<Project> {
        const gitlabProject: GitlabProject = await this.get(`/${projectId}`);
        return gitlabProjectToProject(gitlabProject);
    }

    async getProjectUsers(projectId: string): Promise<User[]> {
        const gitlabUsers: GitlabUser[] = await this.get(`/${projectId}/users`, { per_page: "100" });
        return gitlabUsers.map(gitlabUserToUser);
    }

    async getProjectMergeRequests(projectId: string): Promise<MergeRequest[]> {
        const gitlabMergeRequests: GitlabMergeRequest[] = await this.get(`/${projectId}/merge_requests`, {
           state: "opened",
           created_after: "2020-03-10"
        });
        return gitlabMergeRequests.map(gitlabMrToMr);
    }

    async getMergeRequestApprovalState(projectId: string, mergeRequestIid: string): Promise<ApprovalState> {
        const gitlabApprovalState: GitlabApprovalState = await this.get(
            `/${projectId}/merge_requests/${mergeRequestIid}/approval_state`
        );
        return gitlabApprovalStateToApprovalState(gitlabApprovalState);
    }
}