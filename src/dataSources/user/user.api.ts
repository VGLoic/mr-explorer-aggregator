import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { GitlabUser, User } from "./models";
import { gitlabUserToUser } from "./mappers";

export class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `https://gitlab.com/api/v4/user`;
    }

    willSendRequest(request: RequestOptions): void {
        request.headers.set('Authorization', `Bearer ${this.context.accessToken}`);
        request.params.set("per_page", "100");
    }

    async getCurrentUser(): Promise<User> {
        const gitlabUser: GitlabUser = await this.get("/");
        return gitlabUserToUser(gitlabUser);
    }

    async getUserProjects(): Promise<any> {
        const projects = await this.get(
            `/projects`,
            {
                membership: true
            }
        );
        console.log("Projects: ", projects);
        return [];
    }
}