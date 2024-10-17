import { AnswerCommentsRepos } from '../repos/answer-comment-repos'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepos: AnswerCommentsRepos) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepos.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }
    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentRepos.delete(answerComment)
    return {}
  }
}
