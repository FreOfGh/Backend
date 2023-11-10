import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {JoinGameCommand} from './join-game.command';
import {GameDto} from '../../domain/game.dto';
import {Logger} from '@nestjs/common';
import {JoinGameApp} from './join-game.app';
import {Game} from '../../domain/game';
import {UserId} from '../../../user/domain/user-id';
import {GameCode} from '../../domain/game-code';

@CommandHandler(JoinGameCommand)
export class JoinGameCommandHandler implements ICommandHandler<JoinGameCommand, GameDto> {

    private readonly logger: Logger = new Logger(JoinGameCommandHandler.name);

    constructor(private readonly app: JoinGameApp) {
    }

    async execute(command: JoinGameCommand): Promise<GameDto> {
        this.logger.log(`[${this.execute.name}] INIT :: command: ${JSON.stringify(command)}`);
        const joined: Game = await this.app.exec(
            new UserId(command.userId),
            new GameCode(command.code),
        );
        const response: GameDto = joined.toPrimitives();
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}