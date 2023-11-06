import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class UserUnauthorizedException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.USER_UNAUTHORIZED_ERROR,
            HttpStatus.UNAUTHORIZED,
        );
    }
}