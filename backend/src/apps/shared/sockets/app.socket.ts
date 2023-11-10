import {Socket} from 'socket.io';
import {AppController} from '../controllers/app.controller';
import {OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';

export abstract class AppSocket extends AppController implements OnGatewayConnection, OnGatewayDisconnect {

    protected logger: Logger;
    protected namespace: string;

    async handleConnection(client: Socket): Promise<void> {
        await this.connectionEvent(client, client.handshake.query);
    }

    async handleDisconnect(client: Socket): Promise<void> {
        await this.disconnectionEvent(client, client.handshake.query);
    }

    protected connectionEvent: (client: Socket, query?: unknown) => Promise<void> = async (client: Socket, query?: Record<string, string | Array<string>>) => {
        this.logger.log(`[${this.handleConnection.name}] User connected. ${client.id}`);
        this.logger.log(`[${this.handleConnection.name}] query: ${JSON.stringify(query)}`);
    };

    protected disconnectionEvent: (client: Socket, query?: unknown) => Promise<void> = async (
        client: Socket,
        query?: Record<string, string | Array<string>>,
    ) => {
        this.logger.log(`[${this.handleDisconnect.name}] User disconnected.${client.id}`);
        this.logger.log(`[${this.handleDisconnect.name}] query: ${JSON.stringify(query)}`);
    };
}