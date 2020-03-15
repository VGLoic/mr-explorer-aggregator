import { GitlabMergeRequest, MergeRequest } from "../models";
import { gitlabUserToUser } from "../../user";
const gitlabMrToMr = (gitlabMr: GitlabMergeRequest): MergeRequest => {
    return {
        id: gitlabMr.id,
        iid: gitlabMr.iid,
        projectId: gitlabMr.project_id,
        title: gitlabMr.title,
        description: gitlabMr.description,
        state: gitlabMr.state,
        createdAt: gitlabMr.created_at,
        updatedAt: gitlabMr.updated_at,
        mergedBy: gitlabMr.merged_by ? gitlabUserToUser(gitlabMr.merged_by) : null,
        mergedAt: gitlabMr.merged_at,
        targetBranch: gitlabMr.target_branch,
        sourceBranch: gitlabMr.source_branch,
        assignee: gitlabMr.assignee ? gitlabUserToUser(gitlabMr.assignee) : null,
        author: gitlabMr.author ? gitlabUserToUser(gitlabMr.author) : null,
        userNotesCount: gitlabMr.user_notes_count,
        webUrl: gitlabMr.web_url
    };
}
export { gitlabMrToMr }