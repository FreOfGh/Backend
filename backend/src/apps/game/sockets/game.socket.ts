import {AppSocket} from '../../shared/sockets/app.socket';
import {WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {GameConfigConstants} from '../config/game-config.constants';
import {Server, Socket} from 'socket.io';
import {Logger} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {JoinGameRoomCommand} from '../../../contexts/game/application/join/room/join-game-room.command';
import {IUserDecorator} from '../../../contexts/user/domain/user.decorator';
import {JwtService} from '@nestjs/jwt';
import {PlayerDto} from '../../../contexts/player/domain/player.dto';
import {SearchPlayerByUserQuery} from '../../../contexts/player/application/search/by-user/search-player-by-user.query';

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