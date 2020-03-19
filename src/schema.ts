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
        pageInfo: ProjectPageInfo!
    }

    type ProjectPageInfo {
        hasNextPage: Boolean!,
        endCursor: Int
    }

    type ProjectEdge {
        """
        Cursor for project is the ID since the pagination by created_at is not supported by gitlab
        """
        cursor: Int!,
        """
        Project node
        """
        node: Project!
    }

    type Project {
        id: ID!,
        name: String!,
        description: String,
        pathWithNamespace: String!,
        namespace: Namespace!,
        users: [User],
        mergeRequests (first: Int = 5, after: String = "2019-01-01"): MergeRequestConnection
    }

    type MergeRequestConnection {
        edges: [MergeRequestEdge],
        pageInfo: MergeRequestPageInfo!
    }

    type MergeRequestPageInfo {
        hasNextPage: Boolean!,
        endCursor: String
    }

    type MergeRequestEdge {
        """
        Cursor for merge request is the created_at since the pagination by ID is not supported by gitlab
        """
        cursor: String!,
        """
        Merge request node
        """
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
        searchProjects(search: String, first: Int = 5, after: Int = 0): ProjectConnection,
        project(projectId: String!): Project
    }
`

export { typeDefs }