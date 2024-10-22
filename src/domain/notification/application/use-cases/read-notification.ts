import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationRepos } from '../repos/notification-repos'
import { NotFoundError } from '@/domain/forum/application/use-cases/errors/not-found-error'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepos: NotificationRepos) {}
  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepos.findById(notificationId)

    if (!notification) {
      return left(new NotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()
    await this.notificationsRepos.save(notification)
    return right({ notification })
  }
}