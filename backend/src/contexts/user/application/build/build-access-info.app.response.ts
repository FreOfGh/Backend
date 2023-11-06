import {ApiProperty} from '@nestjs/swagger';
import {UserDto} from '../../domain/user.dto';

export class BuildAccessInfoAppResponse {
    @ApiProperty({type: UserDto}) user: UserDto;
    @ApiProperty() token: string;
}