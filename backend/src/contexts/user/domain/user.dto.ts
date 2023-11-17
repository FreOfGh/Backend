import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
    @ApiProperty() userId: string;
    @ApiProperty() username: string;
    @ApiProperty() password: string;
    @ApiProperty() cardDesign: string;
    @ApiProperty() status: string;
    @ApiProperty() tokens: number;
    @ApiProperty() icon: string;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
}