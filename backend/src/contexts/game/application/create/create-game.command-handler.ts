import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {CreateGameCommand} from './create-game.command';
import {GameDto} from '../../domain/game.dto';
import {CreateGameApp} from './create-game.app';
import {UserId} from '../../../user/domain/user-id';
import {Game} from '../../domain/game';

@CommandHandler(CreateGameCommand)
export class CreateGameCommandHandler implements ICommandHandler<CreateGameCommand, GameDto> {

    constructor(private readonly app: CreateGameApp) {
    }

    async execute(command: CreateGameCommand): Promise<GameDto> {
        const created: Game = await this.app.exec(
            new UserId(command.userId),
            command.requiredPlayers,
            command.isPublic,
            command.totalBet,
            command.name,
        );
        return created.toPrimitives();
    }
}