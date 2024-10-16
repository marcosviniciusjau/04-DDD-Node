import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepo } from '../repos/answer-repo'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'

interface ChooseBestAnswerRequest {
  authorId: string
  answerId: string
}

interface ChooseBestAnswerResponse {
  question: Question
}

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
      throw new Error('Answer not found')
    }
    
    const question = await this.questionRepos.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id
    await this.questionRepos.save(question)
    return { question }
  }
}
