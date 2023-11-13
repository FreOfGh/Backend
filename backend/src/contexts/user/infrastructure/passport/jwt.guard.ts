import {AuthGuard} from '@nestjs/passport';
import {ContextType, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Socket} from 'socket.io';
import * as jwt from 'jsonwebtoken';
import {IUserDecorator} from '../../domain/user.decorator';

export class JwtGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        switch (context.getType<ContextType>()) {
        case 'http':
            return super.canActivate(context);
        case 'ws': {
            return this.websocketCanActivate(context);
        }
        default:
            return false;
        }
    }

    private websocketCanActivate(context: ExecutionContext): boolean {
        try {
            const client: Socket = context.switchToWs().getClient<Socket>();
            const token = client.handshake.headers.authorization?.split(' ')[1];
            const payload: IUserDecorator = jwt.verify(token, process.env.JWT_SECRET) as IUserDecorator;
            const IUser: IUserDecorator = {
                userId: payload.userId,
                username: payload.username,
            };
            client.handshake.query.user = JSON.stringify(IUser);
            return true;
        } catch (e) {
            return false;
        }
    }
}