import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {JoinGameRoomCommand} from './join-game-room.command';
import {JoinGameRoomApp} from './join-game-room.app';
import {UserId} from '../../../../user/domain/user-id';
import {GameId} from 'src/contexts/game/domain/game-id';

@CommandHandler(JoinGameRoomCommand)
export class JoinGameRoomCommandHandler implements ICommandHandler<JoinGameRoomCommand, void> {

    constructor(private readonly app: JoinGameRoomApp) {
    }

    async execute(command: JoinGameRoomCommand): Promise<void> {
        await this.app.exec(
            new UserId(command.userId),
            new GameId(command.gameId),
        );
    }
}