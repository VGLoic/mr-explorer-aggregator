import { GitlabNote, Note } from "../models";
import { gitlabUserToUser } from "../../user";

const gitlabMrNotesToMrNotes = (gitlabMrNotes: GitlabNote[]): Note[] => {
  const filteredNotes: Note[] = [];
  gitlabMrNotes.forEach((gitlabNote): void => {
    if (gitlabNote.type !== "DiffNote" || gitlabNote.system) return;
    filteredNotes.push(gitlabMrNoteToMrNote(gitlabNote));
  });
  return filteredNotes;
};

const gitlabMrNoteToMrNote = (gitlabNote: GitlabNote): Note => {
  return {
    id: gitlabNote.id,
    type: gitlabNote.type,
    body: gitlabNote.body,
    author: gitlabUserToUser(gitlabNote.author),
    createdAt: gitlabNote.created_at,
    resolved: gitlabNote.resolved,
  };
};

export { gitlabMrNotesToMrNotes };
