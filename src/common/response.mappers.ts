import { Project } from "../dataSources/project";
import { ProjectConnection, ProjectEdge } from "./response.types";
import { configService } from "../config/config.service";

const toProjectConnection = (first: number, projects: Project[]): ProjectConnection => {
    const hasNextPage = projects.length > first;

    const edges: ProjectEdge[] = projects.map(toProjectEdge).slice(0, first);
    
    return {
        edges,
        pageInfo: {
            hasNextPage
        }
    }
}

const toProjectEdge = (project: Project): ProjectEdge => {
    return {
        cursor: project.id,
        node: project
    };
}

export { toProjectConnection, toProjectEdge }