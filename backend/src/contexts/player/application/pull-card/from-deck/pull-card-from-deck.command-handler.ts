import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {PullCardFromDeckCommand} from './pull-card-from-deck.command';
import {PullCardFromDeckApp} from './pull-card-from-deck.app';
import {UserId} from '../../../../user/domain/user-id';
import {PullCardAppResponse} from '../pull-card.app.response';

@CommandHandler(PullCardFromDeckCommand)
export class PullCardFromDeckCommandHandler implements ICommandHandler<PullCardFromDeckCommand, PullCardAppResponse> {

    constructor(private readonly app: PullCardFromDeckApp) {
    }

    execute(command: PullCardFromDeckCommand): Promise<PullCardAppResponse> {
        return this.app.exec(new UserId(command.userId));
    }
}