import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionsCommentRepos {
  create(questionComment: QuestionComment): Promise<void>
}
