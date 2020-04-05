import { gql } from "apollo-server";
import { DocumentNode } from "graphql";

const typeDefs: DocumentNode = gql`
  enum MrStates {
    OPENED
    CLOSED
    MERGED
    LOCKED
    ALL
  }

  type Namespace {
    id: ID!
    name: String!
    fullPath: String!
  }

  type ProjectConnection {
    edges: [ProjectEdge]
    pageInfo: ProjectPageInfo!
  }

  type ProjectPageInfo {
    """
    True if there are still projects to fetch
    """
    hasNextPage: Boolean!
    """
    Cursor (ID) of the last edge, null if no result
    """
    endCursor: Int
  }

  type ProjectEdge {
    """
    Cursor for project is the ID since the pagination by created_at is not supported by gitlab
    """
    cursor: Int!
    """
    Project node
    """
    node: Project!
  }

  type Project {
    """
    Gitlab ID of the project
    """
    id: ID!
    """
    Name of the project
    """
    name: String!
    """
    Description of the project
    """
    description: String
    """
    Path of the project with the namespace
    """
    pathWithNamespace: String!
    """
    Namespace of the project
    """
    namespace: Namespace!
    """
    Users of the project, only developers and higher
    """
    users: [User]
    """
    Merge requests of the projects, sorted by ascending createdAt
    """
    mergeRequests(
      """
      Pagination paramater: how many results in the response, maximum is 10
      """
      first: Int = 5
      """
      Search for merge request created after this date
      """
      fromDate: String = "2019-01-01"
      """
      Search for merge request created before this date
      """
      toDate: String
      """
      Pagination parameter: cursor (created_at) used for searching new results
      """
      after: String
      """
      State of the merge requests
      """
      mrState: MrStates = ALL
    ): MergeRequestConnection
  }

  type MergeRequestConnection {
    """
    Edges, each edge contain the pagination cursor and the node (data)
    """
    edges: [MergeRequestEdge]
    """
    Page information related to the pagination
    """
    pageInfo: MergeRequestPageInfo!
  }

  type MergeRequestPageInfo {
    """
    True if there are still merge requests to fetch
    """
    hasNextPage: Boolean!
    """
    Cursor (created_at) of the last edge, null if no result
    """
    endCursor: String
  }

  type MergeRequestEdge {
    """
    Cursor for merge request is the created_at since the pagination by ID is not supported by gitlab
    """
    cursor: String!
    """
    Merge request node
    """
    node: MergeRequest!
  }

  type MergeRequest {
    """
    Gitlab ID of the merge request
    """
    id: ID!
    """
    Gitlab iid of the merge request
    """
    iid: Int!
    """
    Gitlab ID of the project to which the merge request belongs
    """
    projectId: Int!
    """
    Title of the merge request
    """
    title: String!
    """
    Description of the merge request
    """
    description: String!
    """
    State of the merge request
    """
    state: String!
    """
    Date of the creation of the merge request
    """
    createdAt: String!
    """
    Date of the last update of the merge request
    """
    updatedAt: String!
    """
    User who has merged the merge request
    """
    mergedBy: User
    """
    Date of the merge
    """
    mergedAt: String
    """
    Target branch of the merge request
    """
    targetBranch: String
    """
    Source branch of the merge request
    """
    sourceBranch: String
    """
    Assignee of the merge request
    """
    assignee: User
    """
    Author of the merge request
    """
    author: User!
    """
    Total number of notes in the merge request
    """
    userNotesCount: Int!
    """
    URL of the merge request
    """
    webUrl: String!
    """
    List of users who have approved the merge request
    """
    approvedBy: [User]
    """
    Reviews state of the merge request
    """
    reviews: Reviews
  }

  type Reviews {
    """
    List of notes in the merge request
    """
    notes: [Note]
    """
    List of users who have reviewed the merge request
    """
    reviewedBy: [User]
  }

  type Note {
    """
    Gitlab ID of the note
    """
    id: ID!
    """
    Type of the note
    """
    type: String!
    """
    Body of the note
    """
    body: String!
    """
    Author of the note
    """
    author: User!
    """
    Date of creation of the note
    """
    createdAt: String!
    """
    True if the note is resolved
    """
    resolved: Boolean!
  }

  """
  DEPRECATED
  """
  type ApprovalState {
    rules: [ApprovalRule]
  }

  """
  DEPRECATED
  """
  type ApprovalRule {
    id: ID!
    name: String!
    eligibleApprovers: [User]
    approvalsRequired: Int
    approvedBy: [User]
  }

  type User {
    """
    Gitlab ID of the user
    """
    id: ID!
    """
    Gitlab name of the user
    """
    name: String!
    """
    Gitlab username of the user
    """
    username: String!
    """
    Gitlab avatar URL of the user
    """
    avatarUrl: String!
    """
    Gitlab email of the user
    """
    email: String!
    """
    List of projects of the user
    """
    projects: [Project]
  }

  type Query {
    """
    Allow to query the current user given the access token
    """
    currentUser: User
    """
    Allow to query projects given a search parameter
    """
    projects(
      """
      Search parameter of the project
      """
      search: String
      """
      Pagination paramater: how many results in the response, maximum is 10
      """
      first: Int = 5
      """
      Pagination parameter: cursor (id) used for searching new results
      """
      after: Int = 0
    ): ProjectConnection
    """
    Allow to query one project by its ID
    """
    project(
      """
      ID of the project
      """
      projectId: String!
    ): Project
  }
`;

export { typeDefs };
