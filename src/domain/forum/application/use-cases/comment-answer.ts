import { AnswersRepo } from '../repos/answer-repo'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepos } from '../repos/answer-comment-repos'
interface CommentAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentAnswerUseCaseResponse {
  answerComment: AnswerComment
}
export class CommentAnswerUseCase {
  constructor(
    private answersRepos: AnswersRepo,
    private answerCommentRepos: AnswerCommentsRepos,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentAnswerUseCaseRequest): Promise<CommentAnswerUseCaseResponse> {
    const answer = await this.answersRepos.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentRepos.create(answerComment)
    return {
      answerComment,
    }
  }
}
