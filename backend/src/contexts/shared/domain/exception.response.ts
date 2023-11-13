import {HttpStatus} from '@nestjs/common';
import {ExceptionMessagesConstants} from './exception-messages.constants';
import {Exception} from './exception';

export class ExceptionResponse {
    public message: string = ExceptionMessagesConstants.INTERNAL_SERVER_ERROR;
    public code: number = HttpStatus.INTERNAL_SERVER_ERROR;
    private readonly success = false;

    public static fromExceptionBase(exception: Exception): ExceptionResponse {
        const exec: ExceptionResponse = new ExceptionResponse();
        exec.code = exception.getStatus();
        exec.message = exception.message;
        return exec;
    }

    public setMessage = (message?: string): void => {
        if (message) this.message = message;
    };

    public setStatus = (status?: number): void => {
        if (status) this.code = status;
    };
}
