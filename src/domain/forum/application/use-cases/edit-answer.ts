import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepo } from '../repos/answer-repo'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}
export class EditAnswerUseCase {
  constructor(private answersRepos: AnswersRepo) {}
  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepos.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    answer.content = content
    await this.answersRepos.save(answer)
    return { answer }
  }
}
