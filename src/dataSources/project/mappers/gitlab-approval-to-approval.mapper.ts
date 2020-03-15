import { GitlabApprovalState, ApprovalState, GitlabApprovalRule, ApprovalRule } from "../models";
import { gitlabUserToUser } from "../../user";

const gitlabApprovalStateToApprovalState = (gitlabApprovalState: GitlabApprovalState): ApprovalState => {
    return {
        rules: gitlabApprovalState.rules.map(gitlabRuleToRule)
    }
}

const gitlabRuleToRule = (gitlabRule: GitlabApprovalRule): ApprovalRule => {
    return {
        id: gitlabRule.id,
        name: gitlabRule.name,
        eligibleApprovers: gitlabRule.eligible_approvers.map(gitlabUserToUser),
        approvalsRequired: gitlabRule.approvals_required,
        approvedBy: gitlabRule.approved_by.map(gitlabUserToUser),
    }
}

export  { gitlabApprovalStateToApprovalState }