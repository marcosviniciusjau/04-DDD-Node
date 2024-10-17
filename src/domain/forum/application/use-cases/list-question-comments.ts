import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepos } from '../repos/question-comment-repos'
interface ListQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}
interface ListQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}
export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepos: QuestionCommentsRepos) {}
  async execute({
    page,
    questionId,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepos.findByQuestionId(
      questionId,
      {
        page,
      },
    )
    return {
      questionComments,
    }
  }
}
