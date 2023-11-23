import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {LeaveGameCommand} from './leave-game.command';
import {LeaveGameApp} from './leave-game.app';
import {GameCode} from '../../domain/game-code';
import {UserId} from '../../../user/domain/user-id';

@CommandHandler(LeaveGameCommand)
export class LeaveGameCommandHandler implements ICommandHandler<LeaveGameCommand, void> {

    constructor(private readonly app: LeaveGameApp) {
    }

    async execute(command: LeaveGameCommand): Promise<void> {
        await this.app.exec(
            new GameCode(command.gameCode),
            new UserId(command.userId),
        );
    }
}
