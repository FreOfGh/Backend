import {ApiProperty} from '@nestjs/swagger';

export class CardDesignDto {
    @ApiProperty() cardDesignId: string;
    @ApiProperty() name: string;
    @ApiProperty() title: string;
    @ApiProperty() isDefault: boolean;
    @ApiProperty() isActive: boolean;
}