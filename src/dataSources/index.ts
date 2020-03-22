import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { BaseContext } from "../context/context";
import { UserAPI } from "./user";
import { ProjectAPI } from "./project";

const dataSources = (): DataSources<BaseContext> => ({
  userAPI: new UserAPI(),
  projectAPI: new ProjectAPI(),
});

export interface IDataSources {
  userAPI: UserAPI;
  projectAPI: ProjectAPI;
}

export { dataSources, UserAPI };
