import { QuestionCommentsRepos } from '../repos/question-comment-repos'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}
export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepos: QuestionCommentsRepos) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepos.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }
    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionCommentRepos.delete(questionComment)
    return {}
  }
}
