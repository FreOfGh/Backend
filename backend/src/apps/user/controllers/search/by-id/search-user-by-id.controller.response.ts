import {DefaultResponse} from '../../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {UserDto} from '../../../../../contexts/user/domain/user.dto';

export class SearchUserByIdControllerResponse extends DefaultResponse {
    @ApiProperty({type: UserDto}) data: UserDto;
}