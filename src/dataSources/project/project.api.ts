import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { configService } from "../../config/config.service";
import {
  GitlabProject,
  Project,
  GitlabMergeRequest,
  MergeRequest,
  GitlabApprovalState,
  Note,
  GitlabNote,
} from "./models";
import {
  gitlabProjectToProject,
  gitlabMrToMr,
  gitlabApprovalStateToApprovers,
  gitlabMrNotesToMrNotes,
} from "./mappers";
import { User, GitlabUser, gitlabUserToUser } from "../user";
import { MrStates } from "../../common/mr-constants";

export class ProjectAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://gitlab.com/api/v4/projects`;
  }

  willSendRequest(request: RequestOptions): void {
    request.headers.set("Authorization", `Bearer ${this.context.accessToken}`);
    if (!request.params.get("per_page")) {
      const pageLimit: number = parseInt(configService.get("pageLimit"));
      request.params.set("per_page", pageLimit.toString());
    }
  }

  async getUserProjects(
    search: string = "",
    after: number = 0
  ): Promise<Project[]> {
    try {
      const gitlabProjects: GitlabProject[] = await this.get("/", {
        pagination: "keyset",
        id_after: after,
        order_by: "id",
        sort: "asc",
        membership: true,
        search,
        min_access_level: 30,
      });
      return gitlabProjects.map(gitlabProjectToProject);
    } catch (err) {
      console.log("err: ", err);
    }
  }

  async getProjectById(projectId: string): Promise<Project> {
    const gitlabProject: GitlabProject = await this.get(`/${projectId}`);
    return gitlabProjectToProject(gitlabProject);
  }

  async getProjectUsers(projectId: string): Promise<User[]> {
    const gitlabUsers: GitlabUser[] = await this.get(`/${projectId}/users`, {
      per_page: "100",
    });
    return gitlabUsers.map(gitlabUserToUser);
  }

  async getProjectMergeRequests(
    projectId: string,
    state: MrStates,
    after: string
  ): Promise<MergeRequest[]> {
    const params: Record<string, string> = {
      order_by: "created_at",
      sort: "asc",
    };
    if (state) params.state = state;
    if (after) params.created_after = after;
    const gitlabMergeRequests: GitlabMergeRequest[] = await this.get(
      `/${projectId}/merge_requests`,
      params
    );
    return gitlabMergeRequests.map(gitlabMrToMr);
  }

  async getMergeRequestApprovers(
    projectId: string,
    mergeRequestIid: string
  ): Promise<User[]> {
    const gitlabApprovalState: GitlabApprovalState = await this.get(
      `/${projectId}/merge_requests/${mergeRequestIid}/approval_state`
    );
    return gitlabApprovalStateToApprovers(gitlabApprovalState);
  }

  async getMergeRequestNotes(
    projectId: string,
    mergeRequestIid: string
  ): Promise<Note[]> {
    const gitlabNotes: GitlabNote[] = await this.get(
      `/${projectId}/merge_requests/${mergeRequestIid}/notes`,
      {
        per_page: "100",
      }
    );
    return gitlabMrNotesToMrNotes(gitlabNotes);
  }
}
