import { Either, right } from '@/core/either'
import { AnswersRepo } from '../repos/answer-repo'
import { NotFoundError } from './errors/not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  object
>
export class DeleteAnswerUseCase {
  constructor(private answerRepo: AnswersRepo) {}
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepo.findById(answerId)
    if (!answer) {
      return left(new NotFoundError())
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    await this.answerRepo.delete(answer)
    return right({})
  }
}
