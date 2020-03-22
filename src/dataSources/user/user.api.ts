import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { configService } from "../../config/config.service";
import { GitlabUser, User } from "./models";
import { gitlabUserToUser } from "./mappers";

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://gitlab.com/api/v4/user`;
  }

  willSendRequest(request: RequestOptions): void {
    request.headers.set("Authorization", `Bearer ${this.context.accessToken}`);
    if (!request.params.get("per_page")) {
      const pageLimit: number = parseInt(configService.get("pageLimit"));
      request.params.set("per_page", pageLimit.toString());
    }
  }

  async getCurrentUser(): Promise<User> {
    const gitlabUser: GitlabUser = await this.get("/");
    return gitlabUserToUser(gitlabUser);
  }
}
