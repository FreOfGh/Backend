import {UserDto} from './user.dto';

export type IUserDecorator = {
    userId: string;
    username: string;
}

export const mapFromUser = (user: UserDto): IUserDecorator => {
    return {userId: user.userId, username: user.username};
};