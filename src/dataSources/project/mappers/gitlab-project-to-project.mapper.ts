import { GitlabProject, Project } from "../models";

const gitlabProjectToProject = (gitlabProject: GitlabProject): Project => {
  const { namespace, path_with_namespace, created_at, ...rest } = gitlabProject;
  const { full_path, ...restNamespace } = namespace;
  return {
    ...rest,
    pathWithNamespace: path_with_namespace,
    createdAt: created_at,
    namespace: {
      ...restNamespace,
      fullPath: full_path,
    },
  };
};

export { gitlabProjectToProject };
