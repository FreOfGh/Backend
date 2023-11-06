import {UserDto} from '../../domain/user.dto';

export class BuildAccessInfoCommand {
    constructor(
        public readonly user: UserDto,
    ) {
    }
}