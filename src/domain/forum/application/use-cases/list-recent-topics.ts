import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
interface ListRecentTopicsUseCaseRequest {
  page: number
}
interface ListRecentTopicsUseCaseResponse {
  questions: Question[]
}
export class ListRecentTopicsUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    page,
  }: ListRecentTopicsUseCaseRequest): Promise<ListRecentTopicsUseCaseResponse> {
    const questions = await this.questionsRepos.findRecent({ page })
    return {
      questions,
    }
  }
}
