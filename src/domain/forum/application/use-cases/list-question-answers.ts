import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepo } from '../repos/answer-repo'
interface ListQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}
interface ListQuestionAnswersUseCaseResponse {
  answers: Answer[]
}
export class ListQuestionAnswersUseCase {
  constructor(private answersRepos: AnswersRepo) {}
  async execute({
    page,
    questionId,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepos.findByQuestionId(questionId, {
      page,
    })
    return {
      answers,
    }
  }
}
