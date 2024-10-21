import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentRepos {
  findByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
