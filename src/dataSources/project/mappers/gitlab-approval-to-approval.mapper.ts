import { GitlabApprovalState, GitlabApprovalRule } from "../models";
import { gitlabUserToUser, User } from "../../user";

const gitlabApprovalStateToApprovers = (
  gitlabApprovalState: GitlabApprovalState
): User[] => {
  const approversMap: Map<number, User> = gitlabApprovalState.rules.reduce(
    (
      approvers: Map<number, User>,
      gitlabRule: GitlabApprovalRule
    ): Map<number, User> => {
      gitlabRule.approved_by.forEach((gitlabUser): void => {
        approvers.set(gitlabUser.id, gitlabUserToUser(gitlabUser));
      });
      return approvers;
    },
    new Map()
  );
  return [...approversMap.values()];
};

// DEPRECATED
// const gitlabApprovalStateToApprovalState = (
//   gitlabApprovalState: GitlabApprovalState
// ): ApprovalState => {
//   return {
//     rules: gitlabApprovalState.rules.map(gitlabRuleToRule),
//   };
// };

// DEPRECATED
// const gitlabRuleToRule = (gitlabRule: GitlabApprovalRule): ApprovalRule => {
//   return {
//     id: gitlabRule.id,
//     name: gitlabRule.name,
//     eligibleApprovers: gitlabRule.eligible_approvers.map(gitlabUserToUser),
//     approvalsRequired: gitlabRule.approvals_required,
//     approvedBy: gitlabRule.approved_by.map(gitlabUserToUser),
//   };
// };

export { gitlabApprovalStateToApprovers };
