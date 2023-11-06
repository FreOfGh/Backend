import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {ExceptionMessagesConstants} from '../../../../contexts/shared/domain/exception-messages.constants';

export class RegisterUserControllerRequest {
    @ApiProperty({required: true})
    @IsString({message: ExceptionMessagesConstants.USERNAME_MUST_BE_STRING})
    @IsNotEmpty({message: ExceptionMessagesConstants.USERNAME_REQUIRED})
        username: string;

    @ApiProperty({required: true})
    @IsString({message: ExceptionMessagesConstants.PASSWORD_MUST_BE_STRING})
    @IsNotEmpty({message: ExceptionMessagesConstants.PASSWORD_REQUIRED})
        password: string;
}