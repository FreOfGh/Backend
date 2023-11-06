import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessagesConstants } from './exception-messages.constants';

export class Exception extends HttpException {
    constructor(
    public readonly customMessage: ExceptionMessagesConstants,
    status: HttpStatus,
    ) {
        super({ message: customMessage }, status);
    }
}
