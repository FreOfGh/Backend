import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {PullCardAppResponse} from '../pull-card.app.response';
import {PullCardFromDiscardedCommand} from './pull-card-from-discarded.command';
import {PullCardFromDiscardedApp} from './pull-card-from-discarded.app';
import {UserId} from '../../../../user/domain/user-id';

@CommandHandler(PullCardFromDiscardedCommand)
export class PullCardFromDiscardedCommandHandler implements ICommandHandler<PullCardFromDiscardedCommand, PullCardAppResponse> {

    constructor(private readonly app: PullCardFromDiscardedApp) {
    }

    execute(command: PullCardFromDiscardedCommand): Promise<PullCardAppResponse> {
        return this.app.exec(new UserId(command.userId));
    }
}