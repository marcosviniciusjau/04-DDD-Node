import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
import { NotFoundError } from './errors/not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    question: Question
  }
>
export class EditQuestionUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepos.findById(questionId)
    if (!question) {
      return left(new NotFoundError())
    }
    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }
    question.title = title
    question.content = content
    await this.questionsRepos.save(question)
    return right({ question })
  }
}
