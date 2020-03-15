import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const typeDefs: DocumentNode = gql`

    type Namespace {
        id: ID!,
        name: String!,
        fullPath: String!
    }

    type Project {
        id: ID!,
        name: String!,
        description: String,
        pathWithNamespace: String!,
        namespace: Namespace!,
        users: [User],
        mergeRequests: [MergeRequest]
    }

    type MergeRequest {
        id: ID!,
        iid: Int!,
        projectId: Int!,
        title: String!,
        description: String!,
        state: String!,
        createdAt: String!,
        updatedAt: String!,
        mergedBy: User,
        mergedAt: String,
        targetBranch: String,
        sourceBranch: String,
        assignee: User,
        author: User!,
        userNotesCount: Int!,
        webUrl: String!
    }

    type User {
        id: ID!,
        name: String!,
        username: String!,
        avatarUrl: String!,
        email: String!,
        projects: [Project]
    }

    type Query {
        currentUser: User,
        searchProjects(search: String): [Project],
        project(projectId: String!): Project
    }
`

export { typeDefs }