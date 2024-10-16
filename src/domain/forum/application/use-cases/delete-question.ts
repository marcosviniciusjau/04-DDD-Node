import { QuestionsRepos } from '../repos/question-repos'
interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}
interface DeleteQuestionUseCaseResponse {}
export class DeleteQuestionUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepos.findById(questionId)
    if (!question) {
      throw new Error('Question not found.')
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    await this.questionsRepos.delete(question)
    return {}
  }
}
