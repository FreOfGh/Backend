import {IUserDecorator} from '../../user/domain/user.decorator';

export interface IJwt {
    sign(payload: string | Record<string, unknown> | IUserDecorator, options?: Record<string, unknown>): string;

    verify(token: string): boolean;
}
