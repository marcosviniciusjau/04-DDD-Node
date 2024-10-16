import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
interface GetQuestionBySlugUseCaseRequest {
  slug: string
}
interface GetQuestionBySlugUseCaseResponse {
  question: Question
}
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepos.findBySlug(slug)
    if (!question) {
      throw new Error('Question not found.')
    }
    return {
      question,
    }
  }
}
