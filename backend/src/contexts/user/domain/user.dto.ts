import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
    @ApiProperty() userId: string;
    @ApiProperty() username: string;
    @ApiProperty() password: string;
    @ApiProperty() cardType: string;
    @ApiProperty() status: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
}