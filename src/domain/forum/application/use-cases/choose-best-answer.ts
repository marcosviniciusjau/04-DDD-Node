import { AnswersRepo } from '../repos/answer-repo'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from './errors/not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface ChooseBestAnswerRequest {
  authorId: string
  answerId: string
}

type ChooseBestAnswerResponse = Either<
  NotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseBestAnswerUseCase {
  constructor(
    private questionRepos: QuestionsRepos,
    private answersRepo: AnswersRepo,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseBestAnswerRequest): Promise<ChooseBestAnswerResponse> {
    const answer = await this.answersRepo.findById(answerId)
    if (!answer) {
      return left(new NotFoundError())
    }

    const question = await this.questionRepos.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new NotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id
    await this.questionRepos.save(question)
    return right({ question })
  }
}
