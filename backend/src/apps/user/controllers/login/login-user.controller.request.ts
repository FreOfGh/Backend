import {ApiProperty} from '@nestjs/swagger';

export class LoginUserControllerRequest {
    @ApiProperty() username: string;
    @ApiProperty() password: string;
}