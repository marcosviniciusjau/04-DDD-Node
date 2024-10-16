import { AnswersRepo } from '../repos/answer-repo'
interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}
export class DeleteAnswerUseCase {
  constructor(private answerRepo: AnswersRepo) {}
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepo.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    await this.answerRepo.delete(answer)
    return {}
  }
}
