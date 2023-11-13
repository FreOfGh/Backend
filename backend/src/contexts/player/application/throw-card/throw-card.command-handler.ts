import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {ThrowCardCommand} from './throw-card.command';
import {ThrowCardApp} from './throw-card.app';
import {UserId} from '../../../user/domain/user-id';

@CommandHandler(ThrowCardCommand)
export class ThrowCardCommandHandler implements ICommandHandler<ThrowCardCommand, void> {

    constructor(private readonly app: ThrowCardApp) {
    }

    async execute(command: ThrowCardCommand): Promise<void> {
        await this.app.exec(new UserId(command.userId));
    }
}