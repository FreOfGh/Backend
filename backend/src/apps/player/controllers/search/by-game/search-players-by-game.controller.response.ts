import {DefaultResponse} from '../../../../../contexts/shared/domain/default.response';
import {ApiProperty} from '@nestjs/swagger';
import {PlayerDto} from '../../../../../contexts/player/domain/player.dto';

export class SearchPlayersByGameControllerResponse extends DefaultResponse {
    @ApiProperty({type: [PlayerDto]}) data: Array<PlayerDto>;
}