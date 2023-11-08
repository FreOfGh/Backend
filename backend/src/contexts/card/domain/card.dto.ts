import {ApiProperty} from '@nestjs/swagger';

export class CardDto {
    @ApiProperty() type: string;
    @ApiProperty() symbol: string;
}