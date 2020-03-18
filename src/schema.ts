import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const typeDefs: DocumentNode = gql`

    type Namespace {
        id: ID!,
        name: String!,
        fullPath: String!
    }


    type ProjectConnection {
        edges: [ProjectEdge],
        pageInfo: PageInfo!
    }

    type PageInfo {
        hasNextPage: Boolean!
    }

    type ProjectEdge {
        cursor: String!,
        node: Project!
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

    type MergeRequestConnection {
        edges: [MergeRequestEdge],
        pageInfo: PageInfo!
    }

    type MergeRequestEdge {
        cursor: String!,
        node: MergeRequest!
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
        webUrl: String!,
        approvalState: ApprovalState
    }

    type ApprovalState {
        rules: [ApprovalRule]
    }

    type ApprovalRule {
        id: ID!,
        name: String!,
        eligibleApprovers: [User],
        approvalsRequired: Int,
        approvedBy: [User]
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
        searchProjects(search: String, first: Int = 10, after: Int = 0): ProjectConnection,
        project(projectId: String!): Project
    }
`

export { typeDefs }