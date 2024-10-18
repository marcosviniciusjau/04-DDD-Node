import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepo } from '../repos/answer-repo'
import { NotFoundError } from './errors/not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>
export class EditAnswerUseCase {
  constructor(private answersRepos: AnswersRepo) {}
  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepos.findById(answerId)
    if (!answer) {
      return left(new NotFoundError())
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    answer.content = content
    await this.answersRepos.save(answer)
    return right({ answer })
  }
}
