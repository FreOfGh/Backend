import {UserDto} from './user.dto';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export type IUserDecorator = {
    userId: string;
    username: string;
}

export const mapFromUser = (user: UserDto): IUserDecorator => {
    return {userId: user.userId, username: user.username};
};

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IUserDecorator => {
        switch (ctx.getType()) {
        case 'http': {
            const request = ctx.switchToHttp().getRequest();
            return request.user;
        }
        case 'ws': {
            const query = ctx.switchToWs().getClient().handshake.query;
            return JSON.parse(query.user);
        }
        }
    },
);
