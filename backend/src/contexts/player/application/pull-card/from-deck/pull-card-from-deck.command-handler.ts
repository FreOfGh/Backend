import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {PullCardFromDeckCommand} from './pull-card-from-deck.command';
import {PlayerDto} from '../../../domain/player.dto';
import {PullCardFromDeckApp} from './pull-card-from-deck.app';
import {Player} from '../../../domain/player';
import {UserId} from '../../../../user/domain/user-id';

@CommandHandler(PullCardFromDeckCommand)
export class PullCardFromDeckCommandHandler implements ICommandHandler<PullCardFromDeckCommand, PlayerDto> {

    constructor(private readonly app: PullCardFromDeckApp) {
    }

    async execute(command: PullCardFromDeckCommand): Promise<PlayerDto> {
        const player: Player = await this.app.exec(new UserId(command.userId));
        return player.toPrimitives();
    }
}