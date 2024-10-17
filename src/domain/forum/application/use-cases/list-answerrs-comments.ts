import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepos } from '../repos/answer-comment-repos'
interface ListAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}
interface ListAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}
export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepos: AnswerCommentsRepos) {}
  async execute({
    page,
    answerId,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepos.findByAnswerId(
      answerId,
      {
        page,
      },
    )
    return {
      answerComments,
    }
  }
}
