import {ApiProperty} from '@nestjs/swagger';

export class DefaultResponse {
    @ApiProperty() success: boolean = true;
}