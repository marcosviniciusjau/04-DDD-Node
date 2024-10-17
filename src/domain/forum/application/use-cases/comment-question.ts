import { QuestionsRepos } from '../repos/question-repos'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepos } from '../repos/question-comment-repos'
interface CommentQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentQuestionUseCaseResponse {
  questionComment: QuestionComment
}
export class CommentQuestionUseCase {
  constructor(
    private questionsRepos: QuestionsRepos,
    private questionCommentRepos: QuestionCommentsRepos,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentQuestionUseCaseRequest): Promise<CommentQuestionUseCaseResponse> {
    const question = await this.questionsRepos.findById(questionId)
    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentRepos.create(questionComment)
    return {
      questionComment,
    }
  }
}
