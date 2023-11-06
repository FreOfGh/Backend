import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class UserAlreadyExistsException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.USER_ALREADY_EXISTS_ERROR,
            HttpStatus.BAD_REQUEST,
        );
    }
}