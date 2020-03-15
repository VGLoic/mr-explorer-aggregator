import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { GitlabProject, Project, GitlabMergeRequest, MergeRequest } from "./models";
import { gitlabProjectToProject, gitlabMrToMr } from "./mappers";
import { User, GitlabUser, gitlabUserToUser } from '../user';

export class ProjectAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `https://gitlab.com/api/v4/projects`;
    }

    willSendRequest(request: RequestOptions): void {
        request.headers.set('Authorization', `Bearer ${this.context.accessToken}`);
        request.params.set("per_page", "100");
    }

    async getUserProjects(search: string = ""): Promise<Project[]> {
        const gitlabProjects: GitlabProject[] = await this.get(
            "/",
            {
                membership: true,
                order_by: "updated_at",
                search,
                min_access_level: 30,
                with_merge_requests_enabled: true
            }
        );
        return gitlabProjects.map(gitlabProjectToProject);
    }

    async getProjectById(projectId: string): Promise<Project> {
        const gitlabProject: GitlabProject = await this.get(`/${projectId}`);
        return gitlabProjectToProject(gitlabProject);
    }

    async getProjectUsers(projectId: string): Promise<User[]> {
        const gitlabUsers: GitlabUser[] = await this.get(`/${projectId}/users`);
        return gitlabUsers.map(gitlabUserToUser);
    }

    async getProjectMergeRequests(projectId: string): Promise<MergeRequest[]> {
        const gitlabMergeRequests: GitlabMergeRequest[] = await this.get(`/${projectId}/merge_requests`, {
           state: "all",
           created_after: "2020-03-10"
        });
        return gitlabMergeRequests.map(gitlabMrToMr);
    }
}