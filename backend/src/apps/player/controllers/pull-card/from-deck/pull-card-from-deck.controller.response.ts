import {DefaultResponse} from '../../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {PlayerDto} from '../../../../../contexts/player/domain/player.dto';

export class PullCardFromDeckControllerResponse extends DefaultResponse {
    @ApiProperty({type: PlayerDto}) data: PlayerDto;
}