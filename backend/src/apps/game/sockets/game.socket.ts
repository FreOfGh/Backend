import {AppSocket} from '../../shared/sockets/app.socket';
import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {GameConfigConstants} from '../config/game-config.constants';
import {Server, Socket} from 'socket.io';
import {Logger, UseFilters, UseGuards} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {JoinGameRoomCommand} from '../../../contexts/game/application/join/room/join-game-room.command';
import {IUserDecorator, User} from '../../../contexts/user/domain/user.decorator';
import {JwtService} from '@nestjs/jwt';
import {PlayerDto} from '../../../contexts/player/domain/player.dto';
import {SearchPlayerByUserQuery} from '../../../contexts/player/application/search/by-user/search-player-by-user.query';
import {GameListenersConstants} from '../config/game-listeners.constants';
import {JwtGuard} from '../../../contexts/user/infrastructure/passport/jwt.guard';
import {ThrowCardCommand} from '../../../contexts/player/application/throw-card/throw-card.command';
import {AppExceptionFilter} from '../../../contexts/shared/application/filters/app-exception-filter';

@WebSocketGateway({
    namespace: GameConfigConstants.SOCKET_NAMESPACE,
    cors: true,
})
export class GameSocket extends AppSocket {

    @WebSocketServer() wsServer: Server;
    logger: Logger = new Logger(GameSocket.name);
    namespace: string = GameConfigConstants.SOCKET_NAMESPACE;

    constructor(
        commandBus: CommandBus,
        queryBus: QueryBus,
        private readonly jwt: JwtService,
    ) {
        super(commandBus, queryBus);
        super.connectionEvent = this.connect;

    }

    @SubscribeMessage(GameListenersConstants.HANDLE_THROW_CARD)
    @UseGuards(JwtGuard)
    @UseFilters(AppExceptionFilter)
    async throwCard(
        @User() user: IUserDecorator,
    ): Promise<void> {
        await this.dispatch<void, ThrowCardCommand>(new ThrowCardCommand(user.userId));
    }

    async connect(client: Socket): Promise<void> {
        try {
            const token = client.handshake.headers.authorization?.replace('Bearer', '')?.trim();
            const user: IUserDecorator = this.jwt.verify(token, {secret: process.env.JWT_SECRET});
            const player: PlayerDto = await this.query<PlayerDto, SearchPlayerByUserQuery>(new SearchPlayerByUserQuery(user.userId));
            client.join(player.gameId);
            client.join(player.playerId);
            await this.dispatch<void, JoinGameRoomCommand>(new JoinGameRoomCommand(player.gameId));
        } catch {
            client.disconnect();
        }
    }
}