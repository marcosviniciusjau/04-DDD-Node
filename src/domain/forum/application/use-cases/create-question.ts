import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}
type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>
export class CreateQuestionUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })
    await this.questionsRepos.create(question)
    return right({
      question,
    })
  }
}
