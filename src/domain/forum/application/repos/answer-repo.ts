import { Answer } from '../../enterprise/entities/answer'
export interface AnswersRepo {
  create(answer: Answer): Promise<void>
}
