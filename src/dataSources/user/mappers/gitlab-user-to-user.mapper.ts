import { GitlabUser, User } from "../models";

const gitlabUserToUser = (gitlabUser: GitlabUser): User => {
    const { avatar_url, ...rest } = gitlabUser;
    return {
        ...rest,
        avatarUrl: avatar_url
    };
}

export { gitlabUserToUser };