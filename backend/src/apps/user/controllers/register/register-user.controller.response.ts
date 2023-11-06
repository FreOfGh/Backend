import {DefaultResponse} from '../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {RegisterUserAppResponse} from '../../../../contexts/user/application/register/register-user.app.response';

export class RegisterUserControllerResponse extends DefaultResponse {
    @ApiProperty({type: RegisterUserAppResponse}) data: RegisterUserAppResponse;
}